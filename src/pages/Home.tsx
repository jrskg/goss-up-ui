import MainLayout from "@/layouts/MainLayout";
import { toast } from "sonner";

const Home = () => {
  const handleClick = (text:string) => {
    switch (text) {
      case "success":
        toast.success("Success", {
          description: "This is a description",
          action:{
            label: "Action",
            onClick: () => console.log("Action")
          }
        })
        break;    
      case "error":
        toast.error("Error")
        break;
      case "info":
        toast.info("Info")
        break;
      case "warning":
        toast.warning("Warning")
        break;
    }
  }
  return (
    <MainLayout>
      <h1 onClick={() => handleClick("success")}>Success</h1>
      <h1 onClick={() => handleClick("error")}>Error</h1>
      <h1 onClick={() => handleClick("info")}>Info</h1>
      <h1 onClick={() => handleClick("warning")}>Warning</h1>
    </MainLayout>
  )
}

export default Home