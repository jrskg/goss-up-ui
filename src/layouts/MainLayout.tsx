import React from 'react'

interface ContainerProps {
  children: React.ReactNode;
}

const MainLayout:React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='md:ml-[100px] md:mb-0'>
      {children}
    </div>
  )
}

export default MainLayout