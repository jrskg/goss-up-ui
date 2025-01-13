import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { cn } from '@/lib/utils';
import { defaultDataPerChat, IFileMetaData, uploadSelectedAttachments } from '@/redux/slices/selectedAttachment';
import FileStorage from '@/utils/fileStorage';
import React, { memo, useCallback, useMemo } from 'react';
import MyButton from '../MyButton';
import ProgressBar from '../ProgressBar';
import FileItem from './FileItem';

const fileStorage = FileStorage.getInstance();

type SegregatedFilesType = Record<"images" | "otherFiles", IFileMetaData[]>
interface SendAttachmentsProps {
  selectedChatId: string;
}

const SendAttachments: React.FC<SendAttachmentsProps> = ({ selectedChatId }) => {
  const filesDataPerChat = useAppSelector(state => state.selectedAttachment)[selectedChatId] || defaultDataPerChat;
  const {
    error,
    selectedFiles,
    uploadProgress,
    loading
  } = filesDataPerChat;
  const dispatch = useAppDispatch();

  const segregatedFiles: SegregatedFilesType = useMemo(() => {
    const images: IFileMetaData[] = [];
    const otherFiles: IFileMetaData[] = [];
    selectedFiles.forEach(file => {
      if (file.type === "image") images.push(file);
      else otherFiles.push(file);
    });
    return {
      images,
      otherFiles
    }
  }, [selectedFiles.length]);


  const handleSendFiles = () => {
    dispatch(uploadSelectedAttachments({chatId: selectedChatId}))
  }

  const removeFile = useCallback(
    (id: string) => {
      fileStorage.removeFile(selectedChatId, id, dispatch);
    },
    [dispatch, selectedChatId]
  );

  if (selectedFiles.length === 0) return null;
  return (
    <div className="z-10 absolute bottom-24 w-[100%] max-h-[400px] flex justify-center">
      <div className='w-[98%] lg:w-[90%] bg-[#eeeeee] dark:bg-dark-3 rounded-lg flex flex-col'>
        <div className="flex flex-col overflow-y-auto">
          {
            Object.entries(segregatedFiles).map(([type, files]) => (
              files.length > 0 && <div
                key={type}
                className={cn(
                  "grid w-full gap-2 auto-rows-min p-3",
                  type === "images" ?
                    "grid-cols-[repeat(auto-fill,minmax(100px,1fr))]" :
                    "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
                )}
              >
                {files.map((file) => <FileItem
                  chatId={selectedChatId}
                  key={file.id}
                  id={file.id}
                  onRemove={removeFile}
                  name={file.name}
                  size={file.size}
                  extension={file.extension}
                  type={file.type}
                />)}
              </div>
            ))
          }
        </div>
        <div className="h-16 p-4 border-t-2 rounded-b-lg border-primary-1 bg-[#eeeeee] dark:bg-dark-3 flex items-center justify-center">
          {error && <p className='text-red-500'>{error}</p>}
          {!loading ? (
            <MyButton
              className='w-[60%]'
              btnClassName='dark:bg-dark-4 dark:hover:bg-dark-5'
              title='Send'
              onClick={handleSendFiles}
            />
          ) : (
            <ProgressBar progress={uploadProgress} />
          )}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default memo(SendAttachments);