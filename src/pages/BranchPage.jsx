import { useEffect, useRef } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { branches } from '../data/branches'
import Marquee3D from '../components/Marquee3D'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function BranchPage() {
    const { slug } = useParams()
    const branch = branches.find(b => b.route === `/${slug}`)
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const heroTextRef = useRef(null)
    const heroImgRef = useRef(null)
    const gallerySectionRef = useRef(null)
    const galleryWrapperRef = useRef(null)
    const galleryPanelsRef = useRef([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!branch) return
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {

            // ── Hero text cinematic entrance ──
            const tl = gsap.timeline({ delay: 0.2 })
            tl.fromTo('.hero-eyebrow',
                { opacity: 0, x: -40 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
            )
                .fromTo('.hero-title',
                    { opacity: 0, y: 100, rotateX: -30, filter: 'blur(20px)', transformPerspective: 1000 },
                    { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
                    '-=0.4'
                )
                .fromTo('.hero-tagline',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo('.hero-scroll-cue',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8 },
                    '-=0.3'
                )

            // ── Hero image parallax ──
            gsap.to(heroRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top top',
                    end: '40% top',
                    scrub: true,
                }
            })

            // ── Stats strip ── reveal each stat
            gsap.utils.toArray('.stat-item').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30, scale: 0.85 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.12, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: el, start: 'top 90%' }
                    }
                )
            })

            // ── Stats count-up ──
            gsap.utils.toArray('.stat-num').forEach(el => {
                const target = +el.dataset.val
                gsap.fromTo({ val: 0 }, { val: target }, {
                    duration: 2.5, ease: 'power2.out',
                    onUpdate() { el.textContent = Math.floor(this.targets()[0].val) + '+' },
                    scrollTrigger: { trigger: el, start: 'top 90%' }
                })
            })

            // ── Story image: 3D tilt + parallax ──
            gsap.fromTo('.story-img-wrap',
                { opacity: 0, x: -80, rotateY: 15, transformPerspective: 1200 },
                {
                    opacity: 1, x: 0, rotateY: 0, duration: 1.6, ease: 'power4.out',
                    scrollTrigger: { trigger: '.story-section', start: 'top 80%' }
                }
            )

            // ── Story text: stagger words ──
            gsap.fromTo('.story-char',
                { opacity: 0, y: 50, rotateX: -25, transformPerspective: 800 },
                {
                    opacity: 1, y: 0, rotateX: 0,
                    stagger: 0.05, duration: 1.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.story-section', start: 'top 75%' }
                }
            )
            gsap.fromTo('.story-body',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.story-body', start: 'top 85%' }
                }
            )

            // ── Capability rows: alternating 3D slide ──
            gsap.utils.toArray('.cap-row').forEach((row, i) => {
                const dir = i % 2 === 0 ? -150 : 150
                gsap.fromTo(row,
                    { x: dir, opacity: 0, rotateY: i % 2 === 0 ? -25 : 25, transformPerspective: 1200, filter: 'blur(8px)' },
                    {
                        x: 0, opacity: 1, rotateY: 0, filter: 'blur(0px)', duration: 1.6,
                        ease: 'power4.out',
                        scrollTrigger: { trigger: row, start: 'top 82%' }
                    }
                )
            })

            // ── Gallery tiles: stagger 3D flip-up ──
            gsap.utils.toArray('.gallery-tile').forEach((tile, i) => {
                gsap.fromTo(tile,
                    { opacity: 0, y: 60, rotateX: -20, scale: 0.9, transformPerspective: 1000 },
                    {
                        opacity: 1, y: 0, rotateX: 0, scale: 1,
                        duration: 1, ease: 'power3.out',
                        delay: (i % 4) * 0.1,
                        scrollTrigger: { trigger: tile, start: 'top 88%' }
                    }
                )
            })

            // ── CTA section: scale reveal ──
            gsap.fromTo('.cta-content',
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out',
                    scrollTrigger: { trigger: '.cta-content', start: 'top 80%' }
                }
            )

            // ── Gallery Horizontal Scroll ──
            const galleryPanels = galleryPanelsRef.current.filter(Boolean)
            if (galleryPanels.length > 0 && galleryWrapperRef.current && gallerySectionRef.current) {
                const totalWidth = galleryPanels.length * window.innerWidth
                gsap.to(galleryWrapperRef.current, {
                    x: -(totalWidth - window.innerWidth),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: gallerySectionRef.current,
                        start: 'top top',
                        end: () => `+=${totalWidth}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                })

                // Add parallax to images inside panels
                galleryPanels.forEach((panel, i) => {
                    const img = panel.querySelector('.gallery-img')
                    if (img) {
                        gsap.fromTo(img,
                            { xPercent: -10 },
                            {
                                xPercent: 10,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: gallerySectionRef.current,
                                    start: () => `top top-=${i * window.innerWidth}`,
                                    end: () => `+=${window.innerWidth}`,
                                    scrub: true,
                                }
                            }
                        )
                    }
                })
            }

        }, pageRef)

        setTimeout(() => ScrollTrigger.refresh(), 300)
        return () => ctx.revert()
    }, [branch])

    if (!branch) return <Navigate to="/" replace />

    const isDark = branch.id === 'gptextiles'
    const bg = isDark ? '#080808' : '#f5f3f0'
    const fg = isDark ? '#ffffff' : '#0a0a0a'
    const fgSub = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)'

    // 3D card mouse tilt handler
    const handleTilt = (e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(el, { rotateY: x * 18, rotateX: -y * 18, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
    }
    const handleTiltLeave = (e) => {
        gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    }

    return (
        <div ref={pageRef} style={{ background: bg, color: fg, overflowX: 'hidden' }}>

            {/* ═══════════ HERO ═══════════ */}
            <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>

                {/* Parallax BG */}
                <div ref={heroRef} style={{
                    position: 'absolute', inset: '-80px',
                    backgroundImage: `url(${branch.images[0]})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.38)',
                    willChange: 'transform',
                }} />

                {/* Noise texture overlay for film-grain feel */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                    pointerEvents: 'none', opacity: 0.6,
                }} />

                {/* Gradient layers */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: `
                        linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%),
                        linear-gradient(120deg, ${branch.accent}44 0%, transparent 55%)
                    `,
                }} />

                {/* Accent glare orb */}
                <div style={{
                    position: 'absolute', zIndex: 1,
                    top: '10%', right: '10%',
                    width: 'clamp(300px, 40vw, 600px)',
                    height: 'clamp(300px, 40vw, 600px)',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${branch.accent}22 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }} />

                {/* Hero Text */}
                <div ref={heroTextRef} style={{
                    position: 'relative', zIndex: 2,
                    padding: 'clamp(2.5rem, 7vw, 7rem)',
                    maxWidth: '1000px',
                }}>
                    <div className="hero-eyebrow" style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.8rem',
                    }}>
                        <span style={{ width: '50px', height: '1.5px', background: branch.accent, display: 'block' }} />
                        <span style={{
                            color: branch.accent, textTransform: 'uppercase',
                            letterSpacing: '0.3em', fontSize: '0.72rem', fontWeight: 700,
                        }}>Sudhama Groups</span>
                    </div>

                    <h1 className="hero-title" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(4rem, 10vw, 9rem)',
                        fontWeight: 900, color: '#fff',
                        lineHeight: 0.9, letterSpacing: '-0.03em',
                        marginBottom: '2rem',
                        transformStyle: 'preserve-3d',
                    }}>{branch.name}</h1>

                    <p className="hero-tagline" style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
                        color: 'rgba(255,255,255,0.65)',
                        fontStyle: 'italic', maxWidth: '520px', lineHeight: 1.65,
                        borderLeft: `3px solid ${branch.accent}`,
                        paddingLeft: '1.2rem',
                    }}>{branch.tagline}</p>
                </div>

                {/* Scroll cue */}
                <div className="hero-scroll-cue" style={{
                    position: 'absolute', bottom: '2.5rem', right: '3.5rem',
                    zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Scroll</span>
                    <div style={{ width: '1px', height: '70px', background: `linear-gradient(to bottom, ${branch.accent}, transparent)`, animation: 'scrollPulse 2s ease-in-out infinite' }} />
                </div>

                {/* Bottom image strip — secondary photo peeking */}
                <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '28vw', height: '35vh', zIndex: 2,
                    overflow: 'hidden',
                    clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    boxShadow: `-10px 0 40px rgba(0,0,0,0.5)`,
                }}>
                    <img src={branch.images[1]} alt="" style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.7)',
                    }} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${branch.accent}44, transparent)`,
                    }} />
                </div>
            </section>

            {/* ═══════════ STATS STRIP — glassmorphism ═══════════ */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '4rem clamp(2rem, 8vw, 8rem)',
                background: isDark
                    ? `linear-gradient(135deg, #111 0%, #1a1a1a 100%)`
                    : `linear-gradient(135deg, ${branch.accent}ee 0%, ${branch.accent} 100%)`,
            }}>
                {/* Decorative grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: `linear-gradient(${branch.accent}18 1px, transparent 1px), linear-gradient(90deg, ${branch.accent}18 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
                    {[
                        { label: 'Years of Excellence', val: branch.stats.years, icon: '◆' },
                        { label: 'Products', val: branch.stats.products, icon: '◈' },
                        { label: 'Happy Clients', val: branch.stats.clients, icon: '◉' },
                    ].map((s, i) => (
                        <div key={i} className="stat-item" style={{
                            textAlign: 'center',
                            padding: '1.5rem 2.5rem',
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.08)',
                            backdropFilter: 'blur(10px)',
                            border: isDark ? `1px solid rgba(255,255,255,0.08)` : `1px solid rgba(0,0,0,0.08)`,
                            borderRadius: '3px',
                            minWidth: '160px',
                        }}>
                            <div style={{ fontSize: '0.9rem', color: isDark ? branch.accent : 'rgba(0,0,0,0.4)', marginBottom: '0.5rem' }}>{s.icon}</div>
                            <div className="stat-num" data-val={s.val} style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                                fontWeight: 900,
                                color: isDark ? '#fff' : '#0a0a0a',
                                lineHeight: 1,
                            }}>0+</div>
                            <div style={{
                                textTransform: 'uppercase', letterSpacing: '0.18em',
                                fontSize: '0.65rem', fontWeight: 700,
                                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.55)',
                                marginTop: '0.5rem',
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ STORY SECTION ═══════════ */}
            <section className="story-section" style={{
                padding: 'clamp(6rem, 16vh, 14rem) clamp(2rem, 8vw, 8rem)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(3rem, 8vw, 8rem)',
                alignItems: 'center',
                maxWidth: '1600px',
                margin: '0 auto',
            }}>
                {/* Image: 3D floating frame */}
                <div className="story-img-wrap" style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                }}
                    onMouseMove={handleTilt}
                    onMouseLeave={handleTiltLeave}
                >
                    {/* Shadow layer */}
                    <div style={{
                        position: 'absolute',
                        inset: '20px -20px -20px 20px',
                        background: branch.accent,
                        opacity: 0.15,
                        borderRadius: '4px',
                        zIndex: 0,
                        transform: 'translateZ(-20px)',
                    }} />
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px', zIndex: 1 }}>
                        <img src={branch.images[1]} alt={branch.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {/* shimmer overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(135deg, ${branch.accent}22 0%, transparent 60%)`,
                            pointerEvents: 'none',
                        }} />
                    </div>
                    {/* Accent inset frame */}
                    <div style={{
                        position: 'absolute', inset: '1.2rem', zIndex: 2,
                        border: `1px solid ${branch.accent}44`,
                        borderRadius: '2px', pointerEvents: 'none',
                    }} />
                    {/* Floating badge */}
                    <div style={{
                        position: 'absolute', bottom: '-2rem', right: '-2rem',
                        background: branch.accent, padding: '2rem 2.2rem',
                        borderRadius: '4px', zIndex: 3,
                        boxShadow: `0 20px 50px ${branch.accent}55`,
                    }}>
                        <div style={{
                            fontFamily: 'var(--font-heading)', fontSize: '2.8rem',
                            fontWeight: 900, color: isDark ? '#fff' : '#0a0a0a', lineHeight: 1,
                        }}>{branch.stats.years}+</div>
                        <div style={{
                            fontSize: '0.6rem', textTransform: 'uppercase',
                            letterSpacing: '0.2em', color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)',
                            marginTop: '0.3rem',
                        }}>Years</div>
                    </div>
                </div>

                {/* Story text */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        <span style={{ width: '40px', height: '2px', background: branch.accent }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: branch.accent }}>Our Story</span>
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                        fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem', color: fg,
                    }}>
                        {branch.name.split(' ').map((word, wi) => (
                            <span key={wi} className="story-char" style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</span>
                        ))}
                    </h2>
                    <p className="story-body" style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                        lineHeight: 2, color: fgSub, marginBottom: '3rem',
                    }}>{branch.details.story}</p>

                    {/* Accent divider */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ width: '60px', height: '2px', background: branch.accent }} />
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: branch.accent }} />
                        <div style={{ width: '20px', height: '2px', background: `${branch.accent}55` }} />
                    </div>
                </div>
            </section>

            {/* ═══════════ CAPABILITIES — full-bleed alternating ═══════════ */}
            <section style={{ overflow: 'hidden' }}>
                <div style={{ padding: '0 clamp(2rem, 8vw, 8rem)', paddingTop: 'clamp(4rem, 10vh, 10rem)', marginBottom: '5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ width: '40px', height: '2px', background: branch.accent }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: branch.accent }}>Capabilities</span>
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                        fontWeight: 800, color: fg, maxWidth: '600px', lineHeight: 1.1,
                    }}>What We Do Best</h2>
                </div>

                {branch.details.capabilities.map((cap, i) => {
                    const img = branch.images[i + 2] || branch.images[i]
                    const even = i % 2 === 0
                    return (
                        <div key={i} className="cap-row" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            direction: even ? 'ltr' : 'rtl',
                            minHeight: '65vh',
                            overflow: 'hidden',
                            transformStyle: 'preserve-3d',
                        }}>
                            {/* Image side with parallax inner zoom */}
                            <div style={{ position: 'relative', overflow: 'hidden', direction: 'ltr' }}
                                onMouseEnter={e => {
                                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.08, filter: 'brightness(0.95)', duration: 0.8, ease: 'power2.out' })
                                    gsap.to(e.currentTarget.querySelector('.cap-num-overlay'), { opacity: 0.25, duration: 0.5 })
                                }}
                                onMouseLeave={e => {
                                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, filter: 'brightness(0.75)', duration: 0.7, ease: 'power2.out' })
                                    gsap.to(e.currentTarget.querySelector('.cap-num-overlay'), { opacity: 0.1, duration: 0.5 })
                                }}
                            >
                                <img src={img} alt={cap.title} style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    filter: 'brightness(0.75)', display: 'block',
                                    transition: 'none',
                                }} />
                                {/* Gradient overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: even
                                        ? `linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)`
                                        : `linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 60%)`,
                                }} />
                                {/* Giant ghost number */}
                                <div className="cap-num-overlay" style={{
                                    position: 'absolute', bottom: '-1rem', right: '1rem',
                                    fontFamily: 'var(--font-heading)', fontSize: '12rem',
                                    fontWeight: 900, color: '#fff', opacity: 0.08,
                                    lineHeight: 1, direction: 'ltr', pointerEvents: 'none',
                                    userSelect: 'none',
                                }}>0{i + 1}</div>
                                {/* Accent bar */}
                                <div style={{
                                    position: 'absolute', top: 0, [even ? 'right' : 'left']: 0,
                                    width: '4px', height: '100%', background: branch.accent,
                                }} />
                            </div>

                            {/* Text side */}
                            <div style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                padding: 'clamp(3rem, 8vw, 8rem)',
                                background: isDark
                                    ? (even ? '#0e0e0e' : '#111')
                                    : (even ? '#eeecea' : '#f5f3f0'),
                                direction: 'ltr', position: 'relative', overflow: 'hidden',
                            }}>
                                {/* BG watermark number */}
                                <div style={{
                                    position: 'absolute', top: '-2rem', right: '-1rem',
                                    fontFamily: 'var(--font-heading)', fontSize: '14rem',
                                    fontWeight: 900, color: branch.accent, opacity: 0.04,
                                    lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                                }}>0{i + 1}</div>

                                {/* Accent number label */}
                                <span style={{
                                    fontFamily: 'var(--font-heading)', fontSize: '1rem',
                                    fontWeight: 800, color: branch.accent, letterSpacing: '0.15em',
                                    marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                                }}>
                                    <span style={{ width: '24px', height: '1px', background: branch.accent, display: 'inline-block' }} />
                                    0{i + 1}
                                </span>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)', fontWeight: 800, color: fg,
                                    fontSize: 'clamp(1.7rem, 2.8vw, 2.7rem)', lineHeight: 1.15, marginBottom: '1.5rem',
                                }}>{cap.title}</h3>
                                <p style={{
                                    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.9,
                                    color: fgSub, maxWidth: '480px',
                                }}>{cap.desc}</p>
                                {/* Bottom accent line */}
                                <div style={{ marginTop: '3rem', display: 'flex', gap: '0.4rem' }}>
                                    <div style={{ width: '50px', height: '2px', background: branch.accent }} />
                                    <div style={{ width: '12px', height: '2px', background: `${branch.accent}55` }} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>

            {/* ═══════════ MARQUEE STRIP ═══════════ */}
            <section style={{ padding: '10vh 0', overflow: 'hidden', background: isDark ? '#060606' : '#e9e7e4', position: 'relative' }}>
                {/* Decorative diagonal lines */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: `repeating-linear-gradient(45deg, ${branch.accent}08 0px, ${branch.accent}08 1px, transparent 1px, transparent 30px)`,
                }} />
                <div style={{ textAlign: 'center', marginBottom: '5vh', padding: '0 clamp(2rem, 6vw, 6rem)', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
                        <span style={{ width: '30px', height: '1.5px', background: branch.accent, display: 'block' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.68rem', fontWeight: 700, color: branch.accent }}>Product Portfolio</span>
                        <span style={{ width: '30px', height: '1.5px', background: branch.accent, display: 'block' }} />
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 800, color: fg,
                    }}>What We Deliver</h2>
                </div>
                <Marquee3D items={branch.details.products} speed={1} accent={branch.accent} />
                <Marquee3D items={[...branch.details.products].reverse()} speed={1.4} reverse={true} accent={branch.accent} />
            </section>

            {/* ═══════════ PHOTO GALLERY ═══════════ */}
            <section ref={gallerySectionRef} className="mobile-responsive-gallery" style={{ overflow: 'hidden', background: isDark ? '#080808' : '#fafafa', position: 'relative' }}>
                <style>{`
                    .mobile-responsive-gallery {
                        height: 100vh;
                        width: 100%;
                    }
                    @media (max-width: 768px) {
                        .mobile-responsive-gallery {
                            height: 70vh !important;
                        }
                    }
                `}</style>
                <div style={{
                    position: 'absolute',
                    top: '10vh', left: '8vw',
                    zIndex: 10,
                    pointerEvents: 'none',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ width: '40px', height: '2px', background: branch.accent }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: branch.accent }}>From The Floor</span>
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 800, color: fg
                    }}></h2>
                </div>

                <div
                    ref={galleryWrapperRef}
                    className="horizontal-scroll-wrapper"
                    style={{
                        display: 'flex',
                        height: '100%', 
                        willChange: 'transform',
                    }}
                >
                    {branch.images.map((img, i) => (
                        <div
                            key={i}
                            ref={(el) => galleryPanelsRef.current[i] = el}
                            className="horizontal-panel"
                            style={{
                                width: '100vw',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${i + 1}`}
                                className="gallery-img"
                                style={{
                                    width: '100%', 
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    transform: 'scale(1.25)', // buffer for parallax tracking bounds
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)`,
                                pointerEvents: 'none',
                            }} />
                            {/* Index badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '2.5rem',
                                left: '2.5rem',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                fontWeight: 900,
                                color: '#fff',
                                opacity: 0.9,
                                lineHeight: 1,
                                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                pointerEvents: 'none',
                            }}>
                                {String(i + 1).padStart(2, '0')}
                                <span style={{ fontSize: '0.4em', color: branch.accent, opacity: 0.8 }}> / {String(branch.images.length).padStart(2, '0')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ CTA — immersive full-bleed ═══════════ */}
            <section style={{ position: 'relative', padding: 'clamp(6rem, 20vh, 18rem) clamp(2rem, 8vw, 8rem)', overflow: 'hidden', textAlign: 'center' }}>
                {/* BG image */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${branch.images[branch.images.length - 1]})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.2)',
                }} />
                {/* Color overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, ${branch.accent}55 0%, rgba(0,0,0,0.65) 100%)`,
                }} />
                {/* Glare orb */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    width: '60vw', height: '60vw', borderRadius: '50%',
                    background: `radial-gradient(circle, ${branch.accent}33 0%, transparent 65%)`,
                    filter: 'blur(40px)', pointerEvents: 'none',
                }} />

                <div className="cta-content" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <span style={{ width: '30px', height: '1.5px', background: branch.accent, display: 'block' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.68rem', fontWeight: 700, color: branch.accent }}>Let's Connect</span>
                        <span style={{ width: '30px', height: '1.5px', background: branch.accent, display: 'block' }} />
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                        fontWeight: 900, color: '#fff', lineHeight: 0.95,
                        letterSpacing: '-0.03em', marginBottom: '2rem',
                    }}>
                        Partner with<br />
                        <span style={{ color: branch.accent }}>{branch.name.split(' ')[0]}</span>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.6)',
                        maxWidth: '480px', margin: '0 auto 3.5rem', lineHeight: 1.75,
                    }}>{branch.description}</p>
                    <button
                        onClick={() => { navigate('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }, 500) }}
                        style={{
                            background: 'transparent',
                            color: '#fff',
                            padding: '1.2rem 3.5rem',
                            fontSize: '0.9rem', fontWeight: 700,
                            letterSpacing: '0.15em', textTransform: 'uppercase',
                            border: `1.5px solid ${branch.accent}`,
                            cursor: 'pointer', borderRadius: '2px',
                            position: 'relative', overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            gsap.to(e.currentTarget, { background: branch.accent, color: isDark ? '#fff' : '#0a0a0a', duration: 0.35, ease: 'power2.out' })
                            gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3 })
                        }}
                        onMouseLeave={e => {
                            gsap.to(e.currentTarget, { background: 'transparent', color: '#fff', duration: 0.35, ease: 'power2.out' })
                            gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
                        }}
                    >
                        Get in Touch
                    </button>
                </div>
            </section>

            <Footer />

            <style>{`
                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.4; transform: scaleY(1); }
                    50% { opacity: 1; transform: scaleY(1.2); }
                }
                /* Hide scrollbar for mobile gallery */
                .gallery-mobile div::-webkit-scrollbar { display: none; }

                /* Desktop: show mosaic, hide mobile scroll */
                .gallery-desktop { display: block; }
                .gallery-mobile  { display: none; }

                @media (max-width: 800px) {
                    .story-section { grid-template-columns: 1fr !important; }
                    .cap-row { grid-template-columns: 1fr !important; direction: ltr !important; min-height: unset !important; }
                    .gallery-desktop { display: none; }
                    .gallery-mobile  { display: block; }
                    /* fix hero clipped secondary img on mobile */
                    .hero-secondary-img { display: none !important; }
                }
            `}</style>
        </div>
    )
}
