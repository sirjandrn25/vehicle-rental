"use client";

import { useFileUpload } from "@hooks/useFileUpload.hook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FileWithPreview } from "@ui/types";
import { ApiService } from "core";
import { useParams } from "next/navigation";
import React, { ReactNode, createContext, useContext, useMemo } from "react";

interface FileContextProps {
  isUploading: boolean;
  uploadingFiles?: any;
  setUploadingFiles: (response: any) => void;
  startToUpload?: (arg: {
    files: FileWithPreview;
    callback?: () => void;
  }) => void;
  uploadedFiles?: any;
  isPending: boolean;
  onDelete?: (fileId: string) => void;
  fetchFiles: () => void;
}
export const FileContext = createContext<FileContextProps>({
  isUploading: false,
  startToUpload: () => {},
  setUploadingFiles: () => {},
  isPending: false,
  fetchFiles: () => {},
});

const FileProvider = ({ children }: { children: ReactNode }) => {
  const { folder_id } = useParams();
  const {
    data: uploadedFiles,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["files", folder_id],
    queryFn: async () => {
      try {
        const service = new ApiService(
          folder_id ? `/folders/${folder_id}/files` : "/files"
        );
        const response = await service.getAll();
        return response.data;
      } catch (error) {
        return [];
      }
    },
  });
  const [uploadingFiles, setUploadingFiles] =
    React.useState<FileWithPreview | null>(null);
  const { isUploading, startToUpload } = useFileUpload({
    endPoint: folder_id ? `/folders/${folder_id}/files` : "/files",
    onSuccess: (response) => {
      setUploadingFiles(null);
      refetch();
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: async (id: string) => {
      const service = new ApiService(`/files`);
      await service.delete(id);
      refetch();
    },
  });

  const value = useMemo(() => {
    return {
      isUploading,
      startToUpload,
      uploadingFiles,
      setUploadingFiles,
      uploadedFiles,
      isPending,
      onDelete,
      fetchFiles: refetch,
    };
  }, [
    isUploading,
    startToUpload,
    uploadingFiles,
    setUploadingFiles,
    uploadedFiles,
    isPending,
    onDelete,
    refetch,
  ]);

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFileContext = () => {
  return useContext(FileContext);
};

export const withFileProviderExport = (Component: any) => {
  return (props: any) => (
    <FileProvider>
      <Component {...props} />;
    </FileProvider>
  );
};
export default FileProvider;
