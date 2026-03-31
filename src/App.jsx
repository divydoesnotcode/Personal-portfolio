import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'

// Keep these eager — they're above the fold
import { NavbarDemo } from './components/ui/Navbar'
import { SmoothCursorDemo } from './components/ui/SmoothCursor'
import { ParallaxBackground } from './components/ui/ParallaxBackground'
import { Preloader } from './components/ui/Preloader'
import { Hero } from './components/Hero'
import { WebcamPixelGridDemo } from './components/ui/webcamDemo'

// Lazy load everything below the fold
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })))
const Skills = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })))
const Experience = lazy(() => import('./components/Experience').then(m => ({ default: m.Experience })))
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })))
const ResumeDownload = lazy(() => import('./components/ui/ResumeDownload').then(m => ({ default: m.ResumeDownload })))
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))

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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    window.lenis = lenis
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { lenis.destroy(); window.lenis = null; }
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
          {hasFinePointer && <ParallaxBackground />}
          <NavbarDemo>
            <Hero />
            <main>
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                <Projects />
                <Skills />
                <Experience />
                <Contact />
                <ResumeDownload />
              </Suspense>
            </main>
            <Suspense fallback={null}>
            </Suspense>
          </NavbarDemo>
          <div className="hidden md:block">
            <WebcamPixelGridDemo />
          </div>
          <div className="block md:hidden">
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </>
      )}
    </>
  )
}

export default App