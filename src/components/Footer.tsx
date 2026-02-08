import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <a href="#" className="footer-logo">
          Aviran
        </a>
        <p className="footer-tagline">
          AI monitoring and auto-remediation for healthcare.
        </p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Aviran. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
