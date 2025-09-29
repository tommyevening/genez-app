import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PeoplePage from './pages/PeoplePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <Header />
        <Routes>
          <Route path="/" element={<PeoplePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
