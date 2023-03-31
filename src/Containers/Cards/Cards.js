import './Cards.css';
// import React, { useState } from 'react';

const Cards = (props) => {

  return (
    <div className="Cards">
      <header className="Cards-header">
        <p>
          {props.value}
        </p>
        <button onClick={() => props.handleChange(props.value + 1)}>Increment Value</button>
      </header>
    </div>
  );
}

export default Cards;