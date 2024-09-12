import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useTempStore from "@/store/store";
import React, { useEffect, useState } from "react";

const GameRestart: React.FC = () => {
  const { resetGame, isGameReset } = useTempStore((state) => state);
  const [openDialog, setOpenDialog] = useState<boolean>(false); // Update the dialog state when the `open` prop changes
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (isGameReset) {
      setOpenDialog(true); 
      setTimer(5); 

      const countDownInterval = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(countDownInterval); 
        setOpenDialog(false); 
        resetGame();
      }, 5000);

      return () => {
        clearInterval(countDownInterval); 
        clearTimeout(timeout); 
      };
    }
  }, [open,isGameReset]);

  return (
    <Dialog open={openDialog}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Shuffle Card</DialogTitle>
          <DialogDescription>Shuffling Card to reset game.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full">{`Shuffling  Card Deck in ${timer} sec`}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameRestart;
