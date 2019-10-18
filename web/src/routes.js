import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

export default function Routes() {
  return (
    <BrowserRouter>
        <Route main  exact path="/" component={Login} />
        <Route main path="/dev/:username" component={Home} />
    </BrowserRouter>      
  );
}
