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

const toggleDarkMode = (setDarkMode: boolean) => {
  const list = document.documentElement.classList;
  if (setDarkMode) {
    list.add('dark')
    list.remove('light')
  }
  else {
    list.remove('dark')
    list.add('light')
  }
}

const getDateStr = (createdAt: string) => {
  const date = new Date(createdAt)
  const currDate = new Date(Date.now())
  const diffDays = Math.floor((currDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays <= 6) {
    return `${diffDays} days ago`
  }
  return Math.floor(diffDays / 7) + " weeks ago";
}

export { 
  toggleDarkMode,
  getDateStr
}