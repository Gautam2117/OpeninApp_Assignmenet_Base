import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/upload" />} /> {/* Redirect dashboard to upload */}
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="upload" element={<Upload />} />
            <Route path="*" element={<div />} /> {/* Placeholder for other routes */}
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer /> {/* Add ToastContainer here */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
