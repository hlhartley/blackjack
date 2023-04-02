import './Form.css';

const Form = (props) => {
  const setPlayerName = (name) => {
    props.setPlayerInfo({name});
  }

  return (
    <form className="App-form">
      <label for="name">
        Name:
        <input type="text" name="name" onBlur={(event) => setPlayerName(event.target.value)}></input>
      </label>
    </form>
  )
}

export default Form;