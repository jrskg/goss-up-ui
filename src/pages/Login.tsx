import MyButton from '@/components/MyButton';
import MyInput from '@/components/MyInput';
import { useAppSelector } from '@/hooks/hooks';
import { useAuthActions } from '@/hooks/userHooks';
import { LoginParams } from '@/interface/interface';
import LoginSignup from '@/layouts/LoginSignup';
import { generateFCMToken } from '@/notifications/firebase';
import { validateEmail, validatePassword } from '@/utils/validation';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  auhtLoading?: boolean
}

const Login: React.FC<LoginProps> = ({auhtLoading}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const {isAuthenticated} = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const {loading, setLoading, login} = useAuthActions();

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate])

  const validateInputs = ():boolean => {
    const emailCheck = validateEmail(email);
    setEmailError(emailCheck.error);
    const passwordCheck = validatePassword(password);
    setPasswordError(passwordCheck.error);
    return emailCheck.isValid && passwordCheck.isValid;
  }
  const handleLogin = async() => {
    if(!validateInputs()) return;
    const data:LoginParams = {
      email,
      password
    }
    if(Notification.permission === 'granted') {
      console.log("Granted");
      setLoading(true);
      const fcmToken = await generateFCMToken();
      if(fcmToken) {
        data.pushOptions = {
          token: fcmToken,
          platform: "web"
        }
      }
      setLoading(false);
    }
    await login(data);
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
          disabled={loading || auhtLoading}
        />
        <MyInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          type='password'
          error={passwordError}
          disabled={loading || auhtLoading}
        />
        <MyButton
          onClick={handleLogin}
          title="Login"
          loading={loading || auhtLoading}
        />
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