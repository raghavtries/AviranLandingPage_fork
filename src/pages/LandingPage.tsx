import '../App.css'
import { Nav } from '../components/marketing/Nav'
import { Hero } from '../components/marketing/Hero'
import { LoopVisualizer } from '../components/marketing/LoopVisualizer'
import { FeatureGrid } from '../components/marketing/FeatureGrid'
import { HowItWorksNew } from '../components/marketing/HowItWorksNew'
import { FAQ } from '../components/marketing/FAQ'
import { CTAFooter } from '../components/marketing/CTAFooter'
import { SiteFooter } from '../components/marketing/SiteFooter'

export default function LandingPage() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <LoopVisualizer />
        <FeatureGrid />
        <HowItWorksNew />
        <FAQ />
        <CTAFooter />
      </main>
      <SiteFooter />
    </div>
  )
}
