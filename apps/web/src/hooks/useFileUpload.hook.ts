import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DictionaryType, getAuthorizationHeader, serverBaseUrl } from "core";

type UseFileUploadOptionProps = {
  endPoint?: string;
  onSuccess?: (response?: DictionaryType) => void;
  onError?: (error?: any) => void;
};
export const useFileUpload = (options?: UseFileUploadOptionProps) => {
  const onUploadFile = async (files: any) => {
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
      return response?.data?.files || [];
    } catch (error) {
      options?.onError?.(error);
      return [];
    }
  };
  const { mutate: startToUpload, isPending: isUploading } = useMutation({
    mutationFn: onUploadFile,
  });

  return {
    startToUpload,
    isUploading,
  };
};
