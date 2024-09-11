import { useUserDetails } from "@/query/functions/User.function";
import React, { Suspense } from "react";
import PageLoading from "./PageLoading";
import { Joystick, Ranking, Trophy } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCard = React.lazy(
  () => import("@/components/_pages/Dashboard/StatsCard")
);

const GameHistory = React.lazy(
  () => import("@/components/_pages/Game/GameHistory")
);

const Dashboard: React.FC = () => {
  const user = useUserDetails();

  if (user.isLoading) {
    return <PageLoading />;
  }

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <Suspense fallback={<Skeleton className="col-span-1" />}>
          <StatsCard
            title={String(user.data?.leaderBoardRank)}
            description="Rank in the leaderboard"
            icon={<Ranking className="w-6 h-6" weight="bold" />}
          />
        </Suspense>

        <Suspense fallback={<Skeleton className="col-span-1" />}>
          <StatsCard
            title={String(user.data?.totalGamePlayed)}
            description="Total number of games played"
            icon={<Joystick className="w-6 h-6" weight="bold" />}
          />
        </Suspense>

        <Suspense fallback={<Skeleton className="col-span-1" />}>
          <StatsCard
            title={String(user.data?.totalGameWon)}
            description="Total number of games won"
            icon={<Trophy className="w-6 h-6" weight="bold" />}
          />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="col-span-1" />}>
        <GameHistory />
      </Suspense>
    </main>
  );
};

export default Dashboard;
