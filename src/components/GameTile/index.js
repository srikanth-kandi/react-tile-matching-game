import "./index.css";

const GameTile = (props) => {
  const { tile, handleChoice, flipped } = props;
  const { value } = tile;
  const onChangeFlip = () => {
    handleChoice(tile);
  };
  return (
    <li className="game-tile">
      <div className={flipped ? "flipped" : ""}>
          <img className="front" src={value} alt="tile front" />
          <img className="back" src="/img/cover.jpg" alt="tile back" onClick={onChangeFlip} />
      </div>
    </li>
  );
};

export default GameTile;
