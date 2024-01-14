import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFileUpload = () => {
  const onUploadFile = async (files: any) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const headers = { "Content-Type": "multipart/form-data" };
    try {
      const response = await axios({
        headers,
        method: "post",
        data: formData,
        url: `http://localhost:8000/api/uploads`,
      });

      return response?.data?.files || [];
    } catch (error) {
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
