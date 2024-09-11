import API_ENDPOINT from "@/api/url"
import useQueryData from "../query.function"

const QUERY_KEYS = {
  LEADERBOARD: "LEADERBOARD"
}

export const useLeaderBoard = () => {
  return useQueryData<string[]>(QUERY_KEYS.LEADERBOARD, API_ENDPOINT.LEADERBOARD);
}