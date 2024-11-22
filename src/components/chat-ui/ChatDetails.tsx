import { useGetParticipantsInfo } from '@/hooks/chatHooks';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import type { IChat, Participants } from '@/interface/chatInterface';
import { cn } from '@/lib/utils';
import { setIsDetailsOn } from '@/redux/slices/selectedChat';
import { Plus, XIcon } from 'lucide-react';
import React, { memo, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import GroupMemberCard from './GroupMemberCard';
interface ChatDetailsProps {
  className?: string;
  selectedChat: IChat | null;
  userId:string;
}
const ChatDetails: React.FC<ChatDetailsProps> = ({
  className,
  selectedChat ,
  userId 
}) => {
  const participants = useAppSelector(state => state.chats.participants)
  const { getChatName, getChatProfile, getUserBio } = useGetParticipantsInfo(participants, userId);
  const currentChatParticipants = useMemo(():Participants => {    
    if (!selectedChat) return [];
    return selectedChat.participants.map(p => participants[p]);
  }, [participants, selectedChat]);
  const dispatch = useAppDispatch();

  const handleDetailClose = ()=>{
    dispatch(setIsDetailsOn(false));
  }
  console.log("CHAT DETAILS rendering..."+ Math.random());
  return (
    <div className={cn('relative bg-primary-4 dark:bg-dark-2 w-full h-full md:rounded-md', className)}>
      <div className='flex items-center justify-between px-5 py-2'>
        <p className='text-xl font-bold'>Chat Details</p>
        <XIcon className='w-6 h-6 cursor-pointer' onClick={handleDetailClose} />
      </div>
      <div className='absolute top-10 w-full left-0 bottom-0 overflow-auto p-2 flex flex-col items-center space-y-2'>
        {
          !selectedChat ?
            <div className='mt-28'>
              <p className='text-xl font-bold'>No chat is selected</p>
            </div> : <>
              <div className='space-y-2 flex flex-col items-center'>
                <Avatar className='w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64'>
                  <AvatarImage src={getChatProfile(selectedChat)} alt="user|group" />
                  <AvatarFallback>GSP</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-2xl font-bold text-center'>{getChatName(selectedChat)}</p>
                </div>
              </div>
              {selectedChat.chatType === "one-to-one" && <p className='w-full bg-primary-1 dark:bg-dark-3 p-2 rounded-sm text-lg '>{getUserBio(selectedChat)}</p>}
              {
                selectedChat.chatType === "group" && <>
                  <p className='text-sm text-center'>{selectedChat.participants.length} members</p>
                  <div className='w-full flex flex-wrap items-center justify-center gap-1'>
                    <Button className='bg-success dark:bg-primary-3 text-dark-1' >
                      <Plus className='w-5 h-5 mr-1' /> Add
                    </Button>
                  </div>
                  <div className='w-full'>
                    <p className='text-lg font-bold'>Members</p>
                    {
                      currentChatParticipants.map(p => (
                        <GroupMemberCard
                          key={p._id}
                          bio={p.bio}
                          name={p.name}
                          userId={p._id}
                          profilePic={p.profilePic}
                          isAdmin={selectedChat.admins.includes(p._id)}
                        />
                      ))
                    }
                  </div>
                </>
              }
            </>
        }
      </div>
    </div>
  )
}

export default memo(ChatDetails)