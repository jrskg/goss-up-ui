import { useSocket } from "@/context/socketContext"
import { IChat } from "@/interface/chatInterface";
import { IUser } from "@/interface/interface";
import { SOCKET_EVENTS } from "@/utils/constants";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "./hooks";
import { addToNewMessages, addToSeenMessages } from "@/redux/slices/messages";

export const useGlobalSocketListeners = (selectedChat: IChat|null, loggedInUser: IUser|null) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (payload) => {
      const { message, roomId } = payload;
      if (!selectedChat || roomId !== selectedChat._id) {
        toast.success("New message received");
        dispatch(addToNewMessages({ chatId: roomId, message }));
      } else {
        dispatch(addToSeenMessages({ chatId: roomId, message }));
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.NEW_MESSAGE);
    }
  }, [socket, selectedChat, dispatch]);

}