import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function BranchSection({ branch, index }) {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const nameRef = useRef(null)
    const taglineRef = useRef(null)
    const descRef = useRef(null)
    const statsRef = useRef(null)
    const overlayRef = useRef(null)
    const numberRef = useRef(null)
    const orbRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the section
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=50%',
                pin: true,
                pinSpacing: true,
            })

            // 3D Orb rotation
            if (orbRef.current) {
                gsap.fromTo(orbRef.current,
                    { opacity: 0, scale: 0.3 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                        },
                        ease: 'power3.out',
                    }
                )
                gsap.to(orbRef.current, {
                    rotateY: 360,
                    rotateX: 180,
                    duration: 20,
                    repeat: -1,
                    ease: 'none',
                })
            }

            // Overlay reveal
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            )

            // Large index number - 3D scale-in
            gsap.fromTo(numberRef.current,
                { opacity: 0, scale: 0.3, rotateY: -90, transformPerspective: 1000 },
                {
                    opacity: 0.08,
                    scale: 1,
                    rotateY: 0,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                    },
                    ease: 'power3.out',
                }
            )

            // Name 3D slide in
            gsap.fromTo(nameRef.current,
                { opacity: 0, x: -120, rotateY: 25, transformPerspective: 800 },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                    },
                    ease: 'power3.out',
                }
            )

            // Tagline with 3D pop
            gsap.fromTo(taglineRef.current,
                { opacity: 0, y: 40, z: -80, transformPerspective: 600 },
                {
                    opacity: 1,
                    y: 0,
                    z: 0,
                    duration: 1,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                    },
                    ease: 'power3.out',
                }
            )

            // Description with 3D
            gsap.fromTo(descRef.current,
                { opacity: 0, y: 30, rotateX: -10, transformPerspective: 600 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                    },
                    ease: 'power3.out',
                }
            )

            // Stats with 3D flip-in
            const statEls = statsRef.current?.querySelectorAll('.stat-item')
            statEls?.forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, rotateY: 90, transformPerspective: 800 },
                    {
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.8,
                        delay: 0.6 + i * 0.15,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 50%',
                        },
                        ease: 'power3.out',
                    }
                )
            })

            // Stats counter animation
            const numEls = statsRef.current?.querySelectorAll('.stat-number')
            numEls?.forEach((el) => {
                const target = parseInt(el.dataset.value)
                gsap.fromTo(el,
                    { textContent: 0 },
                    {
                        textContent: target,
                        duration: 2,
                        delay: 0.7,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 50%',
                        },
                        snap: { textContent: 1 },
                    }
                )
            })

            // 3D parallax on scroll within pinned area
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=50%',
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress
                    if (contentRef.current) {
                        gsap.set(contentRef.current, {
                            rotateX: p * 3,
                            y: p * -30,
                            transformPerspective: 1200,
                        })
                    }
                    if (numberRef.current) {
                        gsap.set(numberRef.current, {
                            rotateY: p * 15,
                            x: p * 50,
                        })
                    }
                },
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const isEven = index % 2 === 0

    return (
        <section
            ref={sectionRef}
            id={branch.id}
            className="section-full"
            style={{
                background: branch.bgGradient,
                position: 'relative',
                overflow: 'hidden',
                perspective: '1200px',
            }}
        >
            {/* Background pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)
        `,
                pointerEvents: 'none',
            }} />

            {/* 3D Orb decoration */}
            <div
                ref={orbRef}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: isEven ? '10%' : 'auto',
                    left: isEven ? 'auto' : '10%',
                    width: 'clamp(100px, 15vw, 200px)',
                    height: 'clamp(100px, 15vw, 200px)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transformStyle: 'preserve-3d',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    position: 'absolute',
                    inset: '10%',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transform: 'rotateX(60deg)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '20%',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transform: 'rotateY(60deg)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '30%',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    transform: 'rotateX(45deg) rotateY(45deg)',
                }} />
            </div>

            {/* Large background number */}
            <div
                ref={numberRef}
                style={{
                    position: 'absolute',
                    right: isEven ? '5%' : 'auto',
                    left: isEven ? 'auto' : '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(15rem, 30vw, 35rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    opacity: 0,
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    transformStyle: 'preserve-3d',
                }}
            >
                0{index + 1}
            </div>

            {/* Content overlay */}
            <div
                ref={overlayRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.15)',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* Content */}
            <div
                ref={contentRef}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 8vw',
                    maxWidth: '900px',
                    width: '100%',
                    alignSelf: isEven ? 'flex-start' : 'flex-end',
                    textAlign: isEven ? 'left' : 'right',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Accent line */}
                <div style={{
                    width: '60px',
                    height: '3px',
                    background: branch.accent === '#F9A825' ? 'var(--color-yellow)' : 'rgba(255,255,255,0.5)',
                    marginBottom: '2rem',
                    marginLeft: isEven ? 0 : 'auto',
                }} />

                <h2
                    ref={nameRef}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.05,
                        marginBottom: '1rem',
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {branch.name}
                </h2>

                <p
                    ref={taglineRef}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.7)',
                        marginBottom: '1.5rem',
                        fontStyle: 'italic',
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {branch.tagline}
                </p>

                <p
                    ref={descRef}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.8,
                        maxWidth: '550px',
                        marginLeft: isEven ? 0 : 'auto',
                        marginBottom: '3rem',
                        opacity: 0,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {branch.description}
                </p>

                {/* Stats with 3D flip */}
                <div
                    ref={statsRef}
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        justifyContent: isEven ? 'flex-start' : 'flex-end',
                        flexWrap: 'wrap',
                        marginBottom: '3rem',
                    }}
                >
                    {[
                        { value: branch.stats.years, label: 'Years' },
                        { value: branch.stats.products, label: 'Products' },
                        { value: branch.stats.clients, label: 'Clients' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-item"
                            style={{
                                textAlign: isEven ? 'left' : 'right',
                                transformStyle: 'preserve-3d',
                                opacity: 0,
                            }}
                        >
                            <div
                                className="stat-number"
                                data-value={stat.value}
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1,
                                }}
                            >
                                0
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                marginTop: '0.5rem',
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explore Button */}
                <div style={{
                    transformStyle: 'preserve-3d',
                    opacity: 1,
                }}>
                    <button
                        onClick={() => navigate(branch.route)}
                        className="btn-primary"
                        style={{
                            background: branch.accent === '#F9A825' ? 'var(--color-yellow)' : 'var(--color-green)',
                            color: branch.accent === '#F9A825' ? 'var(--color-dark)' : 'var(--color-white)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        Explore Complete Details
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
