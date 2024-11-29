import type { IChat, ParticipantsMap } from "@/interface/chatInterface";
import type { IUser } from "@/interface/interface";
import { createContext } from "react";

export const LoggedInUserContext = createContext<IUser | null>(null);
export const SelectedChatContext = createContext<IChat | null>(null);
export const ChatsContext = createContext<IChat[] | null>(null);
export const ParticipantsContext = createContext<ParticipantsMap | null>(null);