import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Brands />
        <Stats />
        <About />
        <Services />
        <Process />
        <Projects />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
