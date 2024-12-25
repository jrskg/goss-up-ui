import { IChat, IMessage } from "@/interface/chatInterface";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { v4 as uuid } from "uuid"
import { addToNewMessages, addToSeenMessages } from "@/redux/slices/messages";
import { useSocket } from "@/context/socketContext";
import { SOCKET_EVENTS } from "@/utils/constants";
import { toast } from "sonner";

export const useChatBoxLogic = (selectedChat:IChat | null, userId:string) => {
  const [userMessage, setUserMessage] = useState("");
  const dispatch = useAppDispatch();
  const {socket} = useSocket();

  useEffect(() => {
    if(!socket) return;
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (payload) => {
      const {message, roomId} = payload;
      if(!selectedChat || roomId !== selectedChat._id){
        console.log("I am running");
        toast.success("New message received");
        dispatch(addToNewMessages({chatId: roomId, message}));
      }else{
        dispatch(addToSeenMessages({chatId: roomId, message}));
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.NEW_MESSAGE);
    }
  }, [socket, selectedChat, dispatch]);
  
  const handleSendMessage = () => {
    if(!selectedChat) return;
    const roomId = selectedChat._id;
    const participants = selectedChat.participants;
    const message: IMessage = {
      _id: uuid(),
      chatId: roomId,
      senderId: userId,
      content: userMessage,
      createdAt: new Date().toISOString(),
      messageType: "text",
      attachments: [],
      deliveryStatus: "sent"
    }
    if(!socket) return
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {roomId, message, participants, senderId: userId});
    dispatch(addToSeenMessages({ chatId: roomId, message }));
    setUserMessage("");
  }

  return {
    userMessage,
    setUserMessage,
    handleSendMessage,
    dispatch
  }
}