import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserGameHistory } from "@/query/functions/Game.function";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarDots } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GameHistory: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, _] = useState<number>(10);
  const userGames = useUserGameHistory(page, limit);

  const sortedData = useMemo(() => {
    return userGames?.data?.games?.sort((a, b) =>
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
      {userGames?.data?.games && userGames?.data?.games?.length > 0 ? (
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
                onClick={() =>
                  game.status === "ONGOING" && navigate(`/game/${game.id}`)
                }
              >
                {game.status}
              </Button>
            </div>
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              <PaginationItem>{page}</PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + 1, Number(userGames?.data?.totalPages))
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <div className="bg-card p-4 h-72 my-8 border-2 border-dashed rounded-lg flex items-center justify-center flex-col gap-y-4">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            You have not played game yet
          </h1>
          <Link to={"/instruction"}>
            <Button>Play Game</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default GameHistory;
