import { useGetAndSearchFriends } from '@/hooks/friendshipHooks';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import defaultImage from "../../assets/defaultAvatar.jpg";
import Loader from '../Loader';
import SearchBar from '../SearchBar';
import FriendCardSimple from './FriendCardSimple';

interface Props {
  onFriendClick: (userId: string, name: string) => void
}
const FriendSelector: React.FC<Props> = ({
  onFriendClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPage, setSearchedPage] = useState(1);
  const {
    friends,
    getFriends,
    searchInFriends,
    searchedFriends,
    searchedHasMore,
    mainLoading,
    moreLoading,
    clearSearchResult
  } = useGetAndSearchFriends();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastFriendElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (mainLoading || moreLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && searchedHasMore) {
          setSearchedPage(prev => prev + 1);
          await searchInFriends(searchedPage + 1, searchQuery);
        }
      });
      if (node) observer.current.observe(node);
    },
    [searchedHasMore, mainLoading, moreLoading],
  )

  const handleCardClick = useCallback((userId: string, name: string) => {
    onFriendClick(userId, name);
  }, []);

  useEffect(() => {
    if (friends.length === 0) {
      getFriends(1);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchedPage(1);
        clearSearchResult();
        return;
      }
      await searchInFriends(1, searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className='relative h-full w-full'>
      <SearchBar
        hasButton={false}
        value={searchQuery}
        onChange={(value) => setSearchQuery(value)}
        placeholder='Search by name'
      />
      {
        mainLoading ? (
          <Loader className='mt-36' />
        ) : (
          <div className='overflow-y-scroll absolute bottom-0 top-[50px] w-full py-1'>
            {
              (searchQuery.length === 0 ? friends : searchedFriends).map((f, i) => i === friends.length - 1 ? (
                <div key={f._id} ref={lastFriendElementRef}>
                  <FriendCardSimple
                    avatar={f.friend.profilePic?.avatar || defaultImage}
                    name={f.friend.name}
                    userId={f.friend._id}
                    onClick={handleCardClick}
                  />
                </div>
              ) : (
                <div key={f._id}>
                  <FriendCardSimple
                    avatar={f.friend.profilePic?.avatar || defaultImage}
                    name={f.friend.name}
                    userId={f.friend._id}
                    onClick={handleCardClick}
                  />
                </div>
              ))
            }
            {
              moreLoading && (
                <Loader />
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default memo(FriendSelector);
