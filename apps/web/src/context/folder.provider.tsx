import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService } from "core";
import { useParams } from "next/navigation";
import { ReactNode, createContext, useMemo } from "react";

interface FolderContext {
  folders?: any;
  onDelete: (folderId: string) => void;
  onEdit: ({ name, id }: { name: string; id: string }) => void;
  onCreate: ({ name }: { name: string }) => void;
  isDeletePending?: boolean;
  isEditPending?: boolean;
  isFetchPending?: boolean;
}
const FolderContext = createContext<FolderContext>({
  folders: [],
  onDelete: () => {},
  onEdit: () => {},
  onCreate: () => {},
});

const FolderProvider = ({ children }: { children: ReactNode }) => {
  const { folder_id } = useParams();

  const {
    data = [],
    refetch: fetchListing,
    isPending: isFetchPending,
  } = useQuery({
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
  const value = useMemo(
    () => ({
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
      isFetchPending,
    }),
    [
      {
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
        isFetchPending,
      },
    ]
  );
  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};

export default FolderProvider;
