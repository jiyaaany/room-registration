import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Detail from './pages/Detail';
import List from './pages/List';
import { roomItems } from './roomItems';

const App: React.FC = () => {
  useEffect(() => {
    if (!window.localStorage.getItem('roomItems')) {
      window.localStorage.setItem('roomItems', JSON.stringify(roomItems));
    }
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/room/register" component={Register} />
        <Route path="/room/:roomPK" component={Detail} />
      </Switch>
      <Route exact path="/rooms" component={List} />
    </BrowserRouter>
  );
}

export default App;
