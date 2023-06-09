import './App.css';
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Cards from '../../Components/Cards/Cards';
import { deckOfCards } from '../../Helpers/Data';

function App() {
  const [winner, setWinner] = useState('TBD');
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [turn, setTurn] = useState('Player');
  const [cards, setCards] = useState(deckOfCards);
  const [player, setPlayer] = useState({ name: 'Player' });

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

  const newGame = () => {
    setTurn('Player');
    setWinner('TBD');
    setPlayerPoints(0);
    setDealerPoints(0);
    setPlayerCards([]);
    setDealerCards([]);
    cards.forEach((card) => {
      card.isSelected = false
    });
    dealCards();
  }

  const dealCards = () => {
    const [card1, card2, card3] = getRandomCards(3);
    setPlayerCards(p => [...p, card1, card2]);
    setDealerCards(p => [...p, card3]);
    setPlayerPoints(card1.value + card2.value);
    setDealerPoints(card3.value);
    if (card1.value + card2.value === 21) {
      setWinner('Player');
    }
  }

  const hit = () => {
    const [randomCard] = getRandomCards(1);
    if (turn === 'Player') {
      setPlayerCards(p => [...p, randomCard]);
      setPlayerPoints(playerPoints + randomCard.value);
      if (playerPoints + randomCard.value > 21) {
        setWinner('Dealer');
      }
    } else {
      setDealerCards(p => [...p, randomCard]);
      setDealerPoints(dealerPoints + randomCard.value);
    }
  }

  const stay = () => {
    setTurn('Dealer');

    let points = dealerPoints;
    while (points < 17) {
      const [randomCard] = getRandomCards(1);
      setDealerCards(p => [...p, randomCard]);
      points += randomCard.value;
      if (points > 16) {
        setDealerPoints(points);
        determineWinner(points);
        return;
      }
    }
  }

  const determineWinner = (dealerPoints) => {
    playerPoints > dealerPoints || dealerPoints > 21 ? setWinner('Player') : setWinner('Dealer');
    if (playerPoints === dealerPoints) {
      setWinner('Tie')
    }
  }

  const setPlayerInfo = (playerInfo) => {
    setPlayer(playerInfo);
  }

  return (
    <div className="App">
      <Header
        turn={turn}
        winner={winner}
        newGame={newGame}
        setPlayerInfo={setPlayerInfo}
      />
      <section className="App-body">
        <div>
          <Cards
            cards={dealerCards}
          />
        </div>
        <div>
          <div>{player.name}</div>
          <Cards
            cards={playerCards}
          />
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