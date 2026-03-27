import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import BranchPage from './pages/BranchPage'
import CapacityPage from './pages/CapacityPage'
import AchievementsPage from './pages/AchievementsPage'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

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

    // Scroll to section when navigating home from a branch page
    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            const target = location.state.scrollTo
            // Wait for transition + page mount then scroll
            setTimeout(() => {
                const el = document.querySelector(target)
                if (el) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: { y: el, offsetY: 0 },
                        ease: 'power3.inOut',
                    })
                }
            }, 1300) // after 1s transition + small buffer
        }
    }, [location])

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
                        <Route path="/capacity" element={<CapacityPage />} />
                        <Route path="/achievements" element={<AchievementsPage />} />
                        <Route path="/:slug" element={<BranchPage />} />
                    </Routes>
                )}
            </div>
        </>
    )
}

export default App
