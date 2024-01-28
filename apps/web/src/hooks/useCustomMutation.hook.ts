import { APIResponse, ApiService } from "core";
import { useState } from "react";
import { ZodAny, z } from "zod";

interface UseCustomMutationProps {
  endPoint: string;
  schema: ZodAny;
  method: "create" | "update";
}

interface UseCustomMutationPropsReturnType<TData, bodyType> {
  isPending?: boolean;
  onSubmit: (data: bodyType) => Promise<APIResponse<TData>>;
}
const useCustomMutation = <TData>({
  endPoint,
  schema,
  method,
}: UseCustomMutationProps): UseCustomMutationPropsReturnType<
  TData,
  z.infer<typeof schema>
> => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const service = new ApiService<TData>(endPoint)[method || "create"];
    setIsPending(true);
    const response = await service(data);
    setIsPending(false);
    return response;
  };
  return {
    isPending,
    onSubmit,
  };
};

export default useCustomMutation;
