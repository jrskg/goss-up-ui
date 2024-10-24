import React from 'react'

interface Props {
  heading?: string
  children: React.ReactNode
}
const FriendsPageLayout:React.FC<Props> = ({
  heading = "",
  children
}) => {
  return (
    <div className='w-full'>
      {heading && <p className='px-2 text-xl text-center md:text-2xl md:text-left font-bold mb-2'>{heading}</p>}
      {children}
    </div>
  )
}

export default FriendsPageLayout