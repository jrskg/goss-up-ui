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
    addToChatState(state, action: PayloadAction<IChatPayloadMultiple>) {
      state.chats.push(...action.payload.chats);
      const newParticipants = getMapFromParticipants(action.payload.participants);
      Object.entries(newParticipants).forEach(([key, value]) => {
        state.participants[key] = value;
      });
    },
    addChat(state, action: PayloadAction<IChat>) {
      state.chats.push(action.payload);
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
  },
});

export const { setChatState, addToChatState, addChat, addParticipant, removeChat } = chatSlice.actions;
export default chatSlice.reducer;

