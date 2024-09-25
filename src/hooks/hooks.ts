import { ImageResponse, PushToken, ResponseWithoutData } from "@/interface/interface";
import { setJustUser } from "@/redux/slices/user";
import instance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useConnection = (): { checkConnection: () => boolean } => {
  const checkConnection = (): boolean => {
    if (navigator.onLine) return true;
    toast.error("No internet connection", {
      description: "Please check your internet connection and try again",
    });
    return false;
  }
  return {
    checkConnection
  }
}

export const useInitialSetup = () => {
  const [loading, setLoading] = useState(false);
  const { checkConnection } = useConnection();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const updateProfilePic = async (file: File) => {
    if (!checkConnection()) return;
    try {
      setLoading(true);
      const { data } = await instance.post<ImageResponse>("/user/profile", {profilePic: file}, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (data.success) {
        toast.success(data.message);
        if (user) {
          dispatch(setJustUser({
            ...user,
            profilePic: data.data
          }));
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else { console.log(error); }
    } finally{setLoading(false);}
  }

  const updateBio = async(bio: string) => {
    if (!checkConnection()) return;
    try {
      setLoading(true);
      const { data } = await instance.put<ResponseWithoutData>("/user/bio", {bio});
      if (data.success) {
        toast.success(data.message);
        if (user) {
          dispatch(setJustUser({
            ...user,
            bio
          }));
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else { console.log(error); }
    } finally{setLoading(false);}
  }

  const addPushToken = async (tokenObj: PushToken) => {
    if (!checkConnection()) return;
    try {
      setLoading(true);
      const { data } = await instance.post<ResponseWithoutData>("/user/push-token", tokenObj);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else { console.log(error); }
    } finally{setLoading(false);}
  }

  return {
    updateProfilePic,
    updateBio,
    addPushToken,
    loading
  }
}