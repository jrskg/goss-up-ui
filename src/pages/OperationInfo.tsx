import { useParams } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import Info from "@/layouts/Info";
import MyButton from "@/components/MyButton";
import { useAuthActions } from "@/hooks/userHooks";

const OperationInfo: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const {requestVerificationEmail, loading} = useAuthActions();

  const handleRequestEmail = async() => {
    await requestVerificationEmail()
  }

  const child = () => {
    switch (type) {
      case "signup":
        return <>
          <h1 className="text-3xl font-bold">User Registration Complete</h1>
          <p className="text-xl mt-3">We have sent you an email with a link to verify your account.</p>
          <p className="text-xl mt-2">Please check your email</p>
          <CheckIcon className='text-green-500 mt-3' sx={{ fontSize: 100, alignSelf: 'center' }} />
        </>
      case "login":
        return <>
          <h1 className="text-3xl font-bold">Login Successful</h1>
          <p className="text-xl text-center mt-3">Your email has not been verified. Please verify your email</p>
          <MyButton
            title="Request Verification Email"
            onClick={handleRequestEmail}
            loading={loading}
          />
        </>
      default:
        return <>
          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="text-xl mt-3">Please try again</p>
        </>
    }
  }

  return (
    <Info>
      <div className='bg-white p-8 w-[90%] h-[40%] rounded-lg shadow-2xl lg:w-[40%] lg:h-[40%] mt-12 flex flex-col lg:items-center justify-center dark:bg-secondary space-y-6'>
        {child()}
      </div>
    </Info>
  )
}

export default OperationInfo