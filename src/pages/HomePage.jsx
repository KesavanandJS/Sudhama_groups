import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Hero from '../components/Hero'
import About from '../components/About'
import BranchSection from '../components/BranchSection'
import ProductExperience from '../components/ProductExperience'
import WhyChooseUs from '../components/WhyChooseUs'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { branches } from '../data/branches'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HomePage() {
    const pageRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        // Scroll to top or specific hash on mount
        if (location.hash) {
            setTimeout(() => {
                const id = location.hash.replace('#', '')
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView()
                }
            }, 100)
        } else {
            window.scrollTo(0, 0)
        }

        // Refresh ScrollTrigger since we changed DOM
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 500)
    }, [location])

    return (
        <div ref={pageRef} id="smooth-wrapper" className="page-wrapper">
            <main>
                <Hero />
                <About />
                {branches.map((branch, index) => (
                    <BranchSection key={branch.id} branch={branch} index={index} />
                ))}
                <ProductExperience />
                <WhyChooseUs />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
