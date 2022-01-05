import React from 'react';
import { Home, Add, Watch } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/add'>
            <Add />
          </Route>
          <Route path='/watch'>
            <Watch />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;