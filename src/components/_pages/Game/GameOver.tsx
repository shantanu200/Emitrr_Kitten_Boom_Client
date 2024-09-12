import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
import { Link } from "react-router-dom";

interface GameOverProps {
  open: boolean;
}

const GameOver: React.FC<GameOverProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-3xl text-destructive">
            Game Over
          </DialogTitle>
          <DialogDescription>Drawn card is bomb card.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-2">
          <Link to={"/dashboard"} className="w-full lg:w-auto">
            <Button variant={"destructive"} className="w-full">Exit</Button>
          </Link>

          <Link to={`/instruction`} className="w-full lg:w-auto">
            <Button className="w-full">Play Again</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOver;
