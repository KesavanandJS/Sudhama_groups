import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const subRef = useRef(null)
    const taglineRef = useRef(null)
    const scrollIndicatorRef = useRef(null)
    const floatingShapesRef = useRef([])
    const card3dRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split the heading text into individual characters
            const heading = headingRef.current
            const text = heading.textContent
            heading.innerHTML = ''
            text.split('').forEach((char) => {
                const span = document.createElement('span')
                span.style.display = 'inline-block'
                span.style.opacity = '0'
                span.style.transform = 'translateY(120px) rotateX(90deg)'
                span.style.transformStyle = 'preserve-3d'
                span.textContent = char === ' ' ? '\u00A0' : char
                heading.appendChild(span)
            })

            // 3D character animation with perspective
            gsap.to(heading.querySelectorAll('span'), {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.04,
                delay: 0.3,
                ease: 'power4.out',
                transformPerspective: 800,
            })

            // Tagline with 3D slide
            gsap.fromTo(taglineRef.current,
                { opacity: 0, y: 40, rotateY: -15, transformPerspective: 600 },
                { opacity: 1, y: 0, rotateY: 0, duration: 1, delay: 1.5, ease: 'power3.out' }
            )

            // Subheading 3D pop
            gsap.fromTo(subRef.current,
                { opacity: 0, y: 30, z: -100, transformPerspective: 800 },
                { opacity: 1, y: 0, z: 0, duration: 1.2, delay: 1.9, ease: 'power3.out' }
            )

            // Floating 3D shapes
            floatingShapesRef.current.forEach((shape, i) => {
                if (!shape) return
                gsap.fromTo(shape,
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        delay: 2 + i * 0.2,
                        ease: 'back.out(1.7)',
                    }
                )
                // Continuous 3D rotation
                gsap.to(shape, {
                    rotateX: 360 * (i % 2 === 0 ? 1 : -1),
                    rotateY: 360,
                    rotateZ: i * 90,
                    duration: 8 + i * 3,
                    repeat: -1,
                    ease: 'none',
                })
                // Floating up/down
                gsap.to(shape, {
                    y: `${(i % 2 === 0 ? -1 : 1) * 30}`,
                    duration: 3 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                })
            })

            // 3D tilt card on mouse move
            const card = card3dRef.current
            if (card) {
                const section = sectionRef.current
                const handleMouseMove = (e) => {
                    const rect = section.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(card, {
                        rotateY: x * 10,
                        rotateX: -y * 10,
                        duration: 0.5,
                        ease: 'power2.out',
                    })
                }
                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)',
                    })
                }
                section.addEventListener('mousemove', handleMouseMove)
                section.addEventListener('mouseleave', handleMouseLeave)
            }

            // Scroll indicator
            gsap.fromTo(scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2.5 }
            )
            gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-line'), {
                scaleY: 1,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            })

            // Parallax on scroll with 3D depth
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress
                    if (headingRef.current) {
                        gsap.set(headingRef.current, {
                            y: p * 150,
                            rotateX: p * 5,
                            transformPerspective: 800,
                        })
                    }
                    if (subRef.current) {
                        gsap.set(subRef.current, { y: p * 100, opacity: 1 - p * 1.5 })
                    }
                    if (card3dRef.current) {
                        gsap.set(card3dRef.current, {
                            y: p * -60,
                            rotateZ: p * 3,
                        })
                    }
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const shapes = [
        { top: '15%', right: '12%', size: 50, color: 'var(--color-green)', type: 'cube' },
        { top: '65%', right: '8%', size: 35, color: 'var(--color-yellow)', type: 'pyramid' },
        { top: '25%', right: '30%', size: 25, color: 'var(--color-green)', type: 'ring' },
        { top: '75%', right: '25%', size: 40, color: 'var(--color-yellow)', type: 'cube' },
    ]

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="section-full"
            style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #1B5E20 100%)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0 8vw',
                position: 'relative',
                overflow: 'hidden',
                perspective: '1200px',
            }}
        >
            {/* Animated background shapes */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-15%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,168,37,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Grid pattern overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
                backgroundSize: '80px 80px',
                pointerEvents: 'none',
            }} />

            {/* Floating 3D shapes */}
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    ref={(el) => floatingShapesRef.current[i] = el}
                    style={{
                        position: 'absolute',
                        top: shape.top,
                        right: shape.right,
                        width: shape.size + 'px',
                        height: shape.size + 'px',
                        transformStyle: 'preserve-3d',
                        pointerEvents: 'none',
                        opacity: 0,
                    }}
                >
                    {shape.type === 'cube' && (
                        <>
                            {[
                                `translateZ(${shape.size / 2}px)`,
                                `rotateY(180deg) translateZ(${shape.size / 2}px)`,
                                `rotateY(90deg) translateZ(${shape.size / 2}px)`,
                                `rotateY(-90deg) translateZ(${shape.size / 2}px)`,
                                `rotateX(90deg) translateZ(${shape.size / 2}px)`,
                                `rotateX(-90deg) translateZ(${shape.size / 2}px)`,
                            ].map((transform, j) => (
                                <div key={j} style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: shape.color,
                                    opacity: 0.15,
                                    transform,
                                    backfaceVisibility: 'hidden',
                                    border: `1px solid ${shape.color}`,
                                }} />
                            ))}
                        </>
                    )}
                    {shape.type === 'ring' && (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            border: `2px solid ${shape.color}`,
                            borderRadius: '50%',
                            opacity: 0.3,
                        }} />
                    )}
                    {shape.type === 'pyramid' && (
                        <div style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${shape.size / 2}px solid transparent`,
                            borderRight: `${shape.size / 2}px solid transparent`,
                            borderBottom: `${shape.size}px solid ${shape.color}`,
                            opacity: 0.15,
                        }} />
                    )}
                </div>
            ))}

            {/* Main content with 3D tilt */}
            <div
                ref={card3dRef}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '1200px',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    ref={taglineRef}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                        fontWeight: 500,
                        color: 'var(--color-yellow)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        marginBottom: '1.5rem',
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <span className="accent-dot" style={{ marginRight: '1rem', background: 'var(--color-yellow)' }} />
                    Premium Textile Manufacturing Since 1990
                </div>

                <h1
                    ref={headingRef}
                    className="text-display"
                    style={{
                        color: 'var(--color-white)',
                        marginBottom: '2rem',
                        perspective: '1000px',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    SUDHAMA GROUPS
                </h1>

                <p
                    ref={subRef}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '600px',
                        lineHeight: 1.7,
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    Three brands. One legacy. Crafting the finest textiles with
                    tradition, innovation, and an unwavering commitment to quality.
                </p>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: 0,
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                }}>
                    Scroll
                </span>
                <div style={{
                    width: '1px',
                    height: '50px',
                    background: 'rgba(255,255,255,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div
                        className="scroll-line"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'var(--color-green)',
                            transformOrigin: 'top',
                            transform: 'scaleY(0)',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
