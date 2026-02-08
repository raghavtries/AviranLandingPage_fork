import Header from './components/Header'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import BuiltForAgents from './components/BuiltForAgents'
import HowItWorks from './components/HowItWorks'
import Docs from './components/Docs'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <BuiltForAgents />
        <HowItWorks />
        <Docs />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
