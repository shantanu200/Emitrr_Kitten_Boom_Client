export type CardKeyword = "cat" | "defuse" | "shuffle" | "explode";

export type Card = {
  id: number;
  name: string;
  emoji: string;
  keyword: CardKeyword;
  cardLine: string;
  weight: number;
};

export const CardsArray: Card[] = [
  {
    id: 1,
    name: "Cat",
    emoji: "🐱",
    keyword: "cat",
    cardLine: "Cats are cute and you are safe!",
    weight: 5,
  },
  {
    id: 2,
    name: "Defuse",
    emoji: "🙅‍♂️",
    keyword: "defuse",
    cardLine: "Creating bomb defuse army!",
    weight: 3,
  },
  {
    id: 3,
    name: "Shuffle",
    emoji: "🔀",
    keyword: "shuffle",
    cardLine: "Shuffling cards!",
    weight: 1,
  },
  {
    id: 4,
    name: "Explode",
    emoji: "💣",
    keyword: "explode",
    cardLine: "Bomb has exploded! Game Over!",
    weight: 2,
  },
];
