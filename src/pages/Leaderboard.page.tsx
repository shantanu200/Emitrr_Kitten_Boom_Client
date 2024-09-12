import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useLeaderBoard } from "@/query/functions/Leaderboard.function";
import { useUserDetails } from "@/query/functions/User.function";
import { Medal, Trophy, User } from "@phosphor-icons/react";
import React from "react";

const Leaderboard: React.FC = () => {
  const leaderboard = useLeaderBoard();

  const userDetails = useUserDetails();

  if (leaderboard.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <main className="py-4">
      <div className="flex items-center gap-x-4">
        <Medal className="h-12 w-12" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Players Ranking
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-y-4 my-8">
        {leaderboard?.data?.map((user, idx) => (
          <div
            key={idx}
            className={cn(
              "border py-6 px-16 shadow flex flex-wrap items-center lg:justify-between justify-center gap-x-8 bg-card rounded-lg gap-y-2",
              userDetails?.data?.username === user &&
                "bg-primary border-primary text-card"
            )}
          >
            <div className="flex flex-wrap items-center gap-x-4">
              {idx === 0 && <Trophy className="h-12 w-12 text-[#FFD700]" weight="bold" />}
              <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                # {idx + 1}
              </h1>
            </div>
            <div className="flex items-center gap-x-4">
              <User className="lg:h-6 lg:w-6 h-5 w-5" weight="bold" />
              <h2 className="lg:text-3xl text-2xl font-semibold tracking-tight">{user}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Leaderboard;
