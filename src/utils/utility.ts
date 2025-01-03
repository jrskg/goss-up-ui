// import { toast } from "sonner";

// const checkConnection = async (): Promise<boolean> => {
//   try {
//     const response = await fetch("https://www.google.com", {
//       method: "HEAD",
//       mode: "no-cors",
//     });
//     return response.ok;
//   } catch (error) {
//     toast.error("Please check your internet connection");
//     return false;
//   }
// }

// export { checkConnection }

import type { Participants, ParticipantsMap, ChatType, ILastMessage } from '@/interface/chatInterface';
import { format, isAfter, isSameDay, isSameYear, subDays } from 'date-fns';

const toggleDarkMode = (setDarkMode: boolean) => {
  const list = document.documentElement.classList;
  if (setDarkMode) {
    list.add('dark')
    list.remove('light')
  }
  else {
    list.remove('dark')
    list.add('light')
  }
}

const getDateStr = (createdAt: string) => {
  const date = new Date(createdAt)
  const currDate = new Date(Date.now())
  const diffDays = Math.floor((currDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays <= 6) {
    return `${diffDays} days ago`
  }
  return Math.floor(diffDays / 7) + " weeks ago";
}

const getMessageTimestamp = (date?: Date): { time: string, date?: string } => {
  if (!date) {
    return { time: "", date: "" };
  }
  const now = new Date();
  if (isSameDay(date, now)) {
    return { time: format(date, 'p'), date: "Today" }; // "10:45 AM"
  }
  if (isSameDay(date, subDays(now, 1))) {
    // return `Yesterday, ${format(date, 'p')}`; // "Yesterday, 9:30 PM"
    return {
      time: format(date, 'p'),
      date: 'Yesterday'
    }
  }
  if (isAfter(date, subDays(now, 7))) {
    // return format(date, 'EEE, p'); // "Wed, 2:15 PM"
    return {
      time: format(date, 'p'),
      date: format(date, 'EEE')
    }
  }
  if (isSameYear(date, now)) {
    // return format(date, 'd MMM, p'); // "11 Jun, 5:00 PM"
    return {
      time: format(date, 'p'),
      date: format(date, 'd MMM')
    }
  }
  // return format(date, 'd MMM yyyy'); // "11 Jun 2023, 5:00 PM"
  return {
    time: format(date, 'p'),
    date: format(date, 'd MMM yyyy')
  }
};

const getMainConatainerStyle = (sId: string, lguId: string): string => {
  return sId === lguId ?
    'flex-row-reverse' :
    'flex-row gap-2';
}
const getAvatarStyle = (sId: string, lguId: string, chType: ChatType, psId?: string): string => {
  if (chType === "one-to-one") {
    return "hidden";
  }
  else if (chType === "group") {
    if (sId === lguId || sId === psId) {
      return "hidden";
    }
  }
  return "block";
}
const getMessageBoxStyle = (sId: string, lguId: string, chType: ChatType, psId?: string): string => {
  const isAvatarVisible = getAvatarStyle(sId, lguId, chType, psId) === "block";
  if (sId === lguId) {
    return sId === psId ? "mr-2 rounded-xl" : "mr-2 rounded-xl rounded-tr-none";
    // return sId === psId ? "rounded-3xl" : "rounded-3xl rounded-tr-none";
  } else if (chType === "one-to-one") {
    // return sId === psId ? "rounded-3xl" : "rounded-3xl rounded-tl-none";
    return sId === psId ? "ml-2 rounded-xl" : "ml-2 rounded-xl rounded-tl-none";
  }
  return isAvatarVisible ? "rounded-xl rounded-tl-none" : "rounded-xl ml-10";
}

const getTriangleStyle = (sId: string, lguId: string, psId?: string): string => {
  if (sId === lguId) {
    return sId === psId ? "hidden" : "-right-3";
  }
  return sId === psId ? "hidden" : "-left-3";
}

const getNameStyle = (sId: string, lguId: string, chType: ChatType, psId?: string): string => {
  if (sId === lguId) {
    return "hidden";
  }
  return getAvatarStyle(sId, lguId, chType, psId);
}

const getDateStyle = (sId: string, lguId: string, chType: ChatType): string => {
  if (sId === lguId) {
    return "right-4";
  }
  else if (chType === "group" && sId !== lguId) {
    return "left-12";
  }
  else if (chType === "one-to-one" && sId !== lguId) {
    return "left-4";
  }
  return "";
}

const getLastMessageText = (lastMessage?: ILastMessage): string => {
  if (!lastMessage) return "";
  if (lastMessage.messageType === "text") return lastMessage.content;
  return "Sent an attachment";
}

const getMapFromParticipants = (participants: Participants): ParticipantsMap => {
  const map: ParticipantsMap = {};
  participants.forEach(p => map[p._id] = p);
  return map;
}

function throttle(func: Function, limit: number) {
  let lastCall = 0;
  return function (...args: any) {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  }
}

export {
  getAvatarStyle,
  getDateStr,
  getDateStyle,
  getLastMessageText,
  getMainConatainerStyle,
  getMapFromParticipants,
  getMessageBoxStyle,
  getMessageTimestamp,
  getNameStyle,
  toggleDarkMode,
  getTriangleStyle,
  throttle
};

