import type { IChat, IGetChatsResponse, ParticipantsMap } from "@/interface/chatInterface";
import type { ResponseWithData } from "@/interface/interface";
import { addToChatState, setChatState } from "@/redux/slices/chats";
import instance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import defaultAvatar from "../assets/defaultAvatar.jpg";
import { useAppDispatch, useAppSelector } from "./hooks";

const useGetAllChats = () => {
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const { chats, participants } = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || moreLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
        await getAllChats(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, loading, moreLoading]);

  const getAllChats = async (page: number) => {
    try {
      if (page === 1) setLoading(true);
      else setMoreLoading(true);
      const { data } = await instance.get<ResponseWithData<IGetChatsResponse>>(`/chat/all?page=${page}`);
      if (data.success) {
        if (page === 1) dispatch(setChatState({ chats: data.data.chats, participants: data.data.participants }));
        else dispatch(addToChatState({ chats: data.data.chats, participants: data.data.participants }));
        setHasMore(data.data.hasMore);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      if (page === 1) setLoading(false);
      else setMoreLoading(false);
    }
  }
  useEffect(() => {
    if (chats.length === 0) getAllChats(1);
  }, []);

  return {
    loading,
    moreLoading,
    hasMore,
    lastElementRef,
    getAllChats,
    chats,
    participants
  }
}
const useGetParticipantsInfo = (participants: ParticipantsMap, userId:string) => {
  const getChatName = (chat: IChat): string => {
    if (chat.chatType === "group") return chat.groupName;
    const participantId = chat.participants[0] === userId ? chat.participants[1] : chat.participants[0];
    const name = participants[participantId].name;
    return name;
  }

  const getChatAvatar = (chat: IChat): string => {
    if (chat.chatType === "group") return chat.groupIcon ? chat.groupIcon.avatar : defaultAvatar;
    const pId = chat.participants.find(p => p !== userId)!;
    const avatar = participants[pId].profilePic;
    return avatar ? avatar.avatar : defaultAvatar;
  }

  const getChatProfile = (chat: IChat):string => {
    if (chat.chatType === "group") return chat.groupIcon ? chat.groupIcon.image : defaultAvatar;
    const pId = chat.participants.find(p => p !== userId)!;
    const profile = participants[pId].profilePic;
    return profile ? profile.image : defaultAvatar;
  }

  const getUserBio = (chat: IChat):string => {
    const pId = chat.participants.find(p => p !== userId)!;
    return participants[pId].bio
  }

  return {
    getChatAvatar,
    getChatName,
    getChatProfile,
    getUserBio
  }
}

export {
  useGetAllChats,
  useGetParticipantsInfo
};
