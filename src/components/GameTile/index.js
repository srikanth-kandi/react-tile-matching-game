import "./index.css";

const GameTile = (props) => {
  const { tile, handleChoice, flipped, disabled } = props;
  const { value } = tile;
  const onChangeFlip = () => {
    if (!disabled) {
      handleChoice(tile);
    }
  };
  return (
    <li className="game-tile">
      <div className={flipped ? "flipped" : ""}>
          <img className="front" src={value} alt="tile front" />
          <img className="back" src="./img/cover.jpg" alt="tile back" onClick={onChangeFlip} />
      </div>
    </li>
  );
};

export default GameTile;
