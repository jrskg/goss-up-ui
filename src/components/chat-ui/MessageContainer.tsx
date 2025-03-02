import { MessagesContext } from '@/context/contexts';
import type { ChatType, ParticipantsMap } from '@/interface/chatInterface';
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import smiley from "../../assets/smiley2.gif";
import MessageCard from './MessageCard';
import { cn } from '@/lib/utils';
import { useSocket } from '@/context/socketContext';
import { SOCKET_EVENTS } from '@/utils/constants';
import { IMessageStatusUpdatePayload } from '@/interface/socketEvents';

interface MessageContainerProps {
  selectedChatId: string;
  loggedInUserId: string;
  chatType: ChatType;
  participants: ParticipantsMap
}
const MessageContainer: React.FC<MessageContainerProps> = ({
  selectedChatId,
  chatType,
  loggedInUserId,
  participants
}) => {
  console.log("MessageContainer rendering... " + Math.random());
  const [typingUsers, setTypingUsers] = useState<{userId: string, name: string}[]>([]);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  const allMessages = useContext(MessagesContext)!;
  const { newMessages, seenMessages, seenMessagesIds, newMessagesIds } = allMessages[selectedChatId];

  const {socket} = useSocket();
  useEffect(() => {
    if(!socket) return;
    socket.on(SOCKET_EVENTS.USER_TYPING, ({roomId, name, userId}) => {
      if(roomId === selectedChatId){
        setTypingUsers(prev => {
          if(prev.find(u => u.userId === userId)) return prev;
          return [...prev, {userId, name}]
        })
      }
    });
    socket.on(SOCKET_EVENTS.USER_STOP_TYPING, ({roomId, userId}) => {
      if(roomId === selectedChatId){
        setTypingUsers(prev => prev.filter(u => u.userId !== userId));
      }
    });

    if(newMessagesIds.length > 0){
      const payload:IMessageStatusUpdatePayload[] = newMessagesIds.map((mid) => ({
        messageId: mid,
        status: "seen",
        roomId: selectedChatId,
        senderId: newMessages[mid].senderId
      }));

      socket.emit(SOCKET_EVENTS.MESSAGE_STATUS_UPDATE, payload)
    }

    return () => {
      socket.off(SOCKET_EVENTS.USER_TYPING);
      socket.off(SOCKET_EVENTS.USER_STOP_TYPING);
    }
  }, [socket, selectedChatId, newMessagesIds, newMessages]);
  

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [newMessages, seenMessages])

  const getSenderDetails = useCallback((senderId: string, what: "name" | "avatar"): string => {
    const participant = participants[senderId];
    if (what === "name") return participant.name;
    if (what === "avatar") return participant.profilePic ? participant.profilePic.avatar : defaultAvatar;
    return "";
  }, [participants]);

  const dots = () => (
    <>
      <span className="w-2 h-2 bg-dark-1 dark:bg-primary-3 rounded-full animate-smoothBounce"></span>
      <span className="w-2 h-2 bg-dark-1 dark:bg-primary-3 rounded-full animate-smoothBounce [animation-delay:0.15s]"></span>
      <span className="w-2 h-2 bg-dark-1 dark:bg-primary-3 rounded-full animate-smoothBounce [animation-delay:0.3s]"></span>
    </>
  );
  const getTypingString = () => {
    const length = typingUsers.length;
    const typingUsersName = typingUsers.map(u => u.name);
    if (length === 1) return `${typingUsersName[0]} is typing`;
    if (length === 2) return `${typingUsersName.join(" and ")} are typing`;
    if (length > 2) return `${typingUsersName.slice(0, 2).join(", ")} and ${length - 2} more are typing`;
    return "";
  }

  return (
    <div ref={scrollableContainerRef} className='absolute top-[65px] bottom-[90px] w-full overflow-auto p-2'>
      {
        (seenMessagesIds.length <= 0 && newMessagesIds.length <= 0) ? (
          <div className='w-full h-[93%] flex flex-col items-center justify-center gap-5'>
            <img
              className='w-44'
              loading='lazy'
              src={smiley} alt='smiley'
            />
            <p
              className='text-xl font-semibold text-center'
            >No messages yet! Say hi to start the conversation.</p>
          </div>
        ) : seenMessagesIds.map((sid, i) => {
          const m = seenMessages[sid];
          return (
            <MessageCard
              key={m._id}
              attachments={m.attachments}
              chatType={chatType}
              content={m.content}
              createdAt={m.createdAt}
              prevCreatedAt={i > 0 ? seenMessages[seenMessagesIds[i - 1]].createdAt : undefined}
              deliveryStatus={m.deliveryStatus}
              loggedInUserId={loggedInUserId}
              messgeType={m.messageType}
              prevSenderId={i > 0 ? seenMessages[seenMessagesIds[i - 1]].senderId : undefined}
              senderId={m.senderId}
              senderAvatar={getSenderDetails(m.senderId, "avatar")}
              senderName={getSenderDetails(m.senderId, "name")}
            />
          )
        })
      }
      {newMessagesIds.length > 0 && <div className=' w-full my-2 h-8 rounded-md bg-lime-600 bg-opacity-70 dark:bg-lime-600 dark:bg-opacity-40 flex justify-center items-center'>
        <p className='text-lg font-semibold'>{newMessagesIds.length} New Messages</p>
      </div>}
      {
        newMessagesIds.map((nid, i) => {
          const m = newMessages[nid];
          return (
            <MessageCard
              key={m._id}
              attachments={m.attachments}
              chatType={chatType}
              content={m.content}
              createdAt={m.createdAt}
              prevCreatedAt={i > 0 ? newMessages[newMessagesIds[i - 1]].createdAt : undefined}
              deliveryStatus={m.deliveryStatus}
              loggedInUserId={loggedInUserId}
              messgeType={m.messageType}
              prevSenderId={i > 0 ? newMessages[newMessagesIds[i - 1]].senderId : undefined}
              senderId={m.senderId}
              senderAvatar={getSenderDetails(m.senderId, "avatar")}
              senderName={getSenderDetails(m.senderId, "name")}
            />
          )
        })
      }
      {typingUsers.length > 0 && <div className='ml-1 mt-2'>
        <div 
          className={cn("z-10 relative flex items-center space-x-1 bg-primary-1 dark:bg-dark-3 text-white rounded-xl max-w-max transition-all duration-200 ease-linear ",
            chatType === "group" ? "p-2" : "p-[15px]"
          )}>
          {chatType === "group" && <p className='mr-1 font-bold text-dark-1 dark:text-white'>
            {getTypingString()}
          </p>}
          {dots()}
          <div className="-z-20 absolute h-0 w-0 border-l-[20px] border-t-[20px] border-r-[20px] border-l-transparent border-t-primary-1 dark:border-t-dark-3 border-r-transparent top-0 -left-3"></div>
        </div>
      </div>}
    </div>
  )
}

export default memo(MessageContainer);