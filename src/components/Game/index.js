import "./index.css";

const Game = () => {
  if (localStorage.getItem("name") === null) {
    window.location.href = "/";
  } else {
    return (
      <div className="game-container">
        <h1 className="game-title">Tile Matching Game</h1>
        <div className="game-board">
          <div className="game-tile">1</div>
          <div className="game-tile">2</div>
          <div className="game-tile">3</div>
          <div className="game-tile">4</div>
          <div className="game-tile">5</div>
          <div className="game-tile">6</div>
          <div className="game-tile">7</div>
          <div className="game-tile">8</div>
          <div className="game-tile">9</div>
          <div className="game-tile">10</div>
          <div className="game-tile">11</div>
          <div className="game-tile">12</div>
          <div className="game-tile">13</div>
          <div className="game-tile">14</div>
          <div className="game-tile">15</div>
          <div className="game-tile">16</div>
        </div>
      </div>
    );
  }
};

export default Game;
