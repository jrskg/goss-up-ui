import { useFriendshipActions } from '@/hooks/friendshipHooks'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import type { FriendRequestResponseData, ResponseWithData } from '@/interface/interface'
import FriendsPageLayout from '@/layouts/FriendsPageLayout'
import { appendToFriendRequests, removeUpdatedFriendRequest, setFriendRequests, updateFriendRequests } from '@/redux/slices/friendRequests'
import instance from '@/utils/axiosInstance'
import { AxiosError } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import FriendRequestCard, { IRespondParams } from './FriendRequestCard'
import Loader from './Loader'

const FriendRequestList: React.FC = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { friendRequests, latestRequests, hasMore } = useAppSelector(state => state.friendRequests);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const navigate = useNavigate();
  const {respondToFriendRequest} = useFriendshipActions();

  const updates = useRef<boolean[]>([false, false]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || moreLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
        await getFriendRequests(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, loading, moreLoading]);

  const getFriendRequests = async (pageNo: number) => {
    try {
      if (pageNo === 1) setLoading(true);
      else setMoreLoading(true);
      const { data } = await instance.get<ResponseWithData<FriendRequestResponseData>>(`/friendship/request/all?page=${pageNo}`);
      if (data.success) {
        if (pageNo === 1) dispatch(setFriendRequests(data.data));
        else dispatch(appendToFriendRequests(data.data));
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      if (pageNo === 1) setLoading(false);
      else setMoreLoading(false);
    }
  }

  const handleRespond = useCallback(
    async (params: IRespondParams) => {
      const { friendshipId, status, setLoading, isLatest } = params;
      setLoading(true);
      await respondToFriendRequest(friendshipId, status, (alreadyFriends) => {
        if(alreadyFriends) dispatch(updateFriendRequests({friendshipId, status:"accepted", isLatest}));
        else dispatch(updateFriendRequests({friendshipId, status, isLatest}));
      });
      setLoading(false);
      updates.current[isLatest ? 0 : 1] = true;
    },
    [],
  )
  useEffect(() => {
    (async () => {
      if (friendRequests.length === 0) {
        await getFriendRequests(1);
      }
    })();
    return () => {
      dispatch(removeUpdatedFriendRequest(updates.current));
    }
  }, []);

  if (loading) {
    return (
      <div className='w-full h-[40vh] flex justify-center items-center'>
        <Loader />
      </div>
    )
  }
  return (
    <FriendsPageLayout>
      {latestRequests.length > 0 && <div className="w-full mb-2">
        <h2 className='text-xl py-2'>Latest Friend Requests</h2>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-5 justify-center content-center'>
          {
            latestRequests.map(req => (
              <FriendRequestCard
                key={req._id}
                senderId={req.sender._id}
                senderName={req.sender.name}
                profilePic={req.sender?.profilePic}
                friendshipId={req._id}
                createdAt={req.createdAt}
                status={req.status}
                navigate={navigate}
                handleButtonsClick={handleRespond}
              />
            ))
          }
        </div>
      </div>}
      <div className="w-full">
        <h2 className='text-xl py-2'>Older Friend Requests</h2>
        <div className='w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-5 justify-center content-center'>
          {
            friendRequests.map((req, index) => (
              index === friendRequests.length - 1 ? (
                <div ref={lastElementRef} key={req._id}>
                  <FriendRequestCard
                    senderId={req.sender._id}
                    senderName={req.sender.name}
                    profilePic={req.sender.profilePic}
                    friendshipId={req._id}
                    createdAt={req.createdAt}
                    status={req.status}
                    navigate={navigate}
                    handleButtonsClick={handleRespond}
                  />
                </div>
              ) : (
                <FriendRequestCard
                  key={req._id}
                  senderId={req.sender._id}
                  senderName={req.sender.name}
                  profilePic={req.sender?.profilePic}
                  friendshipId={req._id}
                  createdAt={req.createdAt}
                  status={req.status}
                  navigate={navigate}
                  handleButtonsClick={handleRespond}
                />
              )
            ))
          }
        </div>
        {moreLoading && <Loader className='my-10' label='Loading more...' />}
      </div>
    </FriendsPageLayout>
  )
}

export default FriendRequestList