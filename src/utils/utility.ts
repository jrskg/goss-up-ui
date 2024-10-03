// import { toast } from "sonner";

// const checkConnection = async (): Promise<boolean> => {
//   try {
//     const response = await fetch("https://www.google.com", {
//       method: "HEAD",
//       mode: "no-cors",
//     });
//     return response.ok;
//   } catch (error) {
//     toast.error("Please check your internet connection");
//     return false;
//   }
// }

// export { checkConnection }

const toggleDarkMode = (setDarkMode:boolean) => {
  const list = document.documentElement.classList;
  if(setDarkMode) {
    list.add('dark')
    list.remove('light')
  }
  else{
    list.remove('dark')
    list.add('light')
  }
}

export {toggleDarkMode}