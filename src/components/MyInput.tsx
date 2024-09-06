import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface MyInputProps {
  label?: string
  error?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}
const MyInput: React.FC<MyInputProps> = ({
  label = "",
  error = "",
  placeholder = "",
  type = "text",
  disabled = false,
  onChange,
  value,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="grid w-[100%] items-center gap-1 m-2 relative">
      {label && <Label htmlFor={label} className={`text-xl ${error ? 'text-red-500' : ''}`}>{label}</Label>}
      <Input
        type={visible ? "text" : type}
        disabled={disabled}
        onChange={onChange}
        value={value}
        id={label}
        placeholder={placeholder}
        className={`text-xl border-2 ${error ? 'border-red-500' : 'border-[#525252]'} py-5`}
      />
      {error ? 
        <Label className='text-red-500' >{error}</Label> : 
        <p className='h-[14px]'></p>}

      {type === "password" && 
      <div
        className='absolute right-4 top-10 cursor-pointer'
      >
        {visible ? 
          <Visibility onClick={() => setVisible(false)}/> : 
          <VisibilityOff onClick={() => setVisible(true)}/>
        }
      </div>}
    </div>
  )
}

export default MyInput