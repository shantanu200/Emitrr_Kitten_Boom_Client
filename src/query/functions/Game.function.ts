import { IPaginationData, IStoreGameStatus } from "@/interfaces/API.interface";
import useQueryData from "../query.function";
import API_ENDPOINT from "@/api/url";

const QUERY_KEYS = {
  GAME_DETAILS: "GAME_DETAILS",
  USER_GAME_HISTORY: "USER_GAME_HISTORY",
};
export function useGameDetails(id: string) {
  return useQueryData<IStoreGameStatus>(
    QUERY_KEYS.GAME_DETAILS,
    `${API_ENDPOINT.GAME_BOARD_DETAILS}/${id}`
  );
}

export function useUserGameHistory(page: number, limit: number) {
  return useQueryData<IPaginationData>(
    QUERY_KEYS.USER_GAME_HISTORY,
    `${API_ENDPOINT.USER_GAMES}?page=${page}&limit=${limit}`,
    { page, limit }
  );
}
