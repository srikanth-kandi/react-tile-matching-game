import { Component } from "react";
import GameTile from "../GameTile";
import "./index.css";

const initialGameTiles = [
  {id: 0, value: "🍕", flipStatus: false},
  {id: 1, value: "🍔", flipStatus: false},
  {id: 2, value: "🍟", flipStatus: false},
  {id: 3, value: "🌭", flipStatus: false},
  {id: 4, value: "🍿", flipStatus: false},
  {id: 5, value: "🍪", flipStatus: false},
  {id: 6, value: "🍕", flipStatus: false},
  {id: 7, value: "🍔", flipStatus: false},
  {id: 8, value: "🍟", flipStatus: false},
  {id: 9, value: "🌭", flipStatus: false},
  {id: 10, value: "🍿", flipStatus: false},
  {id: 11, value: "🍪", flipStatus: false}
]

const shuffle = array => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const playerName = localStorage.getItem("name") || "Player";

class Game extends Component {
  state = {
    score: localStorage.getItem("score") || 0,
    minutes: 0,
    seconds: 0,
    topScore: localStorage.getItem("topScore") || 0,
    shuffledTiles: shuffle(initialGameTiles),
    choiceOne: null,
    choiceTwo: null,
    gameEnd: false,
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const {minutes, seconds} = this.state;
      if (seconds < 59) {
        this.setState({seconds: seconds + 1});
      } else {
        this.setState({minutes: minutes + 1, seconds: 0});
      }
    }, 1000);
  }

  componentDidMount() {
    this.startTimer();
  }

  checkGameEnd = () => {
    const {shuffledTiles, topScore} = this.state;
    const isGameEnd = shuffledTiles.every((tile) => tile.flipStatus);
    if (isGameEnd) {
      localStorage.setItem("score", 0);
      localStorage.setItem("topScore", topScore);
      clearInterval(this.timer);
      this.setState({gameEnd: true});
    } else {
      return;
    }
  }

  checkFlippedTiles = () => {
    const {flippedTiles, score, topScore} = this.state;
    if (flippedTiles.length < 2) {
      return;
    } else {
      const [firstTile, secondTile] = flippedTiles;
      if (firstTile.value === secondTile.value) {
        this.setState({
          score: score + 1,
          flippedTiles: [],
          topScore: topScore < score + 1 ? score + 1 : topScore
        });
      } else {
        // set the shuffledTiles's flipStatus to false
        // for the two tiles in flippedTiles
        const {shuffledTiles} = this.state;
        const newTiles = shuffledTiles.map((tile) => {
          if (tile.id === firstTile.id || tile.id === secondTile.id) {
            return {...tile, flipStatus: false};
          }
          return tile;
        });
        this.setState({
          score: score - 1 < 0 ? 0 : score - 1,
          flippedTiles: [],
          shuffledTiles: newTiles
        });
      }
    }
  }

  changeFlipValue = (newFlipValue, id) => {
    console.log('card flipped');
    const {shuffledTiles, flippedTiles} = this.state;
    const newTiles = shuffledTiles.map((tile) => {
      if (tile.id === id) {
        return {...tile, flipStatus: newFlipValue};
      }
      return tile;
    });
    this.setState({
      shuffledTiles: newTiles,
      flippedTiles: [...flippedTiles, {id, value: newTiles[id].value}]
    });
  }

  render() {
    const {
      score,
      minutes,
      seconds,
      topScore,
      shuffledTiles,
      gameEnd
    } = this.state;
    return (
      <div className="game-container">
        <h1 className="game-title">Tile Matching Game</h1>
        <div className="score-container">
          <p className="score">Score: {score}</p>
          <p className="score">Top Score: {topScore}</p>
          <p className="timer">
            Time: {minutes > 9 ? minutes : `0${minutes}` }:{seconds > 9 ? seconds : `0${seconds}`}
          </p>
        </div>
        <div className="game-board-container">
          <p className="player-greeting">Welcome {playerName} 👋 👋</p>
          {gameEnd ? (
            <div className="game-end-container">
              <p className="game-end-message">Congratulations! You won 🎉 🎉</p>
              <button
                type="button"
                className="play-again-button"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </div>
          ) : (
            <ul className="game-board">
              {shuffledTiles.map((tile) => (
                <GameTile
                  key={tile.id}
                  value={tile.value}
                  id={tile.id}
                  flipStatus={tile.flipStatus}
                  changeFlipValue={this.changeFlipValue}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
