import { FileType, IAttachment } from "@/interface/chatInterface";
import { ResponseWithData } from "@/interface/interface";
import instance from "@/utils/axiosInstance";
import FileStorage from "@/utils/fileStorage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// type SelectedFileType = Record<"images" | "otherFiles", { id: string, file: File }[]>;
export interface IFileMetaData {
  id: string;
  name: string;
  type: FileType;
  size: number;
  extension?: string;
}
interface DataPerChat {
  loading: boolean;
  uploadProgress: number;
  error: string;
  selectedFiles: IFileMetaData[];
  attachmentsAfterUpload: IAttachment[];
}
// adding undefined to the Record type to avoid undefined error as the key(chatId) might not be present
export type ISelectedAttachmentState = Record<string, DataPerChat | undefined>;
const initialState: ISelectedAttachmentState = {};

export const uploadSelectedAttachments = createAsyncThunk(
  "selectedAttachment/uploadSelectedAttachments",
  async ({ chatId }: { chatId: string }, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();
      const files = FileStorage.getInstance().getFiles(chatId);
      files.forEach(file => {
        formData.append("files", file); 
      });
      console.log("Uploading files, files: ", files);
      const { data } = await instance.post<ResponseWithData<{ attachments: IAttachment[] }>>("/message/attachments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          dispatch(setUploadProgress({ chatId, progress }));
        }
      });
      console.log("Uploaded files, data:", data);
      return { chatId, attachments: [] }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.message);
      }
    }
    return rejectWithValue("Something went wrong");
  }
);

export const defaultDataPerChat: DataPerChat = {
  attachmentsAfterUpload: [],
  error: "",
  loading: false,
  selectedFiles: [],
  uploadProgress: 0
};

const selectedAttachmentSlice = createSlice({
  name: "selectedAttachment",
  initialState,
  reducers: {
    addFileInChat: (state, action: PayloadAction<{ chatId: string, files: IFileMetaData[] }>) => {
      const { chatId, files } = action.payload;
      if (!state[chatId]) {
        state[chatId] = {
          ...defaultDataPerChat,
          selectedFiles: files
        }
      }
      else {
        state[chatId].selectedFiles.push(...files);
      }
    },
    setAttchamentsAfterUpload: (state, action: PayloadAction<{ chatId: string, attachments: IAttachment[] }>) => {
      const { chatId, attachments } = action.payload;
      if (state[chatId]) {
        state[chatId].attachmentsAfterUpload = attachments;
      }
    },
    removeFileFromChat: (state, action: PayloadAction<{ chatId: string, fileId: string }>) => {
      const { chatId, fileId } = action.payload;
      if (state[chatId]) {
        state[chatId].selectedFiles = state[chatId].selectedFiles.filter(file => file.id !== fileId);
      }
    },
    setUploadProgress: (state, action: PayloadAction<{ chatId: string, progress: number }>) => {
      const { chatId, progress } = action.payload;
      if (state[chatId]) {
        state[chatId].uploadProgress = progress;
      }
    },
    setUploadError: (state, action: PayloadAction<{ chatId: string, error: string }>) => {
      const { chatId, error } = action.payload;
      if (state[chatId]) {
        state[chatId].error = error;
      }
    },
    resetAttachment: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (state[chatId]) {
        state[chatId] = { ...defaultDataPerChat }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadSelectedAttachments.pending, (state, action) => {
      const { chatId } = action.meta.arg;
      if (state[chatId]) {
        state[chatId].uploadProgress = 0;
        state[chatId].loading = true;
      }
    })
      .addCase(uploadSelectedAttachments.fulfilled, (state, action) => {
        const { attachments, chatId } = action.payload;
        const data = state[chatId];
        if (data) {
          data.attachmentsAfterUpload = attachments;
          data.loading = false;
          data.uploadProgress = 100;
          data.error = "";
        }
      })
      .addCase(uploadSelectedAttachments.rejected, (state, action) => {
        const { chatId } = action.meta.arg;
        const data = state[chatId];
        if (data) {
          data.loading = false;
          data.uploadProgress = 0;
          data.error = action.payload as string;
        }
      })
  }
});

export const {
  addFileInChat,
  removeFileFromChat,
  setUploadProgress,
  setUploadError,
  resetAttachment,
} = selectedAttachmentSlice.actions;
export default selectedAttachmentSlice.reducer;