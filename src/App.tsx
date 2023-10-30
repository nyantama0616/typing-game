import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import './App.css';
import LearnThree from './components/pages/LearnThree';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />}></Route>
          <Route path="/learn-three" element={<LearnThree />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
