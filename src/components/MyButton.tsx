import React from 'react'
import Spinner from './Spinner'
import { Button } from './ui/button'

interface BtnProps {
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
  loading?: boolean
  btnClassName?: string
  icon?: React.ReactNode
}
const MyButton: React.FC<BtnProps> = ({
  title,
  onClick,
  disabled,
  className,
  loading,
  btnClassName,
  icon
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Button
        className={`bg-blue-500 w-full hover:bg-blue-600 text-sm md:text-lg transition duration-500 dark:bg-dark-3 text-white dark:hover:bg-dark-4 ${btnClassName}`}
        onClick={onClick}
        disabled={disabled || loading}
      >{loading ? <Spinner/> : icon}{title}</Button>
    </div>
  )
}

export default MyButton