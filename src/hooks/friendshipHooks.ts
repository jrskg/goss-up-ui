import { FriendshipStatus, ResponseWithData } from "@/interface/interface";
import instance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface IFriendshipActionResponse {
  alreadyFriends?: boolean
}
interface IFriendshipId {
  friendshipId: string
}
const useFriendshipActions = () => {
  const [loading, setLoading] = useState(false);
  const sendFriendRequest = async (receiverId: string, cb: (friendshipId: string) => void) => {
    try {
      setLoading(true);
      const { data } = await instance.post<ResponseWithData<IFriendshipId>>("/friendship/create", {
        receiverId
      });
      if (data.success) {
        toast.success("Friend request sent");
        cb(data.data.friendshipId);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    }
    finally { setLoading(false) }
  }
  const respondToFriendRequest = async (friendshipId: string, status: FriendshipStatus, cb: (alreadyFriends?:boolean) => void, preventLoading: boolean=false) => {
    try {
      if(!preventLoading) setLoading(true);
      const { data } = await instance.post<ResponseWithData<IFriendshipActionResponse>>("/friendship/request/respond", { friendshipId, status });
      if (data.success) {
        toast.success(data.message);
        if (data.data?.alreadyFriends && data.data.alreadyFriends === true) {
          cb(true);
        } else {
          cb();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally { if(!preventLoading)setLoading(false) }
  }
  const cancelFriendRequest = async (friendshipId: string, cb:(alreadyFriends?:boolean) => void) => {
    try {
      setLoading(true);
      const { data } = await instance.delete<ResponseWithData<IFriendshipActionResponse>>(`/friendship/request/cancel/${friendshipId}`);
      if (data.success) {
        if (data.data?.alreadyFriends && data.data.alreadyFriends === true) {
          cb(true);
        } else {
          cb();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally { setLoading(false) }
  }

  return {
    sendFriendRequest,
    respondToFriendRequest,
    cancelFriendRequest,
    loading
  }
}

export {
  useFriendshipActions
};
