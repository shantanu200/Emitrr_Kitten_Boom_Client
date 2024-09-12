import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@phosphor-icons/react";
import { Badge } from "./badge";
import { Card } from "@/interfaces/Card.interface";

export const CardStack: React.FC<{
  items: Card[];
  onClick?: () => void;
  offset?: number;
  scaleFactor?: number;
}> = memo(({ items, onClick, offset = 10, scaleFactor = 0.06 }) => {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    setCards(items);
  }, [items]);

  return (
    <div className="relative  h-60 w-60 md:h-72 md:w-48" onClick={onClick}>
      {cards.map((_, index) => {
        return (
          <motion.div
            key={index}
            className="absolute cursor-pointer  dark:bg-card group bg-white h-60 w-60 md:h-full md:w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between "
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="text-end">
              <Badge>Card {5 - cards.length + 1}</Badge>
            </div>
            <div className="flex items-center justify-center">
              <Question
                className="w-3/4 h-32 text-secodary group-hover:text-primary duration-300"
                weight="fill"
              />
            </div>
            <div>
              <p className="text-card-foreground text-2xl font-extrabold text-center dark:text-white">
                Kitten Luck
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});
