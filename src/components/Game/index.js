import { useState, useEffect, useRef, useCallback } from "react";
import GameTile from "../GameTile";
import "./index.css";

const initialGameTiles = [
  { value: "./img/pizza.png", flipStatus: false },
  { value: "./img/burger.png", flipStatus: false },
  { value: "./img/fries.png", flipStatus: false },
  { value: "./img/hotdog.png", flipStatus: false },
  { value: "./img/popcorn.png", flipStatus: false },
  { value: "./img/cookie.png", flipStatus: false }
];

const shuffle = (array) => {
  let arrayCopy = [...array].map((tile) => ({ ...tile, id: Math.random() }));
  let currentIndex = arrayCopy.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }
  return arrayCopy;
};

const playerName = localStorage.getItem("name") || "Player";

const Game = () => {
  let timer = useRef(null);
  const [score, setScore] = useState(localStorage.getItem("score") || 0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [topScore, setTopScore] = useState(
    localStorage.getItem("topScore") || 0
  );
  const [shuffledTiles, setShuffledTiles] = useState(shuffle([...initialGameTiles, ...initialGameTiles]));
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [gameEnd, setGameEnd] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const startTimer = useCallback(() => {
    timer.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
      });
    }, 1000);
  }, [setMinutes, setSeconds]);

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timer.current);
    };
  }, [startTimer]);

  const checkGameEnd = useCallback(() => {
    const isGameEnd = shuffledTiles.every((tile) => tile.flipStatus);
    if (isGameEnd) {
      localStorage.setItem("score", 0);
      localStorage.setItem("topScore", topScore);
      clearInterval(timer.current);
      setGameEnd(true);
    } else {
      return;
    }
  }, [shuffledTiles, topScore]);

  // useEffect for checking game end
  useEffect(() => {
    checkGameEnd();
  }, [shuffledTiles, topScore, checkGameEnd]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.value === choiceTwo.value) {
        setScore(score + 1);
        setTopScore(topScore < score + 1 ? score + 1 : topScore);
        setShuffledTiles(prevTiles => {
          return prevTiles.map((tile) => {
            if (tile.value === choiceOne.value) {
              return { ...tile, flipStatus: true };
            } else {
              return tile;
            }
          });
        });
        resetTurn();
      } else {
        setScore(score - 1 < 0 ? 0 : score - 1);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, score, topScore, shuffledTiles]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  const handleChoice = tile => {
    choiceOne ? setChoiceTwo(tile) : setChoiceOne(tile);
  };

  const restartGame = () => {
    localStorage.setItem("score", 0);
    localStorage.setItem("topScore", topScore);
    localStorage.removeItem("name");
    window.location.reload();
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Tile Matching Game</h1>
      <div className="score-container">
        <p className="score">Score: {score}</p>
        <p className="score">Top Score: {topScore}</p>
        <p className="timer">
          Time: {minutes > 9 ? minutes : `0${minutes}`}:
          {seconds > 9 ? seconds : `0${seconds}`}
        </p>
      </div>
      <div className="game-board-container">
        <p className="player-greeting">Welcome {playerName} 👋 👋</p>
        {gameEnd ? (
          <div className="game-end-container">
            <p className="game-end-message">Game Finished!</p>
            <p className="game-end-message">Score: {score}</p>
            <p className="game-end-message">
              Time Taken: {minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
            </p>
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
                tile={tile}
                handleChoice={handleChoice}
                flipped={tile === choiceOne || tile === choiceTwo || tile.flipStatus}
                disabled={disabled}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="game-controls">
        <button
          type="button"
          className="restart-button"
          onClick={restartGame}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Game;
