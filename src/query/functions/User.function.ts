import API_ENDPOINT from "@/api/url";
import useQueryData from "../query.function";
import { ICheckUserExists, IUserDetails } from "@/interfaces/User.interface";

const QUERY_KEYS = {
  SEARCH_USERNAME: "SEARCH_USERNAME",
  USER_DETAILS: "USER_DETAILS",
};

export const useUserNameExists = (userName: string) => {
  return useQueryData<ICheckUserExists>(
    QUERY_KEYS.SEARCH_USERNAME,
    `${API_ENDPOINT.SEARCH_USERNAME}${userName}`,
    userName,
    !!userName
  );
};

export const useUserDetails = () => {
  return useQueryData<IUserDetails>(
    QUERY_KEYS.USER_DETAILS,
    API_ENDPOINT.USER_DETAILS
  );
};
