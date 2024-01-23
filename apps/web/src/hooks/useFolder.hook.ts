import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "core";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
});
type FormValues = z.infer<typeof formSchema>;
export const useFolder = () => {
  const { folder_id } = useParams();

  const { data = [], refetch: fetchListing } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest("/folders");
      if (success) return response;
      return [];
    },
    enabled: !folder_id,
  });

  const { data: folderDetail, refetch: fetchFolderDetail } = useQuery({
    queryKey: ["folders", folder_id],
    queryFn: async () => {
      const { success, response } = await ApiService.getRequest(
        `/folders/${folder_id}`
      );
      if (success) return response;
      return {};
    },
    enabled: !!folder_id,
  });
  const refetchListing = () => {
    fetchListing();
    fetchFolderDetail();
  };
  const { mutate: onDelete, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => {
      const { success } = await ApiService.postRequest(`/folders/${id}`, {
        method: "delete",
      });
      if (success) refetchListing();
    },
  });
  const { mutate: onEdit, isPending: isEditPending } = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { success } = await ApiService.postRequest(
        `/folders/${id}/rename`,
        {
          method: "post",
          data: { name },
        }
      );
      if (success) refetchListing();
    },
  });

  const { mutate: onCreate, isPending: isCreatePending } = useMutation({
    onMutate: async (data: any) => {
      const { success } = await ApiService.postRequest("/folders", {
        data,
      });
      if (success) refetchListing();
    },
  });
  const folders = useMemo(() => {
    if (folder_id) return folderDetail?.childrens;
    return data;
  }, [folder_id, data, folderDetail]);
  return {
    isEditPending,
    isDeletePending,
    folders,
    folderDetail,

    fetchListing,
    onEdit,
    onDelete,
    onCreate,
    isCreatePending,
    folder_id,
  };
};
