import { useGetAllChats, useGetParticipantsInfo } from '@/hooks/chatHooks';
import { useAppDispatch } from '@/hooks/hooks';
import { IChat } from '@/interface/chatInterface';
import { cn } from '@/lib/utils';
import { setSelectedChat } from '@/redux/slices/selectedChat';
import { getLastMessageText, getMessageTimestamp } from '@/utils/utility';
import { EllipsisVerticalIcon } from 'lucide-react';
import React, { memo, useCallback, useState } from 'react';
import MyTab from '../MyTab';
import SearchBar from '../SearchBar';
import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ChatCard from './ChatCard';

interface ChatListProps {
  selectedChatId?: string;
  userId: string;
  className?: string
}
const ChatList: React.FC<ChatListProps> = ({
  selectedChatId = "",
  userId,
  className
}) => {
  console.log("CHAT LIST rendering..." + Math.random());
  const [selectedTab, setSelectedTab] = useState("all");
  const {
    chats,
    participants,
    loading,
  } = useGetAllChats();
  const { getChatAvatar, getChatName } = useGetParticipantsInfo(participants, userId);
  const dispatch = useAppDispatch();
  const handleChatClick = useCallback((sc: IChat) => {
    dispatch(setSelectedChat(sc));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={cn('bg-primary-6 dark:bg-dark-2 w-full h-full md:rounded-tl-md md:rounded-bl-sm relative', className)}>
      <div className='flex items-center justify-between px-5 py-2 h-[50px]'>
        <p className='text-xl font-bold'>Chat List</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon className='w-6 h-6 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-primary-3 dark:bg-dark-1 border-none'>
            <DropdownMenuItem className='cursor-pointer'>New Chat</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Create Group</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {
        !loading && <>
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(text) => setSearchQuery(text)}
              hasButton={false}
              className='p-1'
              inputClassName='rounded-sm bg-primary-5 dark:bg-dark-3 focus-visible:ring-0'
              placeholder={selectedTab === "all" ? "Search in friends" : "Search in group"}
            />
          </div>
          <MyTab
            containerClassName='p-1'
            selectedTab={selectedTab}
            onChange={(tab) => setSelectedTab(tab)}
            tabs={["all", "group"]}
          />
        </>
      }
      <div className={cn('absolute top-[132px] bottom-0 w-full overflow-auto py-2 px-1', loading && "top-[40px]")}>
        {
          loading ? (<ChatListSkeleton />) : (
            chats.map((ch) => (
              <ChatCard
                key={ch._id}
                avatar={getChatAvatar(ch)}
                chatName={getChatName(ch)}
                lastMessage={getLastMessageText(ch.lastMessageId)}
                lastMessageTime={ch.lastMessageId && getMessageTimestamp(new Date(ch.updatedAt))}
                chat={ch}
                onChatClick={handleChatClick}
                isChatSelected={ch._id === selectedChatId}
              />
            ))
          )
        }
      </div>
    </div>
  )
}

export default memo(ChatList)