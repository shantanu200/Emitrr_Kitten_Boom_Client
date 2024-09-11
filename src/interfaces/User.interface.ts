export interface ICheckUserExists {
  exists: boolean;
}

export interface IUserDetails {
  username: string;
  password: string;
  totalGamePlayed: number;
  totalGameWon: number;
  totalGameLost: number;
  createdAt: string;
  leaderBoardRank: number;
}