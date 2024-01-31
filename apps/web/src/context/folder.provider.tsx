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
    refetch: fetchList,
    isPending: isFetchPending,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const service = new ApiService(`/folders?parent_id=${folder_id}`);
      const response = await service.getAll();
      return response?.data;
    },
    enabled: !folder_id,
  });

  const { mutate: onDelete, isPending: isDeletePending } = useMutation({
    mutationFn: async (id: string) => {
      const service = new ApiService(`/folders`);
      await service.delete(id);
      fetchList();
    },
  });

  const value = useMemo(
    () => ({
      isDeletePending,
      folders: data,
      fetchList,
      onDelete,
      folder_id,
      isFetchPending,
    }),
    [
      {
        isDeletePending,
        data,
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
