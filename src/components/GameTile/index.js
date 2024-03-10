import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./index.css";

const GameTile = (props) => {
  const { id, value, flipStatus, changeFlipValue } = props;
  const [flip, setFlip] = useState(flipStatus);
  const onChangeFlip = () => {
    setFlip(!flip);
    changeFlipValue(!flip, id);
  };
  if (flipStatus) {
    return <li className="game-tile">{value}</li>;
  } else {
    return (
      <li className="game-tile">
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
          <div className="front" onClick={onChangeFlip}>
            <span role="img" aria-label="game-tile">
              ❓
            </span>
          </div>
          <div className="back" onClick={onChangeFlip}>
            <span role="img" aria-label="game-tile">
              {value}
            </span>
          </div>
        </ReactCardFlip>
      </li>
    );
  }
};

export default GameTile;
