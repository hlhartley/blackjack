import './App.css';
import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Cards/Cards';
import { deckOfCards } from '../../Helpers/Data';

function App() {
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [turn, setTurn] = useState('Player');
  const [cards, setCards] = useState(deckOfCards);

  useEffect(() => {
    if (playerCards.length === 0) {
      dealCards();
    }
  }, [playerCards])

  const getRandomCards = (numCards) => {
    const randomCards = [];
    for (let i=0; i<numCards; i++) {
      const nonSelectedCards = cards.filter((card) => !card.isSelected);
      const randomCard = nonSelectedCards[Math.floor(Math.random() * (Math.floor(nonSelectedCards.length) - 0) + 0)];
      randomCard.isSelected = true;
      randomCards.push(randomCard);
    }
    return randomCards;
  }

  const dealCards = () => {
    const [card1, card2, card3] = getRandomCards(3);
    setPlayerCards(p => [...p, card1, card2]);
    setDealerCards(p => [...p, card3]);
    setPlayerPoints(card1.value + card2.value);
    setDealerPoints(card3.value);
  }

  const hit = () => {
    const [randomCard] = getRandomCards(1);
    if (turn === 'Player') {
      setPlayerCards(p => [...p, randomCard]);
      setPlayerPoints(playerPoints + randomCard.value);
    } else {
      setDealerCards(p => [...p, randomCard]);
      setDealerPoints(dealerPoints + randomCard.value);
    }
  }

  const stay = () => {
    setTurn('Dealer');

    let points = dealerPoints;
    for (let i=0; points < 17; i++) {
      const [randomCard] = getRandomCards(1);
      setDealerCards(p => [...p, randomCard]);
      points += randomCard.value;

      if (points > 16) {
        setDealerPoints(points);
        return;
      }

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Turn: {turn}</div>
      </header>
      <section className="App-body">
        <div>
          <Cards
            cards={dealerCards}
          />
          Dealer: {dealerPoints}
        </div>
        <div>
          <Cards
            cards={playerCards}
          />
          Player : {playerPoints}
        </div>
        <div>
          <button onClick={() => hit()}>Hit</button>
          <button onClick={() => stay()}>Stay</button>
        </div>
      </section>
    </div>
  );
}

export default App;