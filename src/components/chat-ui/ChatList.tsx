import { useAppSelector } from '@/hooks/hooks';
import type { IChat } from '@/interface/interface';
import { getChatProfile, getLastMessageText, getMessageTimestamp } from '@/utils/utility';
import { EllipsisVerticalIcon } from 'lucide-react';
import React, { useState } from 'react';
import MyTab from '../MyTab';
import SearchBar from '../SearchBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ChatCard from './ChatCard';

const data: IChat[] = [
  {
    _id: "64f7c5d582b9a45df3ef1d71",
    chatType: "one-to-one",
    participants: [
      {
        _id: "64f7c5d582b9a45df3ef1d55",
        name: "Alice",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      },
      {
        _id: "64f7c5d582b9a45df3ef1d56",
        name: "Bob",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      }
    ],
    admin: [],
    lastMessageId: {
      messageType: "text",
      content: "Hi, how can I help you?"
    },
    createdAt: "2024-10-11T08:32:19.000Z",
    updatedAt: "2024-10-11T08:32:19.000Z"
  },
  {
    _id: "64f7c5d582b9a45df3ef1d72",
    chatType: "group",
    participants: [
      {
        _id: "64f7c5d582b9a45df3ef1d55",
        name: "Alice",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      },
      {
        _id: "64f7c5d582b9a45df3ef1d57",
        name: "Charlie",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      },
      {
        _id: "64f7c5d582b9a45df3ef1d58",
        name: "David",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      }
    ],
    groupName: "Project Discussion",
    groupIcon: {
      avatar: "https://picsum.photos/200",
      publicId: "64f7c5d582b9a45df3ef1d55",
      image: "https://picsum.photos/200"
    },
    admin: [
      "64f7c5d582b9a45df3ef1d55"
    ],
    lastMessageId: {
      messageType: "text",
      content: "I am working on a project"
    },
    createdAt: "2024-10-12T10:45:19.000Z",
    updatedAt: "2024-10-12T10:45:19.000Z"
  },
  {
    _id: "64f7c5d582b9a45df3ef1d73",
    chatType: "one-to-one",
    participants: [
      {
        _id: "64f7c5d582b9a45df3ef1d59",
        name: "Eve",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      },
      {
        _id: "64f7c5d582b9a45df3ef1d60",
        name: "Frank",
        profilePic: {
          avatar: "https://picsum.photos/200",
          publicId: "64f7c5d582b9a45df3ef1d55",
          image: "https://picsum.photos/200"
        }
      }
    ],
    admin: [],
    lastMessageId: {
      messageType: "file",
      content: ""
    },
    createdAt: "2024-10-13T13:12:19.000Z",
    updatedAt: "2024-10-13T13:12:19.000Z"
  }
]

const ChatList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const { user } = useAppSelector(state => state.user);

  return (
    <div className='bg-primary-6 dark:bg-dark-2 w-full h-full md:rounded-tl-md md:rounded-bl-sm relative'>
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
      <div>
        <SearchBar
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
      <div className='absolute top-[132px] bottom-0 w-full overflow-auto py-2 px-1'>
        {
          data.map((ch) => (
            <ChatCard
              key={ch._id}
              _id={ch._id}
              avatar={getChatProfile(ch, user?._id!)}
              chatName={ch.chatType === "group" ? ch.groupName : ch.participants.find(p => p._id !== user?._id)?.name!}
              lastMessage={getLastMessageText(ch.lastMessageId)}
              lastMessageTime={ch.lastMessageId && getMessageTimestamp(new Date(ch.updatedAt))}
              selectedId='64f7c5d582b9a45df3ef1d71'
            />
          ))
        }
      </div>
    </div>
  )
}

export default ChatList