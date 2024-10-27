export interface Image {
  image: string;
  publicId: string;
  avatar: string;
}
export type Theme = "light" | "dark";
export type UserStatus = "online" | "offline";

export interface IUser {
  name: string;
  email: string;
  bio: string;
  profilePic?: Image
  status: UserStatus;
  settings: {
    notificationEnabled: boolean;
    theme: Theme;
    soundEnabled: boolean;
  }
  lastSeen: Date;
}

export interface SearchedUser {
  name: string;
  profilePic?: Image;
  _id: string;
}

export interface SearchedUserResponseData {
  users: SearchedUser[];
  total: number;
  hasMore: boolean;
}

export interface ResponseWithoutData {
  message: string;
  success: boolean;
}

export interface ResponseWithData<T> {
  message: string;
  success: boolean;
  data: T;
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

export interface LoadUserResponse extends ResponseWithoutData {
  data: IUser
}

export type PushPlatform = "web" | "android" | "ios";
export interface PushToken {
  token: string;
  platform: PushPlatform;
}

export interface ImageResponse extends ResponseWithoutData {
  data: Image
}

export interface LoginParams { email: string, password: string, pushOptions?: PushToken }

export type FriendshipStatus = "accepted" | "pending" | "rejected";
export interface UserDetails{
  _id: string;
  name:string;
  bio: string;
  profilePic?:Image;
  status: UserStatus;
  lastSeen: Date;
  friendship: null | {
    friendshipStatus: FriendshipStatus;
    isYouSender: boolean;
    friendshipId: string;
  }
}
export interface IUserShort {
  _id: string;
  name: string;
  profilePic?: Image;
}

//interfaces for friend requests page list 
export interface FriendRequest{
  _id: string;
  status: FriendshipStatus;
  sender: IUserShort;
  createdAt: string;
}
export interface FriendRequestResponseData {
  hasMore: boolean;
  totalRequests: number;
  friendRequests: FriendRequest[];
}

//interfaces for friend requests sent page list
export type FriendshipStatusExtended = "accepted" | "pending" | "rejected" | "canceled";
export interface FriendRequestSent{
  _id: string;
  status: FriendshipStatusExtended;
  receiver: IUserShort;
  createdAt: string;
}
// export interface FriendRequestSentResponseData {
//   hasMore: boolean;
//   totalRequestsSent: number;
//   friendRequestsSent: FriendRequestSent[];
// }

// interface for friends
export interface Friend{
  _id: string;
  status: FriendshipStatus;
  friend: IUserShort;
  updatedAt: string;
}
export interface FriendsResponseData {
  hasMore: boolean;
  totalFriends: number;
  friends: Friend[];
}