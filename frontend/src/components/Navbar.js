import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="nav-links">
          <Link to="/add-session">
            <h1>Add Session</h1>
          </Link>
          <Link to="/session-history">
            <h1>Session History</h1>
          </Link>
          <Link to="/all-time-graph">
            <h1>All Time Graph</h1>
          </Link>
          <Link to="/stats">
            <h1>Stats</h1>
          </Link>
        </div>
        <Link to="/" className="logout">
          <h1>Logout</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
