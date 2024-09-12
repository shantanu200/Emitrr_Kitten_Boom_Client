import API_ENDPOINT from "@/api/url";
import CardDialog from "@/components/_pages/Game/CardDialog";
import GameCard from "@/components/_pages/Game/GameCard";
import GameOver from "@/components/_pages/Game/GameOver";
import GameRestart from "@/components/_pages/Game/GameRestart";
import GameWin from "@/components/_pages/Game/GameWin";
import { Badge } from "@/components/ui/badge";
import { CardStack } from "@/components/ui/card-stack";
import { IStoreGameStatus } from "@/interfaces/API.interface";
import { GameAction } from "@/interfaces/Game.interface";
import { useGameDetails } from "@/query/functions/Game.function";
import useMutationQuery from "@/query/query.mutation";
import useTempStore from "@/store/store";
import { Bomb, Cards } from "@phosphor-icons/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../PageLoading";
import ErrorPage from "@/components/ui/errorPage";

const GAME_STATUS = {
  LOST: "LOST",
  WON: "WON",
  ONGOING: "ONGOING",
};

const Game: React.FC = () => {
  const {
    deck,
    generateDeck,
    drawCard,
    drawnCards,
    isGameOVer,
    isGameWon,
    isGameReset,
    defuseCount,
    currCard,
    setCurrCard,
    updateCardDeck,
    updateCardDrawn,
  } = useTempStore((state) => state);
  const [_, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<GameAction | null>(null);
  const { id } = useParams();
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);

  const gameBoard = useGameDetails(String(id));

  const { mutateAsync: updateGameStatus } = useMutationQuery<
    string,
    Error,
    Partial<IStoreGameStatus>
  >("PATCH", `${API_ENDPOINT.STORE_GAME_RECORD}/${id}`);

  const storeGameStatus = useCallback(async () => {
    const gameStatus: Partial<IStoreGameStatus> = {
      deck: deck.map((d) => d.keyword),
      moves: drawnCards.map((d) => d.keyword),
      defuseCount,
      status: isGameOVer ? GAME_STATUS.LOST : isGameWon ? GAME_STATUS.WON : GAME_STATUS.ONGOING,
      isGameOver: isGameOVer || isGameWon,
    };

    await updateGameStatus(gameStatus);
  }, [defuseCount, deck, drawnCards, isGameOVer, isGameWon, updateGameStatus]);

  useEffect(() => {
    if (updateStatus) {
      storeGameStatus();
      setUpdateStatus(false);
    }
  }, [updateStatus,storeGameStatus]);

  const handleCardDrwan = useCallback(() => {
    drawCard();
    setUpdateStatus(true);
  }, [drawCard, storeGameStatus]);

  useEffect(() => {
    if (
      !gameBoard?.data?.isGameOver &&
      gameBoard?.data?.deck &&
      gameBoard?.data?.deck?.length > 0
    ) {
      updateCardDeck(gameBoard?.data?.deck);

      if (gameBoard?.data?.moves) {
        updateCardDrawn(gameBoard?.data?.moves);
      }
    } else {
      generateDeck();
    }
  }, [gameBoard?.data?.isGameOver, updateCardDeck, updateCardDrawn, generateDeck]);

  useEffect(() => {
    if (isGameWon || isGameOVer || isGameReset) {
      const timer = setTimeout(() => {
        let status = isGameOVer ? "Over" : isGameWon ? "Win" : "Shuffle";
        setAction(status as GameAction);
        setOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isGameOVer, isGameWon, isGameReset]);

  const _drawnCard = useMemo(() => {
    return drawnCards.reverse();
  }, [drawnCards, handleCardDrwan]);

  if (gameBoard?.isLoading) {
    return <PageLoading />;
  }

  if (gameBoard?.data?.status === GAME_STATUS.WON) {
    return <GameWin open />;
  }

  if (gameBoard?.data?.status === GAME_STATUS.LOST) {
    return <GameOver open />;
  }

  if(gameBoard.isError){
    return <div className="p-8">
      <ErrorPage text="Game Details not found." />
    </div>
  }

  return (
    <main className="flex flex-col items-center min-h-screen h-full w-full">
      <header className="px-6 py-8 flex flex-wrap gap-4 items-center justify-between border-b-2 border-primary w-full">
        <div className="flex items-center gap-x-4">
          <Bomb className="h-12 w-12 text-red-600" weight="fill" />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Kitten Boom
          </h1>
        </div>
        <div>
          <Badge
            className="lg:text-lg text-sm"
            variant={!!defuseCount ? "default" : "destructive"}
          >
            🙅‍♂️ Defuse Available: {defuseCount}
          </Badge>
        </div>
      </header>
      <div className="flex lg:flex-row flex-col items-center justify-end p-6 gap-y-8 w-full gap-x-12">
        <div className="flex flex-1 lg:h-[80vh] h-full w-full border-4 border-dashed rounded-xl p-4 items-center justify-center bg-muted/30">
          {drawnCards && drawnCards.length > 0 ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-4">
              {_drawnCard?.map((card, idx) => (
                <GameCard key={idx} card={card} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 items-center justify-center">
              <Cards
                weight="bold"
                className="text-muted-foreground h-16 w-16"
              />
              <h1 className="lg:text-2xl text-xl text-center font-bold text-muted-foreground">
                Please Draw 5 Card from deck to win game!
              </h1>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 place-items-center gap-y-4">
          <CardStack onClick={handleCardDrwan} items={deck} />
          <p>Card Deck</p>
        </div>
        <CardDialog card={currCard} onClose={() => setCurrCard(null)} />
        <GameOver open={action === "Over"} />
        <GameRestart />
        <GameWin open={action === "Win"} />
      </div>
    </main>
  );
};

export default Game;
