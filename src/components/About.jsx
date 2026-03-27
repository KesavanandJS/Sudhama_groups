import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const linesRef = useRef([])
    const accentRef = useRef(null)
    const card3dRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Accent line
            gsap.fromTo(accentRef.current,
                { width: 0 },
                {
                    width: '80px',
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    ease: 'power3.out',
                }
            )

            // Heading 3D reveal
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 80, rotateX: -20, transformPerspective: 800 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                    ease: 'power3.out',
                }
            )

            // Staggered line reveals with 3D
            linesRef.current.forEach((line, i) => {
                if (!line) return
                gsap.fromTo(line,
                    { opacity: 0, y: 50, rotateY: i % 2 === 0 ? -8 : 8, transformPerspective: 600 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 1,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 85%',
                        },
                        ease: 'power3.out',
                    }
                )
            })

            // 3D tilt on value items
            card3dRefs.current.forEach((card) => {
                if (!card) return

                const handleMouseMove = (e) => {
                    const rect = card.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(card, {
                        rotateY: x * 15,
                        rotateX: -y * 15,
                        z: 20,
                        duration: 0.4,
                        ease: 'power2.out',
                    })
                }
                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        z: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)',
                    })
                }

                card.addEventListener('mousemove', handleMouseMove)
                card.addEventListener('mouseleave', handleMouseLeave)
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const lines = [
        'Sudhama Groups stands as a testament to decades of textile excellence.',
        'Founded with a vision to revolutionize India\'s textile landscape,',
        'we have grown into a conglomerate of three distinguished brands —',
        'each a master in its domain, collectively shaping the future of fabric.',
    ]

    const values = [
        { label: 'Heritage', desc: 'Decades of textile mastery passed through generations', icon: '◈' },
        { label: 'Innovation', desc: 'Embracing modern technology while honoring tradition', icon: '◇' },
        { label: 'Quality', desc: 'Uncompromising standards in every thread we weave', icon: '◆' },
    ]

    return (
        <section
            ref={sectionRef}
            id="about"
            className="section-full"
            style={{
                background: 'var(--color-white)',
                flexDirection: 'column',
                padding: '10vh 8vw',
                justifyContent: 'center',
                perspective: '1200px',
            }}
        >
            <div style={{ maxWidth: '1100px', width: '100%' }}>
                {/* Label */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    <div
                        ref={accentRef}
                        style={{
                            height: '2px',
                            background: 'var(--color-green)',
                            width: 0,
                        }}
                    />
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--color-green)',
                    }}>
                        Our Story
                    </span>
                </div>

                {/* Heading */}
                <h2
                    ref={headingRef}
                    className="text-headline"
                    style={{
                        color: 'var(--color-dark)',
                        marginBottom: '3rem',
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    Weaving Excellence<br />
                    <span style={{ color: 'var(--color-green)' }}>Since Generations</span>
                </h2>

                {/* Story lines */}
                <div style={{ marginBottom: '5rem' }}>
                    {lines.map((line, i) => (
                        <p
                            key={i}
                            ref={(el) => linesRef.current[i] = el}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                                fontWeight: 300,
                                lineHeight: 1.8,
                                color: 'var(--color-text-light)',
                                opacity: 0,
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                {/* Values with 3D hover tilt */}
                <div style={{
                    display: 'flex',
                    gap: '3rem',
                    flexWrap: 'wrap',
                }}>
                    {values.map((val, i) => (
                        <div
                            key={val.label}
                            ref={(el) => {
                                card3dRefs.current[i] = el
                                linesRef.current[lines.length + i] = el
                            }}
                            style={{
                                flex: '1 1 280px',
                                opacity: 0,
                                transformStyle: 'preserve-3d',
                                padding: '2rem',
                                borderRadius: '2px',
                                borderLeft: `3px solid ${i === 1 ? 'var(--color-yellow)' : 'var(--color-green)'}`,
                                background: 'var(--color-off-white)',
                                cursor: 'default',
                                transition: 'box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.08)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem',
                                marginBottom: '0.75rem',
                                color: i === 1 ? 'var(--color-yellow)' : 'var(--color-green)',
                                transform: 'translateZ(30px)',
                            }}>
                                {val.icon}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--color-dark)',
                                marginBottom: '0.5rem',
                                transform: 'translateZ(20px)',
                            }}>
                                {val.label}
                            </div>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.95rem',
                                color: 'var(--color-text-light)',
                                lineHeight: 1.6,
                                transform: 'translateZ(10px)',
                            }}>
                                {val.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
