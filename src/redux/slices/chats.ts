import type { IChat, Participants, ParticipantsMap } from "@/interface/chatInterface";
import { getMapFromParticipants } from "@/utils/utility";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatState {
  chats: IChat[];
  participants: ParticipantsMap;
}

interface IChatPayloadMultiple {
  chats: IChat[],
  participants: Participants
}

const initialState: IChatState = {
  chats: [],
  participants: {},
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatState(state, action: PayloadAction<IChatPayloadMultiple>) {
      state.chats = action.payload.chats;
      state.participants = getMapFromParticipants(action.payload.participants);
    },
    updateChat(state, action: PayloadAction<IChat>) {
      const idx = state.chats.findIndex((chat) => chat._id === action.payload._id);
      if(idx !== -1){
        state.chats[idx] = action.payload;
      }
    },
    addToChatState(state, action: PayloadAction<IChatPayloadMultiple>) {
      state.chats.unshift(...action.payload.chats);
      const newParticipants = getMapFromParticipants(action.payload.participants);
      Object.entries(newParticipants).forEach(([key, value]) => {
        state.participants[key] = value;
      });
    },
    appendToChatState(state, action: PayloadAction<IChatPayloadMultiple>) {
      state.chats.push(...action.payload.chats);
      const newParticipants = getMapFromParticipants(action.payload.participants);
      Object.entries(newParticipants).forEach(([key, value]) => {
        state.participants[key] = value;
      });
    },
    addParticipant(state, action: PayloadAction<Participants>) {
      const newParticipants = getMapFromParticipants(action.payload);
      Object.entries(newParticipants).forEach(([key, value]) => {
        state.participants[key] = value;
      })
    },
    removeChat(state, action: PayloadAction<string>) {
      const idx = state.chats.findIndex((chat) => chat._id === action.payload);
      if(idx !== -1){
        state.chats.splice(idx, 1);
      }
    },
    toggleAdminInChatState(state, action: PayloadAction<{chatId: string, participantId: string}>) {
      const chat = state.chats.find(chat => chat._id === action.payload.chatId);
      if(chat && chat.chatType === "group"){
        const idx = chat.admins.findIndex(a => a === action.payload.participantId);
        if(idx === -1) chat.admins.push(action.payload.participantId);
        else chat.admins.splice(idx, 1);
      }
    },
    removeParticipantFromChatState(state, action: PayloadAction<{chatId: string, participantId: string}>) {
      const chat = state.chats.find(chat => chat._id === action.payload.chatId);
      if(chat && chat.chatType === "group"){
        const pdx = chat.participants.findIndex(p => p === action.payload.participantId);
        if(pdx !== -1) chat.participants.splice(pdx, 1);
        const adx = chat.admins.findIndex(a => a === action.payload.participantId);
        if(adx !== -1) chat.admins.splice(adx, 1);
      }
    }
  },
});

export const { 
  setChatState, 
  addToChatState, 
  appendToChatState,
  addParticipant, 
  removeChat, 
  updateChat ,
  toggleAdminInChatState,
  removeParticipantFromChatState
} = chatSlice.actions;
export default chatSlice.reducer;

