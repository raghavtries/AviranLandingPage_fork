import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="header-wrapper">
      <header className="header">
        <a href="#" className="logo" aria-label="Aviran home">
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
        </a>
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
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <a href="#docs">Docs</a>
          <a href="#demo" className="btn-cta">
            Request Demo →
          </a>
        </nav>
      </header>
    </div>
  )
}
