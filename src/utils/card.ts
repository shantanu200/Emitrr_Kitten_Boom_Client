import { Card, CardsArray } from "@/interfaces/Card.interface";

function DrawWeightedCard(): Card {
  const totalWeight = CardsArray.reduce((acc, card) => acc + card.weight, 0);

  let randomWeight = Math.floor(Math.random() * totalWeight);

  for (let i = 0; i < CardsArray.length; i++) {
    const card = CardsArray[i];
    if (randomWeight < card.weight) {
      return card;
    }
    randomWeight -= card.weight;
  }

  return CardsArray[0];
}

function GenerateDeckCards(): Card[] {
  const deck: Card[] = [];

  for(let i = 0; i < 5; i++) {
    deck.push(DrawWeightedCard());
  }

  return deck;
}

export default GenerateDeckCards;
