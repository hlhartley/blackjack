import './Header.css';
import Form from '../Form/Form';

const Header = (props) => {
  return (
    <div className="App-header">
      <Form
        setPlayerInfo={props.setPlayerInfo}
      />
      <div>Turn: {props.turn}</div>
      <div>Winner: {props.winner}</div>
      <button onClick={() => props.newGame()}>New Game</button>
    </div>
  )
}

export default Header;