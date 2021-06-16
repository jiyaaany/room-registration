import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Detail from './pages/Detail';
import List from './pages/List';
import Edit from './pages/Edit';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/room/register" component={Register} />
        <Route exact path="/room/:roomPK" component={Detail} />
      </Switch>
      <Route exact path="/rooms" component={List} />
      <Route exact path="/room/edit/:roomPK" component={Edit} />
    </BrowserRouter>
  );
}

export default App;
