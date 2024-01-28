import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiService, DictionaryType } from "core";
import { useParams } from "next/navigation";
import { ReactNode, createContext, useContext, useMemo } from "react";

export type ResponseReturnType = Promise<{
  success: boolean;
  response: DictionaryType;
}>;
interface FolderContext {
  folders?: any;
  onDelete: (folderId: string) => void;
  fetchList: () => void;
  isDeletePending?: boolean;
  isFetchPending?: boolean;
}
const FolderContext = createContext<FolderContext>({
  folders: [],
  onDelete: () => {},
  fetchList: () => {},
});

const FolderProvider = ({ children }: { children: ReactNode }) => {
  const { folder_id } = useParams();

  const {
    data = [],
    refetch: refetch,
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
  const fetchList = () => {
    if (!folder_id) return refetch();
    fetchFolderDetail();
  };
  const { mutate: onDelete, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => {
      const { success } = await ApiService.postRequest(`/folders/${id}`, {
        method: "delete",
      });
      if (success) fetchList();
    },
  });

  const folders = useMemo(() => {
    if (folder_id) return folderDetail?.childrens;
    return data;
  }, [folder_id, data, folderDetail]);
  const value = useMemo(
    () => ({
      isDeletePending,
      folders,
      folderDetail,
      fetchList,
      onDelete,
      folder_id,
      isFetchPending,
    }),
    [
      {
        isDeletePending,
        folders,
        folderDetail,
        fetchList,
        onDelete,
        folder_id,
        isFetchPending,
      },
    ]
  );
  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};

export const useFolderContext = () => useContext(FolderContext);
export default FolderProvider;
