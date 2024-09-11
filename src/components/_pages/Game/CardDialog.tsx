import { Card, CardKeyword } from "@/interfaces/Card.interface";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import CatAnimation from "@/assets/animation/Cat.json";
import BombAnimation from "@/assets/animation/bomb.json";
import ShuffleAnimation from "@/assets/animation/shuffle.json";
import DefuseAnimation from "@/assets/animation/defuse.json";

interface CardDialogProps {
  card: Card | null;
  onClose: () => void;
}

const getAnimation = (card: CardKeyword) => {
  switch (card) {
    case "cat":
      return CatAnimation;
    case "defuse":
      return DefuseAnimation;
    case "shuffle":
      return ShuffleAnimation;
    case "explode":
      return BombAnimation;
  }
};

const CardDialog: React.FC<CardDialogProps> = ({ card, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [card, onClose]);

  if (!card) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center"
    >
      <div className="bg-muted shadow p-6 rounded-lg  flex flex-col items-center justify-center lg:w-1/4 md:w-1/2 w-2/3 gap-y-4">
        <div>
          <h1 className="text-5xl font-extrabold">{card.name}</h1>
        </div>
        <div className="lg:w-1/2 w-10/12 h-full">
          <Lottie animationData={getAnimation(card.keyword)} loop={true} />
        </div>
        <div>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-center font-medium">{card.cardLine}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CardDialog;
