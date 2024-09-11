import SignIn from "@/components/_pages/Home/SignIn";
import UserNameField from "@/components/_pages/Home/UserNameField";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import React from "react";

const Home: React.FC = () => {
  return (
    <main className="min-h-screen h-full w-full flex justify-center">
      <section className="space-y-6 flex flex-col justify-center md:w-1/2 w-10/12">
        <header className="text-center space-y-4">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
            {" "}
            Exploding Kittens Challenge
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            Draw Cards. Defuse Bombs. Survive the Deck!
          </p>
        </header>
        <UserNameField />
        <div className="text-center z-20">
          <Dialog>
            <DialogTrigger>
              <Button variant={"link"}>I have a username.</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  Enter your existing username and credentials.
                </DialogDescription>
              </DialogHeader>
              <SignIn />
            </DialogContent>
          </Dialog>
        </div>
      </section>
      <BackgroundBeams />
    </main>
  );
};

export default Home;
