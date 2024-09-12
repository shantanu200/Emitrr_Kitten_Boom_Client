import { Badge } from "@/components/ui/badge";
import { Card } from "@/interfaces/Card.interface";
import { cn } from "@/lib/utils";
import useTempStore from "@/store/store";
import React from "react";

interface GameCardProps {
  card: Card;
}

const GameCard: React.FC<GameCardProps> = React.memo(
  ({ card }: GameCardProps) => {
    const { defuseCount } = useTempStore((state) => state);

    return (
      <div className={cn("bg-card shadow border-2 p-4 h-72 flex flex-col items-center justify-center gap-y-4 rounded-2xl", card.id === 4 && "bg-destructive border-destructive text-white")}>
        <div className="">
          <h1 className="lg:text-4xl text-3xl font-extrabold">{card.name}</h1>
        </div>
        <div>
          <h1 className="text-6xl">{card.emoji}</h1>
        </div>
        <div>
          {card.id === 2 && <Badge> + 1 Bomb Defuse</Badge>}
          {card.id === 4 && defuseCount >= 0 && (
            <Badge variant={"secondary"}> - 1 Bomb Defuse</Badge>
          )}
          {card.id === 1 && <Badge>Safe</Badge>}
        </div>
      </div>
    );
  }
);

export default GameCard;
