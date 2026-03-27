import { useEffect, useRef } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { branches } from '../data/branches'
import Marquee3D from '../components/Marquee3D'
import Footer from '../components/Footer'

export default function BranchPage() {
    const { slug } = useParams()
    const branch = branches.find(b => b.route === `/${slug}`)
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!branch) return

        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            // Hero Parallax Setup
            gsap.to(heroRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // Text Reveal Animations
            const splitLines = contentRef.current?.querySelectorAll('.reveal-text')
            splitLines?.forEach((line) => {
                gsap.fromTo(line,
                    { opacity: 0, y: 50, rotateX: -30, transformPerspective: 800 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 1.2,
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 85%',
                        },
                        ease: 'power3.out',
                    }
                )
            })

            // Capability Cards 3D Effect
            const cards = contentRef.current?.querySelectorAll('.cap-card')
            cards?.forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 100, rotateY: 30, transformPerspective: 1000 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 1.5,
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                        },
                        ease: 'power3.out',
                    }
                )

                // Hover effect setup
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(card, {
                        rotateY: x * 15,
                        rotateX: -y * 15,
                        translateZ: 30,
                        duration: 0.4,
                        ease: 'power2.out',
                    })
                })
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        translateZ: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)',
                    })
                })
            })

        }, pageRef)

        // Give a slight delay before creating triggers to ensure layout is done
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 200)

        return () => ctx.revert()
    }, [branch])

    // Redirect if invalid branch slug
    if (!branch) {
        return <Navigate to="/" replace />
    }

    return (
        <div ref={pageRef} style={{ background: 'var(--color-white)', minHeight: '100vh' }}>

            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: branch.bgGradient,
                }}
            >
                <div
                    ref={heroRef}
                    style={{
                        position: 'absolute',
                        inset: -50, // Bleed for parallax
                        background: `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%), ${branch.bgGradient}`,
                        zIndex: 1,
                        opacity: 0.8,
                    }}
                />

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '0 5vw',
                    perspective: '1200px',
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1,
                        marginBottom: '1rem',
                        textShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        animation: 'slideUpFade 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}>
                        {branch.name}
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        color: 'rgba(255,255,255,0.8)',
                        fontStyle: 'italic',
                        animation: 'slideUpFade 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
                        opacity: 0,
                    }}>
                        {branch.tagline}
                    </p>
                </div>

                {/* Scroll indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '5vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    animation: 'bounce 2s infinite',
                    opacity: 0.6,
                }}>
                    <div style={{
                        width: '1px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, #fff, transparent)',
                    }} />
                </div>
            </section>

            <div ref={contentRef}>
                {/* Story Section */}
                <section className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '15vh 5vw' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
                        <span style={{ width: '40px', height: '2px', background: branch.accent }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, fontSize: '0.85rem' }}>Our Heritage</span>
                    </div>

                    <h2 className="reveal-text" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: 'var(--color-dark)',
                        lineHeight: 1.2,
                        marginBottom: '2rem',
                        maxWidth: '900px',
                        transformStyle: 'preserve-3d',
                    }}>
                        {branch.details.story}
                    </h2>
                </section>

                {/* 3D Capabilities Section */}
                <section style={{ background: '#fafafa', padding: '15vh 5vw' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                            {branch.details.capabilities.map((cap, i) => (
                                <div
                                    key={i}
                                    className="cap-card"
                                    style={{
                                        background: '#fff',
                                        padding: '4rem 3rem',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                                        borderTop: `4px solid ${branch.accent}`,
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    <div style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '4rem',
                                        fontWeight: 900,
                                        color: branch.accent,
                                        opacity: 0.1,
                                        lineHeight: 0.8,
                                        marginBottom: '1.5rem',
                                        transform: 'translateZ(20px)',
                                    }}>0{i + 1}</div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.75rem',
                                        fontWeight: 700,
                                        marginBottom: '1rem',
                                        transform: 'translateZ(30px)',
                                    }}>{cap.title}</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: 'var(--color-text-light)',
                                        lineHeight: 1.7,
                                        transform: 'translateZ(10px)',
                                    }}>{cap.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3D Marquees for Products */}
                <section style={{ padding: '10vh 0', overflow: 'hidden' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5vh' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Product Portfolio</h2>
                    </div>

                    <Marquee3D
                        items={branch.details.products}
                        speed={1}
                        accent={branch.accent}
                    />
                    <Marquee3D
                        items={branch.details.products.map(p => p.split('').reverse().join(''))} // Mocks different products
                        speed={1.2}
                        reverse={true}
                        accent={branch.accent === '#F9A825' ? 'var(--color-green)' : 'var(--color-yellow)'}
                    />
                </section>

                {/* CTA Section */}
                <section style={{
                    padding: '20vh 5vw',
                    textAlign: 'center',
                    background: branch.bgGradient,
                    color: '#fff',
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: 800,
                        marginBottom: '2rem'
                    }}>
                        Ready to Partner with {branch.name.split(' ')[0]}?
                    </h2>
                    <button
                        onClick={() => {
                            navigate('/')
                            setTimeout(() => {
                                const el = document.getElementById('contact')
                                if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }, 500)
                        }}
                        className="btn-primary"
                        style={{
                            background: '#fff',
                            color: branch.accent,
                            padding: '1.5rem 3rem',
                            fontSize: '1.2rem',
                        }}
                    >
                        Get in Touch Today
                    </button>
                </section>
            </div>

            <Footer />

            {/* Local keyframes for hero entry */}
            <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(60px) rotateX(-20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 20px); }
        }
      `}</style>
        </div>
    )
}
