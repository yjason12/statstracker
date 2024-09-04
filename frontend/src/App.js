// App.js
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SessionHistoryPage from './pages/SessionHistoryPage';
import AddSessionPage from './pages/AddSessionPage';
import LoginPage from './pages/LoginPage';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user ID

  useEffect(() => {
    const loggedUserData = JSON.parse(localStorage.getItem('logged_user'));
    if (loggedUserData && loggedUserData.isLoggedIn) {
      setIsLoggedIn(loggedUserData.isLoggedIn);
      setUserId(loggedUserData.userId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('logged_user', JSON.stringify({ isLoggedIn, userId }));
  }, [isLoggedIn, userId]);

  const logIn = (id) => {
    setIsLoggedIn(true);
    setUserId(id); // Set user ID
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUserId(null); // Clear user ID
    localStorage.removeItem('logged_user'); // Remove from local storage
  };

  return (
    <div className="App">
      {location.pathname !== '/login' && <Navbar onLogOut={logOut} />}
    
      <div className="pages">
        <Routes>
          <Route path="/login" element={<LoginPage onLogIn={logIn} />} />
          <Route 
            path="/add-session" 
            element={isLoggedIn ? <AddSessionPage userId={userId} /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/session-history" 
            element={isLoggedIn ? <SessionHistoryPage userId={userId} /> : <Navigate to='/login' />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
