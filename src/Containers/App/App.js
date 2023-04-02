import './App.css';
import React, { useState, useEffect } from 'react';
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
  const [deckId, setDeckId] = useState();

  useEffect(() => {
    if (playerCards.length === 0) {
      const fetchNewDeck = async() => {
        const response1 = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const result1 = await response1.json();
        setDeckId(result1.deck_id);
        const response2 = await fetch(`https://deckofcardsapi.com/api/deck/${result1.deck_id}/draw/?count=3`);
        const result2 = await response2.json();
        dealCards(result2.cards);
      }
      fetchNewDeck();
    }
  }, [playerCards, dealerCards])

  const getRandomCards = async (deckId, numCards) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`)
    if (response.status === 200) {
      const result = await response.json();
      return result;
    }
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

  const dealCards = async (cards) => {
    const [card1, card2, card3] = cards;
    setPlayerCards(p => [...p, card1, card2]);
    setDealerCards(p => [...p, card3]);
    setPlayerPoints(parseInt(card1.value) + parseInt(card2.value));
    setDealerPoints(parseInt(card3.value));
    if (parseInt(card1.value) + parseInt(card2.value) === 21) {
      setWinner('Player');
    }
  }

  const hit = async () => {
    const result = await getRandomCards(deckId, 1);
    const cards = await result.cards;
    const [card1] = cards;
    if (turn === 'Player') {
      setPlayerCards(p => [...p, card1]);
      setPlayerPoints(playerPoints + parseInt(card1.value));
      if (playerPoints + parseInt(card1.value) > 21) {
        setWinner('Dealer');
      }
    } else {
      setDealerCards(p => [...p, card1]);
      setDealerPoints(dealerPoints + parseInt(card1.value));
    }
  }

  const stay = async () => {
    setTurn('Dealer');

    let points = dealerPoints;
    while (points < 17) {
      const result = await getRandomCards(deckId, 1);
      const [randomCard] = result.cards;
      setDealerCards(p => [...p, randomCard]);
      points += parseInt(randomCard.value);
      console.log(points)
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

  return (
    <div className="App">
      <header className="App-header">
        <div>Turn: {turn}</div>
        <div>Winner: {winner}</div>
        <button onClick={() => newGame()}>New Game</button>
      </header>
      <section className="App-body">
        <div>
          Dealer: {dealerPoints}
          <Cards
            cards={dealerCards}
          />
        </div>
        <div>
          Player : {playerPoints}
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