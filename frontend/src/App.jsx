// TODO: Implement main App component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages here
// import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<div>InsightHunter v3</div>} />
        {/* Add routes here */}
      </Routes>
    </Router>
  );
}

export default App;

