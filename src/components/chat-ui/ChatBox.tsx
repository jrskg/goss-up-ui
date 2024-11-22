import { useGetParticipantsInfo } from '@/hooks/chatHooks'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { cn } from '@/lib/utils'
import { setIsDetailsOn, setSelectedChat } from '@/redux/slices/selectedChat'
import { AvatarImage } from '@radix-ui/react-avatar'
import { MessageCircleMoreIcon, PaperclipIcon, SendHorizonalIcon, XIcon } from 'lucide-react'
import React, { memo } from 'react'
import { Avatar } from '../ui/avatar'
import { Textarea } from '../ui/textarea'
import MessageContainer from './MessageContainer'
import { IChat } from '@/interface/chatInterface'

interface ChatBoxProps {
  className?:string;
  selectedChat:IChat | null;
  userId:string;
}
const ChatBox: React.FC<ChatBoxProps> = ({
  className,
  selectedChat,
  userId
}) => {
  console.log("CHAT BOX rendering... chatbox"+ Math.random());
  const dispatch = useAppDispatch();
  const {participants} = useAppSelector(state => state.chats);
  const {getChatAvatar, getChatName} = useGetParticipantsInfo(participants, userId);
  const handleCloseChat = () => {
    dispatch(setSelectedChat(null));
  }
  const handleDetailsClick = () => {
    dispatch(setIsDetailsOn(true));
  }
  return (
    <div className={cn("transition-all duration-300 bg-primary-5 dark:bg-dark-2 h-full md:rounded-tr-md md:rounded-br-md md:border-l md:dark:border-primary-1 relative", className)}>
      {
        selectedChat ? <>
          <div onClick={handleDetailsClick} className='w-full bg-primary-1 dark:bg-dark-3 px-5 py-2 md:rounded-tr-md flex items-center gap-2 h-[65px] relative cursor-pointer'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={getChatAvatar(selectedChat)} />
            </Avatar>
            <div>
              <p className='text-xl font-bold leading-none'>{getChatName(selectedChat)}</p>
              {/* <p className='text-sm'>Status</p> */}
            </div>
            <XIcon onClick={handleCloseChat} className='absolute right-3 w-6 h-6 cursor-pointer md:hidden' />
          </div>
          <div className='absolute top-[65px] bottom-[85px] w-full overflow-auto'>
            <MessageContainer/>
            {/* <MessageContainerSkeleton/> */}
          </div>
          <div className='h-[85px] absolute bottom-0 left-0 bg-primary-1 dark:bg-dark-3 w-full rounded-br-md flex items-center px-2 justify-evenly'>
            <PaperclipIcon className='md:w-8 md:h-8 w-6 h-6 cursor-pointer' />
            <Textarea rows={2} className='resize-none w-[80%] text-md bg-primary-6 dark:bg-dark-1' />
            <div className='flex justify-center items-center bg-primary-6 dark:bg-primary-1 p-2 md:p-3 rounded-full'>
              <SendHorizonalIcon className='w-6 h-6 md:h-8 cursor-pointer md:w-8' />
            </div>
          </div>
        </> : (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <MessageCircleMoreIcon className='w-52 h-52 text-primary-1 mb-5'/>
            <p className='text-2xl font-bold text-primary-1'>No Chat Selected</p>
            <p className='text-dark-3 dark:text-dark-6'>Click on a user from left chat list</p>
          </div>
        )
      }
    </div>
  )
}

export default memo(ChatBox)
