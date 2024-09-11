import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserGameHistory } from "@/query/functions/Game.function";
import React, { useMemo } from "react";
import {format} from "date-fns";
import { CalendarDots } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const GameHistory: React.FC = () => {
  const navigate = useNavigate();
  const userGames = useUserGameHistory();


  const sortedData = useMemo(() => {
    return userGames?.data?.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
  }, [userGames?.data]);

  if (userGames.isLoading) {
    return (
      <div className="space-y-4 my-8">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  return (
    <section className="my-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Game History
      </h1>
      <div className="grid grid-cols-1 gap-y-4 py-8">
        {sortedData?.map((game) => (
          <div
            key={game.id}
            className="bg-card border rounded-lg py-6 px-8  flex flex-wrap gap-4 justify-between items-center shadow"
          >
            <div className="flex items-center gap-x-2">
              <CalendarDots className="h-5 w-5" weight="bold" />
              <h2>{format(game?.createdAt, "dd MMM yyyy hh:mm a")}</h2>
            </div>
            <Button
              className="w-full lg:w-auto"
              variant={
                game.status === "WON"
                  ? "default"
                  : game.status === "LOST"
                  ? "destructive"
                  : "secondary"
              }
              onClick={() => navigate(`/game/${game.id}`)}
            >
              {game.status}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameHistory;
