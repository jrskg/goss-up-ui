import type { IChat } from "@/interface/chatInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectedChat {
  selectedChat: IChat | null;
  isDetailsOn: boolean;
}

const initialState:ISelectedChat = {
  selectedChat: null,
  isDetailsOn: false
}

const selectedChatSlice = createSlice({
  name:"selectedChat",
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<IChat | null>) {
      state.selectedChat = action.payload;
      state.isDetailsOn = false;
    },
    setIsDetailsOn(state, action: PayloadAction<boolean>) {
      state.isDetailsOn = action.payload;  
    }
  }
});

export const { setSelectedChat, setIsDetailsOn } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;