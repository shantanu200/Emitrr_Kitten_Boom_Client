export  interface ILoginResponse {
  accessToken: string;
  userName: string;
}

export interface ICreateGameBoard {
  gameId: string;
}


export interface IStoreGameStatus {
  id?: string;
  moves: string[];
  deck: string[];
  status: "ONGOING" | "WON" | "LOST";
  defuseCount: number;
  isGameOver: boolean;
  createdAt: string;
}