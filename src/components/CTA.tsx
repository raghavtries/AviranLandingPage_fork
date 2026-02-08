import './CTA.css'

export default function CTA() {
  return (
    <section id="demo" className="cta">
      <div className="cta-inner">
        <h2 className="cta-title">Ready to see Aviran in action?</h2>
        <p className="cta-text">
          Aviran continuously improves your agents in production—finding the best configs, simulating them, and auto-deploying. Stop manually testing countless parameter combinations.
        </p>
        <a href="#contact" className="cta-button">
          Talk to us
        </a>
      </div>
    </section>
  )
}
