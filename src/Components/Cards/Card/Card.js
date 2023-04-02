import './Card.css';

const Card = (props) => {
  return (
    <div className="Card">
      <img src={props.card.image} height="125"></img>
    </div>
  )
}

export default Card;