import './CTA.css'

export default function CTA() {
  return (
    <section id="demo" className="cta">
      <div className="cta-inner">
        <h2 className="cta-title">Ready to see Aviran in action?</h2>
        <p className="cta-text">
          Aviran continuously monitors healthcare AI pipelines, spots drift
          before it hurts patients, and auto-fixes issues so teams stay
          compliant and accurate.
        </p>
        <a href="#contact" className="cta-button">
          Talk to us
        </a>
      </div>
    </section>
  )
}
