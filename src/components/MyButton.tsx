import React from 'react'
import { Button } from './ui/button'
import Loader from './Loader'

interface BtnProps {
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
  loading?: boolean
  btnClassName?: string
}
const MyButton: React.FC<BtnProps> = ({
  title,
  onClick,
  disabled,
  className,
  loading,
  btnClassName
}) => {
  return (
    <div className={`relative w-full ${className}`}>
    <Button
      className={`bg-blue-500 w-full hover:bg-blue-600 text-xl transition duration-500 dark:blue-300 ${btnClassName}`}
      size={"lg"}
      onClick={onClick}
      disabled={disabled || loading}

    >{loading ? "" : title}</Button>
    {loading && <Loader className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />}
    </div>
  )
}

export default MyButton