import './App.css';
import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
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
      const randomCard = cards[Math.floor(Math.random() * (Math.floor(51) - 0) + 0)];
      randomCard.isSelected = true;
      randomCards.push(randomCard);
    }
    return randomCards;
  }

  const dealCards = () => {
    const [card1, card2, card3, card4] = getRandomCards(4);
    setPlayerCards(p => [...p, card1, card2]);
    setDealerCards(p => [...p, card3, card4]);
    setPlayerPoints(card1.value + card2.value);
    setDealerPoints(card3.value + card4.value);
  }

  const hit = (value) => {
    turn === 'Player' ? setPlayerPoints(value) : setDealerPoints(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Turn: {turn}</div>
        <div>
          Dealer: {dealerPoints}
          <p></p>
          {dealerCards.map((card) => {
            return card.value
          })}
          <Cards

/>
        </div>
        <div>
          Player : {playerPoints}
          <p></p>
          {playerCards.map((card) => {
            return card.value
          })}
          <Cards

            hit={hit}
          />
        </div>
        <button onClick={() => hit(playerPoints + 1)}>Increment Value</button>
      </header>
    </div>
  );
}

export default App;