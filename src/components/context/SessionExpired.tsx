import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface SessionExpiredProps {}

const SessionExpired: React.FC<SessionExpiredProps> = () => {
  return (
    <Dialog open>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Session Expired</DialogTitle>
          <DialogDescription>Please login again</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link to={"/home"} className="w-full">
            <Button className="w-full">Sign In</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpired;
