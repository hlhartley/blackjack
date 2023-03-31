import './Cards.css';
// import React, { useState } from 'react';

const Cards = (props) => {

  return (
    <div className="Cards">
      <header className="Cards-header">
        <p>
          {props.points}
        </p>
      </header>
    </div>
  );
}

export default Cards;