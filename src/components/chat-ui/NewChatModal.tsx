import { LoggedInUserContext } from '@/context/contexts';
import { useChatActions } from '@/hooks/chatHooks';
import { useAppDispatch } from '@/hooks/hooks';
import { addToChatState } from '@/redux/slices/chats';
import { setSelectedChat } from '@/redux/slices/selectedChat';
import React, { Dispatch, SetStateAction, useCallback, useContext, useRef } from 'react';
import Loader from '../Loader';
import MyDialog from '../MyDialogue';
import FriendSelector from './FriendSelector';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>
}
const NewChatModal: React.FC<Props> = ({
  isOpen,
  onClose
}) => {
  const {_id:loggedInUserId} = useContext(LoggedInUserContext)!;
  const {createOneToOneChat, loading} = useChatActions(loggedInUserId);
  const dispatch = useAppDispatch();
  const loadingRef = useRef(false);
  
  const onFriendClick = useCallback(async(friendId: string) => {
    if(!friendId || loadingRef.current){
      toast.success("HOLD ON BRO! Creating chat...");
      return;
    };
    loadingRef.current = true;
    const response = await createOneToOneChat(friendId);
    if(!response)return;
    if(response.participants.length > 0){
      dispatch(addToChatState({chats:[response.chat], participants:response.participants}));
    }
    dispatch(setSelectedChat(response.chat));
    loadingRef.current = false;
    onClose(false);
  }, [createOneToOneChat, dispatch, onClose]);

  return (
    <MyDialog 
      isOpen={isOpen} 
      setIsOpen={onClose} 
      header='Select a friend' 
      dissmissable={!loading}
      footer={
         <div className='w-full'>
          {loading && <Loader/>}
        </div>
      }
    >
      <div className='min-h-[400px] max-h-[75vh] h-[60vh]'>
        <FriendSelector onFriendClick={onFriendClick} />
      </div>
    </MyDialog>
  )
}

export default NewChatModal