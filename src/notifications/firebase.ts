import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCd-l69OyPvzz7L-6RNYq3FDmpzV1jUcU0",
  authDomain: "goss-up.firebaseapp.com",
  projectId: "goss-up",
  storageBucket: "goss-up.appspot.com",
  messagingSenderId: "495507821923",
  appId: "1:495507821923:web:32845d70448550b5beef56"
};

const vapid = "BMkKJ5txCLWQSYJvi7Z3q-gsZey3EDB81a4p4iPhvQ7hVtFtYGbUAJrY3UOdymu6l-NiCNpP1GwruLqLaaLudeA";

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateFCMToken = async (): Promise<string | null> => {
  const permissions: NotificationPermission = await Notification.requestPermission();
  if (permissions === 'granted') {
    const token = await getToken(messaging, { vapidKey: vapid });
    return token;
  }
  return null;
}