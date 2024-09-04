// App.js
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SessionHistoryPage from './pages/SessionHistoryPage';
import AddSessionPage from './pages/AddSessionPage';
import LoginPage from './pages/LoginPage';
import{useState, useEffect} from "react"


function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('logged_user', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  
  const logIn = () => setIsLoggedIn(true)

  const logOut = ()=> setIsLoggedIn(false)

  return (
    <div className="App">
      {location.pathname !== '/login' && <Navbar />}
    
      <div className="pages">
        
        <Routes>
          <Route path="/login" element={<LoginPage onLogIn={logIn}/>} />
          <Route path="/add-session" element={isLoggedIn ? <AddSessionPage /> : <Navigate to='/login'/>} />
          <Route path="/session-history" element={isLoggedIn ? <SessionHistoryPage /> : <Navigate to='/login'/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
