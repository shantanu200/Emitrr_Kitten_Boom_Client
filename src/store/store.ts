import { Card, CardsArray } from "@/interfaces/Card.interface";
import GenerateDeckCards from "@/utils/card";
import { create } from "zustand";

type State = {
  deck: Card[];
  drawnCards: Card[];
  playerPoints: number;
  isGameOVer: boolean;
  isGameReset: boolean;
  defuseCount: number;
  isGameWon: boolean;
  currCard: Card | null;
  generateDeck: () => void;
  drawCard: () => void;
  resetGame: () => void;
  setCurrCard: (card: Card | null) => void;
  updateCardDeck: (card: string[]) => void;
  updateCardDrawn: (card: string[]) => void;
};

const useTempStore = create<State>()((set, get) => ({
  deck: [],
  currCard: null,
  drawnCards: [],
  playerPoints: 0,
  isGameOVer: false,
  defuseCount: 0,
  isGameWon: false,
  isGameReset: false,
  updateCardDeck: (card: string[]) => {
    const deck = card.map((c) => {
      const idx = CardsArray.findIndex((d) => d.keyword === c);
      return CardsArray[idx];
    });
    set({ deck });
  },
  updateCardDrawn: (card: string[]) => {
    const drawnCards = card.map((c) => {
      const idx = CardsArray.findIndex((d) => d.keyword === c);
      return CardsArray[idx];
    });

    set({ drawnCards });
  },
  generateDeck: () => {
    const deck: Card[] = GenerateDeckCards();
    set({
      deck,
      isGameOVer: false,
      isGameWon: false,
      isGameReset: false,
      drawnCards: [],
      defuseCount: 0,
      currCard: null,
    });
  },
  drawCard: () => {
    const { deck, drawnCards, isGameOVer, defuseCount, isGameWon } = get();

    if (isGameOVer || deck.length === 0 || isGameWon) return;

    const drawnCard = deck[0];
    const remainingDeck = deck.slice(1);

    if (drawnCard.keyword === "explode") {
      if (defuseCount > 0) {
        set({ defuseCount: defuseCount - 1 });
      } else {
        set({ isGameOVer: true });
      }
    } else if (drawnCard.keyword === "defuse") {
      set({ defuseCount: defuseCount + 1 });
    } else if (drawnCard.keyword === "shuffle") {
      set({ isGameReset: true });
    }

    set({
      drawnCards: [...drawnCards, drawnCard],
      deck: remainingDeck,
      currCard: drawnCard,
    });

    if (
      remainingDeck.length === 0 &&
      !get().isGameOVer &&
      drawnCard.keyword !== "shuffle"
    ) {
      set({ isGameWon: true });
    }
  },
  resetGame: () => {
    get().generateDeck();
  },
  setCurrCard: (card: Card | null) => set({ currCard: card }),
}));

export default useTempStore;
