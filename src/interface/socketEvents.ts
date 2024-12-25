import {SOCKET_EVENTS} from "../utils/constants";
import { IMessage } from "./chatInterface";

export type SocketEventMap = {
  [SOCKET_EVENTS.JOIN_ROOM]: (payload: { 
    currRoomId: string, 
    prevRoomId: string | null,
  }) => void;
  [SOCKET_EVENTS.LEAVE_ROOM]: (payload: { roomId: string }) => void;
  [SOCKET_EVENTS.SEND_MESSAGE]: (payload:{
    roomId: string, 
    message: IMessage, 
    senderId: string, 
    participants: string[]
  }) => void;
  [SOCKET_EVENTS.NEW_MESSAGE]: (payload:{roomId: string, message: IMessage}) => void;
}