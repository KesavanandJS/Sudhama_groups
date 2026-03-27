import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const reasons = [
    {
        number: '30+',
        label: 'Years of Excellence',
        description: 'Three decades of unwavering commitment to quality textile manufacturing.',
    },
    {
        number: '1200+',
        label: 'Products Delivered',
        description: 'A diverse portfolio spanning hosiery, woven fabrics, and specialty textiles.',
    },
    {
        number: '500+',
        label: 'Satisfied Partners',
        description: 'Building lasting relationships with retailers, exporters, and brands worldwide.',
    },
    {
        number: '3',
        label: 'Specialized Brands',
        description: 'Each brand mastering its domain — together, an unstoppable textile powerhouse.',
    },
]

export default function WhyChooseUs() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const itemsRef = useRef([])
    const lineRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 3D Heading
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 80, rotateX: -20, transformPerspective: 800 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                    ease: 'power3.out',
                }
            )

            // Vertical accent line
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                    ease: 'power3.out',
                }
            )

            // Staggered items with 3D flip
            itemsRef.current.forEach((item, i) => {
                if (!item) return

                gsap.fromTo(item,
                    {
                        opacity: 0,
                        x: i % 2 === 0 ? -80 : 80,
                        rotateY: i % 2 === 0 ? -25 : 25,
                        transformPerspective: 800,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                        },
                        ease: 'power3.out',
                    }
                )

                // 3D pop on the number
                const numEl = item.querySelector('.reason-number')
                if (numEl) {
                    gsap.fromTo(numEl,
                        { scale: 0.3, opacity: 0, rotateX: -90, transformPerspective: 600 },
                        {
                            scale: 1,
                            opacity: 1,
                            rotateX: 0,
                            duration: 1,
                            delay: 0.2,
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 80%',
                            },
                            ease: 'back.out(1.7)',
                        }
                    )
                }

                // 3D hover tilt
                const handleMouseMove = (e) => {
                    const rect = item.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(item, {
                        rotateY: x * 8,
                        rotateX: -y * 8,
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                }
                const handleMouseLeave = () => {
                    gsap.to(item, {
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.6)',
                    })
                }
                item.addEventListener('mousemove', handleMouseMove)
                item.addEventListener('mouseleave', handleMouseLeave)
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="why-us"
            className="section-full"
            style={{
                background: 'var(--color-white)',
                flexDirection: 'column',
                padding: '10vh 8vw',
                justifyContent: 'center',
                position: 'relative',
                perspective: '1200px',
            }}
        >
            {/* Heading */}
            <div
                ref={headingRef}
                style={{
                    textAlign: 'center',
                    marginBottom: '6rem',
                    opacity: 0,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <span className="accent-line" />
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--color-green)',
                    }}>
                        Why Choose Us
                    </span>
                    <span className="accent-line" />
                </div>
                <h2 className="text-headline" style={{ color: 'var(--color-dark)' }}>
                    Numbers That<br />
                    <span style={{ color: 'var(--color-green)' }}>Speak</span> For Themselves
                </h2>
            </div>

            {/* Items with center line */}
            <div style={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                margin: '0 auto',
            }}>
                {/* Center vertical line */}
                <div
                    ref={lineRef}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(to bottom, var(--color-green), var(--color-yellow))',
                        transformOrigin: 'top',
                        transform: 'scaleY(0)',
                    }}
                    className="center-line-desktop"
                />

                {reasons.map((reason, i) => (
                    <div
                        key={i}
                        ref={(el) => itemsRef.current[i] = el}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3rem',
                            marginBottom: i < reasons.length - 1 ? '4rem' : 0,
                            flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                            opacity: 0,
                            transformStyle: 'preserve-3d',
                            cursor: 'default',
                        }}
                    >
                        {/* Content side */}
                        <div style={{
                            flex: 1,
                            textAlign: i % 2 === 0 ? 'right' : 'left',
                            transform: 'translateZ(15px)',
                        }}>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--color-dark)',
                                marginBottom: '0.5rem',
                            }}>
                                {reason.label}
                            </h3>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.95rem',
                                color: 'var(--color-text-light)',
                                lineHeight: 1.6,
                            }}>
                                {reason.description}
                            </p>
                        </div>

                        {/* Center dot with 3D pulse */}
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: i % 2 === 0 ? 'var(--color-green)' : 'var(--color-yellow)',
                            flexShrink: 0,
                            position: 'relative',
                            zIndex: 2,
                            boxShadow: `0 0 0 4px var(--color-white), 0 0 0 6px ${i % 2 === 0 ? 'var(--color-green)' : 'var(--color-yellow)'}`,
                            transform: 'translateZ(30px)',
                        }} />

                        {/* Number side */}
                        <div style={{
                            flex: 1,
                            textAlign: i % 2 === 0 ? 'left' : 'right',
                            transform: 'translateZ(25px)',
                        }}>
                            <div
                                className="reason-number"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 900,
                                    color: i % 2 === 0 ? 'var(--color-green)' : 'var(--color-yellow)',
                                    lineHeight: 1,
                                    opacity: 0,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {reason.number}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Responsive overrides */}
            <style>{`
        @media (max-width: 768px) {
          .center-line-desktop { display: none !important; }
          #why-us > div:last-of-type > div {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          #why-us > div:last-of-type > div > div {
            text-align: center !important;
          }
        }
      `}</style>
        </section>
    )
}
