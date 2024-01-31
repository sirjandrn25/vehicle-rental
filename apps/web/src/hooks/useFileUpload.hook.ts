import axios from "axios";
import { DictionaryType, getAuthorizationHeader, serverBaseUrl } from "core";
import { useState } from "react";

type UseFileUploadOptionProps = {
  endPoint?: string;
  onSuccess?: (response?: DictionaryType) => void;
  onError?: (error?: any) => void;
};
export const useFileUpload = (options?: UseFileUploadOptionProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const onUploadFile = async ({
    files,
    callback,
  }: {
    files: any;
    callback?: () => void;
  }) => {
    setIsUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    const headers = {
      "Content-Type": "multipart/form-data",
      ...getAuthorizationHeader(),
    };
    try {
      const response = await axios({
        headers,
        method: "post",
        data: formData,
        url: `${serverBaseUrl}/api/${options?.endPoint || "files"}`,
      });
      options?.onSuccess?.(response);
      callback?.();
      setIsUploading(false);
      return response?.data?.files || [];
    } catch (error) {
      options?.onError?.(error);
      setIsUploading(true);
      return [];
    }
  };

  return {
    startToUpload: onUploadFile,
    isUploading,
  };
};
