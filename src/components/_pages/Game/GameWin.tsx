import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import React from "react";
import GameWinner from "@/assets/animation/Win.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface GameWinProps {
  open: boolean;
}

const GameWin: React.FC<GameWinProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Game Won</DialogTitle>
          <DialogDescription>You have won the game.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <div className="w-2/3 h-full">
            <Lottie animationData={GameWinner} />
          </div>
        </div>
        <DialogFooter className="gap-y-2">
          <Link to={`/dashboard`} className="w-full lg:w-auto">
            <Button variant={"destructive"} className="w-full" size={"lg"}>
              Exit
            </Button>
          </Link>
          <Link to={`/instruction`} className="w-full lg:w-auto">
            <Button size={"lg"} className="w-full">
              Play Again
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameWin;
