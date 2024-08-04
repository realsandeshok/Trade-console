// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip'; // Import your TooltipProvider
import { Auth } from './components/component/auth'; // Adjust the path as necessary
import { Accounts } from './components/component/accounts';

export default function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          {/* <Route path="/dashboard" element={<Auth />} /> */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Accounts />} />
          
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </TooltipProvider>
  );
}
