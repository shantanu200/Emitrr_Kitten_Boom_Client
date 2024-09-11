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

interface GameRestartProps {
  open: boolean;
}

const GameRestart: React.FC = () => {
  const { resetGame, isGameReset } = useTempStore((state) => state);
  const [openDialog, setOpenDialog] = useState<boolean>(false); // Update the dialog state when the `open` prop changes
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (isGameReset) {
      setOpenDialog(true); // Open dialog if `open` prop is true
      setTimer(5); // Initialize the timer to 5 seconds

      const countDownInterval = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);

      // Close the dialog and reload after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(countDownInterval); // Clear interval when timeout completes
        setOpenDialog(false); // Close dialog
        resetGame();
      }, 5000);

      return () => {
        clearInterval(countDownInterval); // Clean up interval on unmount
        clearTimeout(timeout); // Clean up timeout on unmount
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
