import { Switch, Route, BrowserRouter } from 'react-router-dom';
import UserInput from './components/UserInput';
import Game from './components/Game';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserInput} />
        <Route path="/game" exact component={Game} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
