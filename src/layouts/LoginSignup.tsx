import React, { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
interface ContainerProps {
  children: React.ReactNode;
}
const LoginSignup:React.FC<ContainerProps> = ({
  children
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const list = document.documentElement.classList;
    if(darkMode) {
      list.remove('dark')
      list.add('light')
    }
    else{
      list.add('dark')
      list.remove('light')
    }

  }
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-l from-purple-400 to-pink-400 dark:bg-gradient-to-l dark:from-[#0e0e0e] dark:to-[#080808]'>
      <div className="absolute top-5 right-5">
        {darkMode ? 
          <WbSunnyIcon onClick={toggleDarkMode} className='text-3xl cursor-pointer' /> : 
          <DarkModeIcon onClick={toggleDarkMode} className='text-3xl cursor-pointer' />
        }
      </div>
      <div className="flex flex-col rounded-sm shadow-2xl bg-[#eeeeee] w-screen h-screen items-center lg:w-[30%] lg:h-[90%] md:w-[60%] md:h-[90%] dark:bg-[#1f1f1f]">
        {children}
      </div>
    </div>
  )
}

export default LoginSignup