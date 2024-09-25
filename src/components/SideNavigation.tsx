import React, { useState } from "react";
import NavigationTab from "./NavigationTab";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
const SideNavigation: React.FC = () => {
  const [tab, setTab] = useState(window.location.pathname);

  const navigate = useNavigate();
  const getColor = (path: string): string => {
    return path === tab ? "text-[#f5f5f5]" : "text-[#c5c5c5]"
  }
  const handleNavigation = (tab: string) => {
    setTab(tab);
    navigate(tab);
  }
  const handleLogout = () => {
    alert("Logout")
  }
  return (
    <div className="flex items-center justify-between w-screen h-[90px] fixed bottom-0 md:top-0 md:left-0 md:flex-col md:w-[90px] bg-[#0a1624] pl-12 pr-12 md:h-screen md:pt-12 md:pb-12 dark:bg-[#070707]">
      <div className="hidden md:block"></div>
      <div className="flex justify-between items-center w-screen md:flex-col md:w-[unset]">
        <NavigationTab
          label="All Chats"
          icon={<ChatBubbleRoundedIcon className={getColor("/")} sx={{ width: 30, height: 30 }} />}
          isActive={tab === "/"}
          onClick={() => handleNavigation("/")}
        />
        <NavigationTab
          label="Friends"
          icon={<PeopleIcon className={getColor("/friends")} sx={{ width: 30, height: 30 }} />}
          isActive={tab === "/friends"}
          onClick={() => handleNavigation("/friends")}
        />
        <NavigationTab
          label="Notification"
          icon={<NotificationsIcon className={getColor("/notifications")} sx={{ width: 30, height: 30 }} />}
          isActive={tab === "/notifications"}
          onClick={() => handleNavigation("/notifications")}
        />
        <NavigationTab
          label="Profile"
          icon={<AccountCircleIcon className={getColor("/profile")} sx={{ width: 30, height: 30 }} />}
          isActive={tab === "/profile"}
          onClick={() => handleNavigation("/profile")}
        />
      </div>
      <div className="hidden md:block">
        <NavigationTab
          label="Logout"
          icon={<LogoutIcon className="text-[#f5f5f5]" sx={{ width: 20, height: 20 }} />}
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default SideNavigation