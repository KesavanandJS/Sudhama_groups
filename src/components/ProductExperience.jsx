import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const productStory = [
    {
        title: 'Raw Materials',
        subtitle: 'Sourced with Care',
        description: 'We begin with the finest raw materials, hand-selected from trusted suppliers across the region. Every fiber tells a story of quality.',
        bgColor: '#fafafa',
        accent: 'var(--color-green)',
    },
    {
        title: 'Precision Weaving',
        subtitle: 'Crafted with Expertise',
        description: 'Our state-of-the-art looms combined with master craftsmen produce fabrics of extraordinary precision and consistency.',
        bgColor: '#f5f5f0',
        accent: 'var(--color-yellow)',
    },
    {
        title: 'Quality Control',
        subtitle: 'Tested for Perfection',
        description: 'Every meter of fabric undergoes rigorous quality checks before it leaves our facility, ensuring only the best reaches our customers.',
        bgColor: '#f0f5f0',
        accent: 'var(--color-green)',
    },
    {
        title: 'Global Delivery',
        subtitle: 'Reaching Every Corner',
        description: 'From our manufacturing hubs, we deliver premium textiles across India and beyond, building lasting relationships with every shipment.',
        bgColor: '#fafaf5',
        accent: 'var(--color-yellow)',
    },
]

export default function ProductExperience() {
    const sectionRef = useRef(null)
    const wrapperRef = useRef(null)
    const headerRef = useRef(null)
    const panelsRef = useRef([])
    const iconRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 3D Header animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 60, rotateX: -15, transformPerspective: 800 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                    },
                    ease: 'power3.out',
                }
            )

            // 3D floating icons
            iconRefs.current.forEach((icon, i) => {
                if (!icon) return
                gsap.to(icon, {
                    rotateY: 360,
                    rotateX: i % 2 === 0 ? 180 : -180,
                    duration: 10 + i * 2,
                    repeat: -1,
                    ease: 'none',
                })
                gsap.to(icon, {
                    y: (i % 2 === 0 ? -1 : 1) * 20,
                    duration: 2 + i * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                })
            })

            // Horizontal scroll
            const panels = panelsRef.current.filter(Boolean)
            if (panels.length > 0 && wrapperRef.current) {
                const totalWidth = panels.length * window.innerWidth

                gsap.to(wrapperRef.current, {
                    x: -(totalWidth - window.innerWidth),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: () => `+=${totalWidth - window.innerWidth}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const icons3d = [
        { symbol: '⬡', top: '15%', right: '15%', size: 40 },
        { symbol: '◈', top: '70%', right: '10%', size: 30 },
        { symbol: '△', top: '20%', right: '40%', size: 25 },
    ]

    return (
        <section ref={sectionRef} id="products" style={{ overflow: 'hidden', perspective: '1200px' }}>
            {/* Header */}
            <div
                ref={headerRef}
                style={{
                    padding: '3vh 8vw 0.5vh',
                    opacity: 0,
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                }}
            >
                {/* 3D floating icons */}
                {icons3d.map((icon, i) => (
                    <div
                        key={i}
                        ref={(el) => iconRefs.current[i] = el}
                        style={{
                            position: 'absolute',
                            top: icon.top,
                            right: icon.right,
                            fontSize: icon.size + 'px',
                            color: i % 2 === 0 ? 'var(--color-green)' : 'var(--color-yellow)',
                            opacity: 0.1,
                            transformStyle: 'preserve-3d',
                            pointerEvents: 'none',
                        }}
                    >
                        {icon.symbol}
                    </div>
                ))}

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <span className="accent-line-yellow" />
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--color-yellow-dark)',
                    }}>
                        Our Process
                    </span>
                </div>
                <h2 className="text-headline" style={{ color: 'var(--color-dark)' }}>
                    From Fiber to<br />
                    <span style={{ color: 'var(--color-green)' }}>Finished Fabric</span>
                </h2>
            </div>

            {/* Horizontal scroll panels */}
            <div
                ref={wrapperRef}
                className="horizontal-scroll-wrapper"
            >
                {productStory.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => panelsRef.current[i] = el}
                        className="horizontal-panel"
                        style={{
                            background: item.bgColor,
                            padding: '0 8vw',
                            perspective: '1000px',
                        }}
                    >
                        {/* 3D rotating background shape */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            right: '15%',
                            transform: 'translateY(-50%)',
                            width: 'clamp(150px, 20vw, 300px)',
                            height: 'clamp(150px, 20vw, 300px)',
                            border: `1px solid ${item.accent === 'var(--color-green)' ? 'rgba(46,125,50,0.1)' : 'rgba(249,168,37,0.1)'}`,
                            borderRadius: i % 2 === 0 ? '0' : '50%',
                            animation: `spin3d${i % 2 === 0 ? 'A' : 'B'} 20s linear infinite`,
                            pointerEvents: 'none',
                        }} />

                        {/* Large background number */}
                        <div
                            className="panel-number"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '8vw',
                                transform: 'translateY(-50%)',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(10rem, 25vw, 20rem)',
                                fontWeight: 900,
                                color: item.accent === 'var(--color-green)' ? 'rgba(46,125,50,0.06)' : 'rgba(249,168,37,0.06)',
                                lineHeight: 1,
                                pointerEvents: 'none',
                            }}
                        >
                            0{i + 1}
                        </div>

                        <div
                            className="panel-content"
                            style={{
                                maxWidth: '600px',
                                position: 'relative',
                                zIndex: 2,
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {/* 3D Step icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: i % 2 === 0 ? '0' : '50%',
                                border: `2px solid ${item.accent === 'var(--color-green)' ? '#2E7D32' : '#F9A825'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                transform: 'translateZ(40px)',
                                background: 'var(--color-white)',
                                boxShadow: `0 10px 30px ${item.accent === 'var(--color-green)' ? 'rgba(46,125,50,0.15)' : 'rgba(249,168,37,0.15)'}`,
                            }}>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    color: item.accent === 'var(--color-green)' ? '#2E7D32' : '#F9A825',
                                }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                fontWeight: 800,
                                color: 'var(--color-dark)',
                                lineHeight: 1.1,
                                marginBottom: '0.75rem',
                                transform: 'translateZ(25px)',
                            }}>
                                {item.title}
                            </h3>

                            <p style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                                fontWeight: 400,
                                color: 'var(--color-text-light)',
                                marginBottom: '1.5rem',
                                fontStyle: 'italic',
                                transform: 'translateZ(15px)',
                            }}>
                                {item.subtitle}
                            </p>

                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                color: 'var(--color-text-light)',
                                lineHeight: 1.8,
                                maxWidth: '480px',
                                transform: 'translateZ(10px)',
                            }}>
                                {item.description}
                            </p>

                            {/* Progress indicator */}
                            <div style={{
                                marginTop: '3rem',
                                display: 'flex',
                                gap: '0.5rem',
                                transform: 'translateZ(5px)',
                            }}>
                                {productStory.map((_, j) => (
                                    <div
                                        key={j}
                                        style={{
                                            width: j === i ? '40px' : '12px',
                                            height: '3px',
                                            background: j === i
                                                ? (item.accent === 'var(--color-green)' ? '#2E7D32' : '#F9A825')
                                                : '#ddd',
                                            borderRadius: '2px',
                                            transition: 'all 0.3s ease',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3D spin keyframes */}
            <style>{`
        @keyframes spin3dA {
          from { transform: translateY(-50%) rotateX(0deg) rotateY(0deg); }
          to { transform: translateY(-50%) rotateX(360deg) rotateY(360deg); }
        }
        @keyframes spin3dB {
          from { transform: translateY(-50%) rotateY(0deg) rotateZ(0deg); }
          to { transform: translateY(-50%) rotateY(360deg) rotateZ(360deg); }
        }
      `}</style>
        </section>
    )
}
