export interface Image {
  image: string;
  publicId: string;
  avatar: string;
}

export interface IUser {
  name: string;
  email: string;
  bio: string;
  profilePic?: Image
  status: "online" | "offline";
  settings: {
    notificationEnabled: boolean;
    theme: "light" | "dark";
    soundEnabled: boolean;
  }
  lastSeen: Date;
}

export interface ResponseWithoutData {
  message: string;
  success: boolean;
}

export interface RegisterResponse extends ResponseWithoutData {
  data: {
    beginVerification: boolean;
  }
}

export interface LoginResponse extends ResponseWithoutData {
  data: {
    beginVerification: boolean;
  } | IUser
}

// export interface LoadUserResponse extends ResponseWithoutData {
//   data: IUser
// }

export type PushPlatform = "web" | "android" | "ios";
export interface PushToken {
  token: string;
  platform: PushPlatform;
}

export interface ImageResponse extends ResponseWithoutData {
  data: Image
}

export interface LoginParams { email: string, password: string, pushOptions?: PushToken }