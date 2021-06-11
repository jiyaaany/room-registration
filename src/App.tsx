import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Detail from './pages/Detail';
import List from './pages/List';

const App: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Switch>
      <Route exact path="/room/register" component={Form} />
      <Route path="/room/:roomPK" component={Detail} />
    </Switch>
    <Route exact path="/rooms" component={List} />
  </BrowserRouter>
)

export default App;
