import type { ChatType, DeliveryStatus, IAttachment, MessageType } from '@/interface/interface';
import React, { memo } from 'react';
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar';
import { getAvatarStyle, getDateStyle, getMainConatainerStyle, getMessageBoxStyle, getMessageTimestamp, getNameStyle } from '@/utils/utility';
import { CheckCheckIcon, CheckIcon, DownloadIcon } from 'lucide-react';

interface MessageCardProps {
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  prevSenderId?: string;
  loggedInUserId: string;
  content: string;
  messgeType: MessageType;
  deliveryStatus: DeliveryStatus;
  attachments: IAttachment[];
  createdAt: string;
  chatType: ChatType
}
const MessageCard: React.FC<MessageCardProps> = ({
  loggedInUserId,
  senderId,
  senderAvatar,
  senderName,
  prevSenderId,
  content,
  messgeType,
  deliveryStatus,
  attachments,
  createdAt,
  chatType
}) => {
  const renderAttachment = (attachment: IAttachment) => {
    console.log("MessageCard rendering... "+ Math.random());
    
    const downloadButton = (
      <a target='_blank' href={attachment.fileUrl} download={"newfilename"} className="p-2">
        <DownloadIcon className='w-6 h-6 dark:hover:text-primary-1 hover:text-[#d3d3d3]' />
      </a>
    );

    switch (attachment.fileType) {
      case 'image':
        return (
          <div className="relative flex flex-col items-start">
            <img src={attachment.fileUrl} loading='lazy' alt={attachment.originalFileName} className="w-full max-h-[300px] object-cover rounded-lg" />
            {downloadButton}
          </div>
        );
      case 'video':
        return (
          <div className="relative flex flex-col items-start gap-2">
            <video controls className="w-full max-h-[450px] object-cover rounded-lg">
              <source src={attachment.fileUrl} type='video/mp4'/>
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="flex flex-col items-start gap-2">
            <audio controls className="w-full sm:w-[300px] md:w-[180px] xl:w-[280px] 2xl:w-[350px]">
              <source src={attachment.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case 'other':
      default:
        return (
          <div className="flex items-center gap-2 border-[1.5px] rounded-md px-1 dark:border-primary-6 border-dark-1">
            <p className="text-md font-bold">{attachment.originalFileName}</p>
            {downloadButton}
          </div>
        );
    }
  };
  return (
    <div className={`relative flex w-full mb-5 ${getMainConatainerStyle(senderId, loggedInUserId)}`}>
      <Avatar className={`w-8 h-8 ${getAvatarStyle(senderId, loggedInUserId, chatType, prevSenderId)}`}>
        <AvatarImage className='object-cover' src={senderAvatar} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className={
        `bg-primary-1 dark:bg-dark-3 px-3 py-2 max-w-[70%] mt-1
        ${getMessageBoxStyle(senderId, loggedInUserId, chatType, prevSenderId)}
      `}>
        <p className={`font-bold text-sm  ${getNameStyle(senderId, loggedInUserId, chatType, prevSenderId)}`}>{senderName}</p>
        {messgeType === "text" ?
          <p className='p-1'>{content}</p> :
          <>
            <div className="flex flex-col justify-center items-start">
              {
                attachments.map((attachment) => (
                  <div key={attachment.fileUrl} className="p-1 w-full">
                    {renderAttachment(attachment)}
                  </div>
                ))
              }
            </div>
            {content && <p className="p-1 pl-2">{content}</p>}
          </>
        }
      </div>
      <div
        className={`absolute bottom-[-17px] flex justify-center items-center gap-1 ${getDateStyle(senderId, loggedInUserId, chatType)}`}
      >
        <p className='text-xs'>{getMessageTimestamp(new Date(Number(createdAt)))}</p>
        {senderId === loggedInUserId &&
          (() => {
            switch (deliveryStatus) {
              case "sent":
                return <CheckIcon className='w-4 h-4 text-[#4b4b4b] dark:text-[#b6b6b6]' />
              case "delivered":
                return <CheckCheckIcon className='w-4 h-4 text-[#4b4b4b] dark:text-[#b6b6b6]' />
              case "seen":
                return <CheckCheckIcon className='w-4 h-4 text-[#e70000] dark:text-primary-1' />
            }
          })()
        }
      </div>
    </div>
  )
}

export default memo(MessageCard)