import { useMutation } from "@tanstack/react-query";
import { APIResponse, ApiService } from "core";
import { ZodTypeAny, z } from "zod";

interface UseCustomMutationProps<TData> {
  endPoint: string;
  schema: ZodTypeAny;
  method?: "post" | "put";
  onSuccess?: (data: TData) => void;
}

interface UseCustomMutationPropsReturnType<TBody, TData> {
  isPending?: boolean;
  onSubmit: (data: TBody) => void;
  isError?: boolean;
  asyncOnSubmit: (data: TBody) => Promise<APIResponse<TData>>;
  error?: any;
}
const useCustomMutation = <TData>({
  endPoint,
  schema,
  method,
  onSuccess,
}: UseCustomMutationProps<TData>): UseCustomMutationPropsReturnType<
  z.infer<typeof schema>,
  TData
> => {
  const {
    mutate: onSubmit,
    isPending,
    error,
    isError,
    mutateAsync: asyncOnSubmit,
  } = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const service = new ApiService<TData>(endPoint);
      return await service.post(data);
    },
    onSuccess(data: APIResponse<TData>) {
      onSuccess?.(data.data as TData);
    },
  });

  return {
    onSubmit,
    isPending,
    isError,
    asyncOnSubmit,
    error,
    // isPending,
    // onSubmit,
  };
};

export default useCustomMutation;