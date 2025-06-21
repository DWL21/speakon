import { Link } from 'react-router-dom'

export function TopBar() {
  return (
    <header className="top-bar">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </nav>
    </header>
  )
} 