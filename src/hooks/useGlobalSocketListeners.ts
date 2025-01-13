import { useSocket } from "@/context/socketContext"
import { IChat } from "@/interface/chatInterface";
import { IUser } from "@/interface/interface";
import { SOCKET_EVENTS } from "@/utils/constants";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "./hooks";
import { addToNewMessages, addToSeenMessages, transferNewToSeen, updateMessageStatus } from "@/redux/slices/messages";

export const useGlobalSocketListeners = (selectedChat: IChat|null, _loggedInUser: IUser|null) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (payload) => {
      const { message, roomId } = payload;
      if (!selectedChat || roomId !== selectedChat._id) {
        toast.success("New message received");
        dispatch(addToNewMessages({ chatId: roomId, message }));
        socket.emit(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, [{
          messageId: message._id,
          status:"delivered",
          roomId,
          senderId: message.senderId
        }]);
      } else {
        dispatch(transferNewToSeen(roomId));
        dispatch(addToSeenMessages({ chatId: roomId, message }));
        socket.emit(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, [{
          messageId: message._id,
          status:"seen",
          roomId,
          senderId: message.senderId
        }]);
      }
    });

    socket.on(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, (payload) => {      
      dispatch(updateMessageStatus(payload));
    });
    
    return () => {
      socket.off(SOCKET_EVENTS.NEW_MESSAGE);
      socket.off(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE);
    }
  }, [socket, selectedChat, dispatch]);

}