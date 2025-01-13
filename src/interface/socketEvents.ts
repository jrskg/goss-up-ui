import {SOCKET_EVENTS} from "../utils/constants";
import type { DeliveryStatus, IMessage } from "./chatInterface";

export interface IMessageStatusUpdatePayload {
  roomId: string;
  messageId: string;
  status: DeliveryStatus;
  senderId: string;
}

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
  [SOCKET_EVENTS.USER_TYPING]: (payload: {roomId: string, userId: string, name: string}) => void;
  [SOCKET_EVENTS.USER_STOP_TYPING]: (payload: {roomId: string, userId: string, name: string}) => void;
  [SOCKET_EVENTS.MESSAGE_STATUS_UPDATE]: (payload: IMessageStatusUpdatePayload[]) => void;
  // [SOCKET_EVENTS.MESSAGE_STATUS_UPDATE_BULK]: (payload: IMessageStatusUpdatePayload[]) => void;
}