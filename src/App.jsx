import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import BranchPage from './pages/BranchPage'

gsap.registerPlugin(ScrollTrigger)

function App() {
    const [initialLoading, setInitialLoading] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [displayLocation, setDisplayLocation] = useState(null)
    const location = useLocation()

    // Set initial display location
    useEffect(() => {
        if (!displayLocation) {
            setDisplayLocation(location)
        }
    }, [location, displayLocation])

    // Handle route changes with custom page transition
    useEffect(() => {
        if (displayLocation && location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true)

            // Wait for cover animation, then swap route
            setTimeout(() => {
                // Kill old scroll triggers
                ScrollTrigger.getAll().forEach(t => t.kill())
                window.scrollTo(0, 0)
                setDisplayLocation(location)

                // Wait for unmount/mount then reveal new page
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 100)
            }, 1000) // 1s syncs with PageTransition in-animation duration
        }
    }, [location, displayLocation])

    // Initial Preloader Logic
    useEffect(() => {
        if (!initialLoading) {
            const timeout = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 300)
            return () => clearTimeout(timeout)
        }
    }, [initialLoading])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <>
            <PageTransition isVisible={isTransitioning} />
            {initialLoading && <Preloader onComplete={() => setInitialLoading(false)} />}

            <div
                id="app-container"
                style={{
                    opacity: initialLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <Navbar />
                {displayLocation && (
                    <Routes location={displayLocation}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/:slug" element={<BranchPage />} />
                    </Routes>
                )}
            </div>
        </>
    )
}

export default App
