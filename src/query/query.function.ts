import APIHandler from "@/api/request"
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const RequestHandler = async<T>(url:string) => {
  const {
    data,
    error,
    message
  } = await APIHandler<T>("GET",url);

  if (error) {
    throw new Error(message);
  }

  return data
}

const useQueryData = <TData, TError = unknown>(key:string,url:string,dependency?:any,enabled?:boolean) : UseQueryResult<TData,TError>  => {
  return useQuery({
    queryKey: [key,dependency],
    queryFn: () => RequestHandler<TData>(url),
    enabled
  })
}



export default useQueryData;