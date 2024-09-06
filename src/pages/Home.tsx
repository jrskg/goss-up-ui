import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        className="bg-green-500 hover:bg-green-600 m-1"
        size={"lg"}
        onClick={() => navigate("/login")}
      >Login</Button>
      <Button
        className="bg-green-500 hover:bg-green-600 m-1"
        size={"lg"}
        onClick={() => navigate("/signup")}
      >Sign Up</Button>
    </div>
  )
}

export default Home