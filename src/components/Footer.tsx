import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <a href="#" className="footer-logo">
          Aviran
        </a>
        <p className="footer-tagline">
          Self-learning infrastructure for AI agents.
        </p>
        <div className="footer-contact">
          <p className="footer-contact-label">Contact us:</p>
          <div className="footer-emails">
            <a href="mailto:akshaj.molukutla@gmail.com" className="footer-email">
              akshaj.molukutla@gmail.com
            </a>
            <a href="mailto:raghav.jsub@gmail.com" className="footer-email">
              raghav.jsub@gmail.com
            </a>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Aviran. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
