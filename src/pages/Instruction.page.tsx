import API_ENDPOINT from "@/api/url";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ICreateGameBoard } from "@/interfaces/API.interface";
import { useUserDetails } from "@/query/functions/User.function";
import useMutationQuery from "@/query/query.mutation";
import { Spinner } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Instruction: React.FC = () => {
  const [agree, setAgree] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useUserDetails();

  const startGameServerAction = useMutationQuery<ICreateGameBoard, Error, {}>(
    "POST",
    API_ENDPOINT.CREATE_GAME_BOARD,
    {
      onSuccess: (data) => {
        navigate(`/game/${data?.gameId}`);
      },
    }
  );

  return (
    <main className="min-h-screen h-full w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          {" "}
          <CardTitle className="text-3xl font-bold">
            {" "}
            How to Play - Exploding Kittens Challenge{" "}
          </CardTitle>
          <CardDescription>
            Survive the deck! Draw all 5 cards without hitting an Exploding
            Kitten.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h1 className="text-xl font-bold">Game Setup</h1>
            <ul className="list-disc px-4 space-y-2">
              <li>Your deck will contain 5 randomly ordered cards.</li>
              <li>
                The cards can be one of the following:
                <ul className="list-disc py-2 px-4 space-y-2">
                  <li>
                    <b className="text-lg">Cat card 😼: </b>Safe! Just removed
                    from the deck.
                  </li>
                  <li>
                    <b className="text-lg">Defuse card 🙅‍♂️</b>: Use this to
                    defuse a bomb (Exploding Kitten).
                  </li>
                  <li>
                    <b className="text-lg">Shuffle card 🔀</b>: Resets the game
                    with a new deck of 5 cards.
                  </li>
                  <li className="text-lg">
                    <b>Exploding Kitten 💣</b>: If you draw this without a
                    Defuse card, you lose.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-bold">How to Play:</h1>
            <ul className="list-disc px-4 space-y-2">
              <li>Start the Game by clicking the button.</li>
              <li>Draw a Card by clicking on the deck.</li>
              <li>
                Keep drawing cards until all 5 are revealed or you hit an
                Exploding Kitten!
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-bold">Rules:</h1>
            <ul className="list-disc px-4 space-y-2">
              <li>
                <b>Cat card</b>: Safe, card removed from deck.
              </li>
              <li>
                <b>Exploding Kitten</b>: You lose unless you have a Defuse card.
              </li>
              <li>
                <b>Defuse card</b>: Save yourself from one Exploding Kitten.
              </li>
              <li>
                <b>Shuffle card</b>: Resets the game with a new shuffled deck.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">Winning:</h1>
            <ul className="list-disc px-4 space-y-2">
              <li className="text-primary">
                Draw all 5 cards safely, or defuse any bombs you encounter to
                win!
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="flex items-center justify-start gap-x-4 py-2 px-4 rounded-lg border-2">
            {user?.isLoading ? (
              <Spinner className="animate-spin h-4 w-4" />
            ) : (
              <>
                <Avatar>
                  <AvatarFallback>
                    {user?.data?.username[0].toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{user?.data?.username}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <Checkbox
              checked={agree}
              onCheckedChange={() => setAgree((prev) => !prev)}
            />
            <Label> I have read the instructions.</Label>
          </div>

          <Button
            onClick={async () => {
              await startGameServerAction.mutateAsync({});
            }}
            disabled={!agree || startGameServerAction.isPending}
            size={"lg"}
            className="w-full"
          >
            {startGameServerAction.isPending ? (
              <Spinner className="animate-spin h-4 w-4" />
            ) : (
              "Start Game"
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Instruction;
