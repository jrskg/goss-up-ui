import { useGetAllChats, useGetParticipantsInfo } from '@/hooks/chatHooks';
import { useAppDispatch } from '@/hooks/hooks';
import { IChat } from '@/interface/chatInterface';
import { cn } from '@/lib/utils';
import { setSelectedChat } from '@/redux/slices/selectedChat';
import { getLastMessageText, getMessageTimestamp } from '@/utils/utility';
import { EllipsisVerticalIcon } from 'lucide-react';
import React, { memo, useCallback, useContext, useState } from 'react';
import MyTab from '../MyTab';
import SearchBar from '../SearchBar';
import ChatListSkeleton from '../skeleton/ChatListSkeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ChatCard from './ChatCard';
import NewChatModal from './NewChatModal';
import { ChatsContext, LoggedInUserContext, ParticipantsContext, SelectedChatContext } from '@/context/contexts';
import CreateGroupChatModal from './CreateGroupChatModal';

interface ChatListProps {
  // selectedChatId?: string;
  // userId: string;
  className?: string
}
const ChatList: React.FC<ChatListProps> = ({
  // selectedChatId = "",
  // userId,
  className
}) => {
  console.log("CHAT LIST rendering..." + Math.random());
  const { _id: userId } = useContext(LoggedInUserContext)!;
  const chats = useContext(ChatsContext)!;
  const participants = useContext(ParticipantsContext)!;
  const selectedChat = useContext(SelectedChatContext);
  const [selectedTab, setSelectedTab] = useState("all");
  const {
    loading,
  } = useGetAllChats(chats);
  const { getChatAvatar, getChatName } = useGetParticipantsInfo(participants, userId);
  const dispatch = useAppDispatch();
  const handleChatClick = useCallback((sc: IChat) => {
    dispatch(setSelectedChat(sc));
  }, []);

  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  return (
    <div className={cn('bg-primary-6 dark:bg-dark-2 w-full h-full md:rounded-tl-md md:rounded-bl-sm relative', className)}>
      <NewChatModal
        isOpen={newChatModalOpen}
        onClose={setNewChatModalOpen}
      />
      <CreateGroupChatModal
        isOpen={createGroupModal}
        onClose={setCreateGroupModal}
      />
      <div className='flex items-center justify-between px-5 py-2 h-[50px]'>
        <p className='text-xl font-bold'>Chat List</p>
        <DropdownMenu open={dropDownOpen} onOpenChange={(ok) => setDropDownOpen(ok)}>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon className='w-6 h-6 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-primary-3 dark:bg-dark-1 border-none'>
            <DropdownMenuItem onClick={() => { setNewChatModalOpen(true); setDropDownOpen(false) }} className='cursor-pointer'>New Chat</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setCreateGroupModal(true); setDropDownOpen(false) }} className='cursor-pointer'>Create Group</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {
        !loading && <>
          <div>
            <SearchBar
              hasButton={false}
              className='p-1'
              onFocus={() => setNewChatModalOpen(true)}
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
                isChatSelected={ch._id === selectedChat?._id}
              />
            ))
          )
        }
      </div>
    </div>
  )
}

export default memo(ChatList)