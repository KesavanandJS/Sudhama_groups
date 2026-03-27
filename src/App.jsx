import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import BranchSection from './components/BranchSection'
import ProductExperience from './components/ProductExperience'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

gsap.registerPlugin(ScrollTrigger)

const branches = [
    {
        id: 'menaka',
        name: 'Menaka Textiles',
        tagline: 'Where Tradition Meets Innovation',
        description: 'Crafting premium fabrics with decades of expertise. Menaka Textiles stands at the forefront of traditional weaving, blending age-old techniques with modern manufacturing excellence to produce textiles that define quality.',
        accent: '#2E7D32',
        stats: { years: 25, products: 500, clients: 200 },
        bgGradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
    },
    {
        id: 'sudhama',
        name: 'Sudhama Hosieries',
        tagline: 'Comfort Woven Into Every Thread',
        description: 'Specializing in premium hosiery products that combine comfort with durability. From everyday essentials to specialized garments, Sudhama Hosieries delivers unmatched quality that you can feel.',
        accent: '#F9A825',
        stats: { years: 20, products: 300, clients: 150 },
        bgGradient: 'linear-gradient(135deg, #F57F17 0%, #F9A825 50%, #FDD835 100%)',
    },
    {
        id: 'gptextiles',
        name: 'G P Textiles',
        tagline: 'Engineering the Future of Fabric',
        description: 'Pushing boundaries in textile manufacturing with cutting-edge technology and sustainable practices. G P Textiles creates fabrics that set new industry standards for quality, innovation, and environmental responsibility.',
        accent: '#2E7D32',
        stats: { years: 15, products: 400, clients: 180 },
        bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)',
    },
]

function App() {
    const appRef = useRef(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!loading) {
            // Refresh ScrollTrigger after loader completes
            const timeout = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [loading])

    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <div
                ref={appRef}
                id="smooth-wrapper"
                style={{
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <Navbar />
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
        </>
    )
}

export default App
