import ChatBox from "@/components/chat-ui/ChatBox";
import ChatDetails from "@/components/chat-ui/ChatDetails";
import ChatList from "@/components/chat-ui/ChatList";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedChat, setSelectedChat] = useState(false);
  const toggleMode = () => {
    const list = document.documentElement.classList;
    if (list.contains('dark')) {
      list.remove('dark')
      list.add('light')
    }
    else {
      list.remove('light')
      list.add('dark')
    }
  }
  return (
    <MainLayout>
      <div className="absolute top-24 left-1 flex flex-col gap-5 bg-primary-1 dark:bg-dark-2 p-4 z-50 shadow-2xl rounded-md">
        <button onClick={() => setShow(!show)}>Toggle Details</button>
        <button onClick={() => setSelectedChat(!selectedChat)}>Toggle Chat</button>
        <button onClick={toggleMode}>Toggle Theme</button>
      </div>
      <div className="w-[100%] md:mt-6 h-[calc(100vh-90px)] md:h-[94vh] flex justify-center">
        {/* for small devices */}
        <div className="block md:hidden w-full h-full">
          {
            !selectedChat ? <ChatList /> : <>
              {show ? <ChatDetails /> : <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>}
            </>
          }
        </div>
        {/* for large devices */}
        <div className="hidden md:grid w-[95%] h-full grid-flow-col grid-cols-[1fr_2fr]">
          <ChatList />
          <div className="grid w-full h-full grid-flow-col auto-cols-auto gap-1">
            <ChatBox selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            {show && <ChatDetails />}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home