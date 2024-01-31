import { useQuery } from "@tanstack/react-query";
import { APIResponse, ApiService } from "core";

interface GetQueryListProps {
  endPoint: string;
}

interface GetQueryListReturnProps<TData>
  extends Omit<CustomQueryListReturnProps<TData>, "data"> {
  data: TData[];
}

const useGetQueryList = <TData>({
  endPoint,
}: GetQueryListProps): GetQueryListReturnProps<TData> => {
  const { data, isLoading } = useCustomQueryList({
    queryFunction: async () => {
      const service = new ApiService(endPoint);
      return await service.getAll();
    },
    extraQueryKey: `get all ${endPoint}`,
  });
  return { data: data as TData[], isLoading };
};

interface CustomQueryListProps<TData> {
  queryFunction: () => Promise<APIResponse<TData>>;
  extraQueryKey: string;
}
interface CustomQueryListReturnProps<TData> {
  isLoading?: boolean;
  data: TData;
}
const useCustomQueryList = <TData>({
  queryFunction,
  extraQueryKey,
}: CustomQueryListProps<TData>): CustomQueryListReturnProps<TData> => {
  const { data, isLoading } = useQuery({
    queryKey: [extraQueryKey],
    queryFn: queryFunction,
  });
  return { data: data?.data as TData, isLoading };
};

export default useGetQueryList;
