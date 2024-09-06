import MyInput from '@/components/MyInput';
import { Button } from '@/components/ui/button';
import LoginSignup from '@/layouts/LoginSignup';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const handleLogin = () => {
    if (!email) {
      setEmailError('Email is required')
    } else setEmailError('')
    if (!password) {
      setPasswordError('Password is required')
    } else setPasswordError('')
  }
  return (
    <LoginSignup>
      <h1 className="text-4xl font-bold m-4 text-gray-600 dark:text-[#d1d1d1]">Login</h1>
      <div className="flex flex-col w-[90%] items-center">
        <MyInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Email"
          error={emailError}
        />
        <MyInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          type='password'
          error={passwordError}
        />
        <Button
          className='bg-green-500 hover:bg-green-600 text-xl w-[100%] mt-3'
          size={"lg"}
          onClick={handleLogin}
        >Submit</Button>
        <div className='mt-3 w-full flex flex-col items-center'>
          <Link
            className='text-xl text-blue-500 font-bold mt-3 self-end'
            to={"/forget-password"}
          >Forget Password</Link>
          <h1 className='text-xl font-bold mt-3'>OR</h1>
          <p className='text-xl'>Don't have an account?
            <Link to={"/signup"} className='ml-2 text-xl text-blue-500 font-bold'>Signup</Link>
          </p>
        </div>
      </div>
    </LoginSignup>
  )
}

export default Login