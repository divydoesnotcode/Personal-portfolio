import './App.css'
import { NavbarDemo } from './components/ui/Navbar'
import { SmoothCursorDemo } from './components/ui/SmoothCursor'
import { ParallaxBackground } from './components/ui/ParallaxBackground'
import { Preloader } from './components/ui/Preloader'
import { BackgroundLines } from './components/ui/BackgroundLines'

import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

import { useState, useEffect } from 'react'
import Lenis from 'lenis'

// Detect touch/mobile — cursor & parallax are pointer-device only
function isPointerDevice() {
  if (typeof window === 'undefined') return false
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  return hasFinePointer && !isMobile
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useEffect(() => {
    const updatePointer = () => setHasFinePointer(isPointerDevice())
    updatePointer()
    window.addEventListener('resize', updatePointer)
    return () => window.removeEventListener('resize', updatePointer)
  }, [])

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    window.lenis = lenis; // Expose globally for components
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy();
      window.lenis = null;
    }
  }, [])

  useEffect(() => {
    document.title = 'Divy Barot | Portfolio'
  }, [])

  return (
    <>
      {hasFinePointer && <SmoothCursorDemo />}
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          <ParallaxBackground />

          <NavbarDemo>
            <Hero />
            <main>
              <Projects />
              <Skills />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </NavbarDemo>
        </>
      )}
    </>
  )
}

export default App