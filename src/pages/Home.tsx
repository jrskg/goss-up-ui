import ChatBox from "@/components/chat-ui/ChatBox";
import ChatDetails from "@/components/chat-ui/ChatDetails";
import ChatList from "@/components/chat-ui/ChatList";
import { ChatsContext, LoggedInUserContext, ParticipantsContext, SelectedChatContext } from "@/context/contexts";
import { useAppSelector } from "@/hooks/hooks";
import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";

const Home = () => {
  const { isDetailsOn, selectedChat } = useAppSelector((state) => state.selectedChat);
  const { chats, participants } = useAppSelector((state) => state.chats);
  const { user } = useAppSelector((state) => state.user);
  const [screenSize, setScreenSize] = useState<string>("large");

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) setScreenSize("small");
      else if (window.innerWidth < 1280) setScreenSize("medium");
      else setScreenSize("large");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  console.log("Home rendering...", Math.random());

  return (
    <MainLayout>
      <LoggedInUserContext.Provider value={user}>
        <SelectedChatContext.Provider value={selectedChat}>
          <ChatsContext.Provider value={chats}>
            <ParticipantsContext.Provider value={participants}>
              <div className="w-full md:mt-6 h-[calc(100vh-90px)] md:h-[94vh] flex justify-center">
                {!(screenSize === "medium" || screenSize === "large") && <ChatList
                  // userId={user?._id!}
                  // selectedChatId={selectedChat?._id}
                  className={(screenSize === "small" && selectedChat) ? "hidden" : ""}
                />}

                {screenSize === "small" && selectedChat && (
                  isDetailsOn ? (
                    <ChatDetails
                      // userId={user?._id!}
                      // selectedChat={selectedChat}
                      className="w-full"
                    />
                  ) : (
                    <ChatBox
                      // userId={user?._id!}
                      // selectedChat={selectedChat}
                      className="w-full"
                    />
                  )
                )}

                {screenSize === "medium" && (
                  <div className="grid w-[95%] h-full grid-flow-col grid-cols-[1fr_1fr]">
                    {/* <ChatList userId={user?._id!} selectedChatId={selectedChat?._id} /> */}
                    <ChatList />
                    {isDetailsOn ? (
                      <ChatDetails
                        // userId={user?._id!}
                        // selectedChat={selectedChat}
                        className="md:rounded-tl-none md:rounded-bl-none border-l dark:border-primary-1"
                      />
                    ) : (
                      // <ChatBox userId={user?._id!} selectedChat={selectedChat} />
                      <ChatBox />
                    )}
                  </div>
                )}

                {screenSize === "large" && (
                  <div className="grid w-[95%] h-full grid-flow-col grid-cols-[1fr_2fr]">
                    {/* <ChatList userId={user?._id!} selectedChatId={selectedChat?._id} /> */}
                    <ChatList />
                    <div className="flex w-full h-full gap-1">
                      <ChatBox
                        // userId={user?._id!}
                        // selectedChat={selectedChat}
                        className={isDetailsOn ? "w-[55%]" : "w-[100%]"}
                      />
                      {isDetailsOn && (
                        <ChatDetails
                          // userId={user?._id!}
                          // selectedChat={selectedChat}
                          className="w-[45%]"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ParticipantsContext.Provider>
          </ChatsContext.Provider>
        </SelectedChatContext.Provider>
      </LoggedInUserContext.Provider>
    </MainLayout>
  );
};

export default Home;
