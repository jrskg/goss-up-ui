import { DeliveryStatus, IAttachment, MessageType } from '@/interface/interface';
import React, { memo } from 'react';
import MessageCard from './MessageCard';

const messages = [
  {
    _id: "001ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "Hey, how are you?",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678000000", // timestamp in milliseconds
  },
  {
    _id: "001AID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "WHats up?",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678000000", // timestamp in milliseconds
  },
  {
    _id: "002ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "I'm good, thanks! What about you?",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678060000", // timestamp in milliseconds
  },
  {
    _id: "002AID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "What Has been up?",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678060000", // timestamp in milliseconds
  },
  {
    _id: "003ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "Doing well! Did you finish the task?",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678120000",
  },
  {
    _id: "004ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "",
    messageType: "file",
    deliveryStatus: "sent",
    attachments: [
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704167/chat_assests/kcwogy3fadlnohy8mkq0.mp4",
        fileType: "video",
        originalFileName: "okay.mp4",
        size: 512000,
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/raw/upload/v1730704152/chat_assests/fcgoapdmuwlz9afn3tt7.odt",
        fileType: "other",
        originalFileName: "project.odt",
        size: 512000,
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/image/upload/v1730704149/chat_assests/lrcyrzfgiz3ochkgzkhv.jpg",
        fileType: "image",
        originalFileName: "project.jpg",
        size: 512000,
      },
    ],
    createdAt: "1698678180000",
  },
  {
    _id: "005ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "Got it, checking now.",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678240000",
  },
  {
    _id: "006ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "Let me know if you need any updates.",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678300000",
  },
  {
    _id: "007ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "",
    messageType: "file",
    deliveryStatus: "seen",
    attachments: [
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704160/chat_assests/sxik9ctag3bdfzu6izo5.mp4",
        fileType: "video",
        originalFileName: "updated_mockup.mp4",
        size: 1048576, // 1 MB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704151/chat_assests/pr5ocdsluvq6hcjldsap.mp4",
        fileType: "audio",
        originalFileName: "updated_mockup.mp3",
        size: 1048576, // 1 MB
      },
    ],
    createdAt: "1698678360000",
  },
  {
    _id: "008ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "Thanks, I'll review it.",
    messageType: "file",
    deliveryStatus: "delivered",
    attachments: [
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704151/chat_assests/eby1fjpcfzfvucocv6ye.mp4",
        fileType: "audio",
        originalFileName: "updated_mockup.mp3",
        size: 1048576, // 1 MB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704151/chat_assests/nfnclz1k29wdkteqkhhl.mp4",
        fileType: "audio",
        originalFileName: "updated_mockup.mp3",
        size: 1048576, // 1 MB
      },
    ],
    createdAt: "1698678420000",
  },
  {
    _id: "009ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "No problem, take your time. This is a big text file that will take a while to download and process on your end device.",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678480000",
  },
  {
    _id: "0010ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "",
    messageType: "file",
    deliveryStatus: "sent",
    attachments: [
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/raw/upload/v1730704150/chat_assests/msdthl3pf6wmefyjmn34.txt",
        fileType: "other",
        originalFileName: "mockupTxt.txt",
        size: 256000, // 250 KB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/image/upload/v1730704095/chat_assests/eaj0ixtjpcazdws5kosj.jpg",
        fileType: "image",
        originalFileName: "mockupTxt.jpg",
        size: 256000, // 250 KB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/video/upload/v1730704154/chat_assests/mwnrbjtz19ixsnyhmxvx.mp4",
        fileType: "video",
        originalFileName: "mockupTxt.mp4",
        size: 256000, // 250 KB
      },
    ],
    createdAt: "1698678540000",
  },
  {
    _id: "0011ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "Looks good, I'll update the team.",
    messageType: "text",
    deliveryStatus: "seen",
    attachments: [],
    createdAt: "1698678600000",
  },
  {
    _id: "0012ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "Thanks, appreciate it!",
    messageType: "text",
    deliveryStatus: "delivered",
    attachments: [],
    createdAt: "1698678660000",
  },
  {
    _id: "0013ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "No problem! Let's catch up later.",
    messageType: "text",
    deliveryStatus: "sent",
    attachments: [],
    createdAt: "1698678720000",
  },
  {
    _id: "0014ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789013",
    content: "Sure, see you soon!",
    messageType: "text",
    deliveryStatus: "seen",
    attachments: [],
    createdAt: "1698678780000",
  },
  {
    _id: "0015ID",
    chatId: "653c739f123abcdf45678901",
    senderId: "653c73ae234bcdef56789012",
    content: "Bye!",
    messageType: "file",
    deliveryStatus: "delivered",
    attachments: [
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/image/upload/v1730704151/chat_assests/nyigtbfdpuedgdv1xduo.pdf",
        fileType: "other",
        originalFileName: "data.pdf",
        size: 256000, // 250 KB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/raw/upload/v1730704151/chat_assests/svyzfkad7sce1vkrpz9l.odt",
        fileType: "other",
        originalFileName: "formatting.odt",
        size: 256000, // 250 KB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/raw/upload/v1730704150/chat_assests/rlv1wmn2vpg7xhqxreo1.ods",
        fileType: "other",
        originalFileName: "formatting_2.ods",
        size: 256000, // 250 KB
      },
      {
        fileUrl: "https://res.cloudinary.com/dg2jnf6ns/image/upload/v1730704152/chat_assests/jizaqfl08h9ldpxczmf6.pdf",
        fileType: "other",
        originalFileName: "sample.pdf",
        size: 256000, // 250 KB
      }
    ],
    createdAt: "1698678840000",
  },
];
const MessageContainer: React.FC = () => {
  console.log("MessageContainer rendering... "+ Math.random());
  
  return (
    <div className='w-full p-2'>
      {
        messages.map((m, i) => (
          <MessageCard
            key={m._id}
            attachments={m.attachments as IAttachment[]}
            chatType="group"
            content={m.content}
            createdAt={m.createdAt}
            deliveryStatus={m.deliveryStatus as DeliveryStatus}
            loggedInUserId={"653c73ae234bcdef56789013"}
            messgeType={m.messageType as MessageType}
            prevSenderId={i > 0 ? messages[i - 1].senderId : undefined}
            senderId={m.senderId}
            senderAvatar={"https://picsum.photos/200"}
            senderName={"Okay Gupta"}
          />
        ))
      }
    </div>
  )
}

export default memo(MessageContainer)