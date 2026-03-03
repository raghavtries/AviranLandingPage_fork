import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <div className="header-wrapper">
      <header className="header">
        <Link to="/" className="logo" aria-label="Aviran home">
          <svg
            className="logo-icon"
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="14" fill="#2563EB" />
            <circle cx="14" cy="14" r="10" fill="#3B82F6" opacity="0.6" />
            <circle cx="11" cy="12" r="4" fill="white" opacity="0.25" />
          </svg>
          <span>Aviran</span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {onHome ? (
            <>
              <a href="#features">Features</a>
              <a href="#contact">Contact</a>
              <a href="#docs">Docs</a>
            </>
          ) : (
            <Link to="/">Home</Link>
          )}
          <Link to="/cases">Cases</Link>
          <a href="https://calendly.com/raghav-jsub/chat" className="btn-cta">
            Request Demo →
          </a>
        </nav>
      </header>
    </div>
  )
}
