import UserInput from './components/UserInput';
import Game from './components/Game';
import './App.css';

const App = () => {
  if (localStorage.getItem('name') === null) {
    return <UserInput />;
  } else {
    return <Game />;
  }
}

export default App;
