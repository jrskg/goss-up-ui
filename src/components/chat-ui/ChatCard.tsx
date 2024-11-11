import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'

interface ChatCardProps {
  _id: string
  avatar: string
  chatName: string
  lastMessage?: string
  lastMessageTime?: string
  selectedId?: string
}
const ChatCard: React.FC<ChatCardProps> = ({
  _id,
  avatar,
  chatName,
  lastMessage,
  lastMessageTime,
  selectedId
}) => {
  return (
    <div className={cn("flex items-center justify-between px-2 py-3 hover:bg-primary-5 dark:hover:bg-dark-3 cursor-pointer", selectedId === _id && "bg-primary-2 dark:bg-dark-4")}>
      <div className='flex items-center gap-2'>
        <Avatar className='w-12 h-12'>
          <AvatarImage src={avatar} alt="user" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-lg font-bold'>{chatName}</p>
          {lastMessage && <p className='text-sm'>{lastMessage}</p>}
        </div>
      </div>
      <div>
        {lastMessageTime && <p className='text-xs'>{lastMessageTime}</p>}
      </div>
    </div>
  )
}
export default ChatCard