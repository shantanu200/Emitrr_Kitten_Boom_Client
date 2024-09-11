import APIHandler from "@/api/request";
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

type APIReq = "POST" | "PUT" | "DELETE" | "PATCH";

const RequestHandler = async <T>(type: APIReq, url: string, payload: any) => {
  const { data, error, message,err } = await APIHandler<T>(type, url, payload);

  if (error) {
    console.log(message);
    throw new Error(err?.toLocaleUpperCase());
  }

  return data;
};

const useMutationQuery = <TData, TError = unknown, TPayload = void>(
  method: APIReq,
  url: string,
  options?: UseMutationOptions<TData | null, TError, TPayload>
): UseMutationResult<TData | null,TError,TPayload> => {
  return useMutation({
    mutationFn: (variables: TPayload) =>
      RequestHandler<TData>(method, url, variables),
    ...options,
  });
};

export default useMutationQuery