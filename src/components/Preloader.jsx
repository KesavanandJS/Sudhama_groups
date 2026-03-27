import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
    const loaderRef = useRef(null)
    const progressRef = useRef(null)
    const percentRef = useRef(null)
    const logoRef = useRef(null)
    const linesRef = useRef([])
    const spinnerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Exit animation
                    const exitTl = gsap.timeline({
                        onComplete: () => onComplete?.(),
                    })

                    exitTl
                        .to(linesRef.current, {
                            opacity: 0,
                            y: -20,
                            stagger: 0.05,
                            duration: 0.4,
                            ease: 'power2.in',
                        })
                        .to(percentRef.current, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in',
                        }, '-=0.3')
                        .to(progressRef.current, {
                            opacity: 0,
                            duration: 0.3,
                        }, '-=0.2')
                        .to(loaderRef.current, {
                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                            duration: 1,
                            ease: 'power4.inOut',
                        }, '-=0.1')
                },
            })

            // Spinning 3D cube animation
            gsap.to(spinnerRef.current, {
                rotateX: 360,
                rotateY: 360,
                duration: 3,
                repeat: -1,
                ease: 'none',
            })

            // Logo 3D entrance
            tl.fromTo(logoRef.current,
                {
                    opacity: 0,
                    rotateX: -90,
                    z: -200,
                    transformPerspective: 800,
                },
                {
                    opacity: 1,
                    rotateX: 0,
                    z: 0,
                    duration: 1,
                    ease: 'power3.out',
                }
            )

                // Text lines stagger in with 3D flip
                .fromTo(linesRef.current,
                    {
                        opacity: 0,
                        rotateY: 90,
                        transformOrigin: 'left center',
                        transformPerspective: 600,
                    },
                    {
                        opacity: 1,
                        rotateY: 0,
                        stagger: 0.12,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                )

                // Progress bar
                .fromTo(progressRef.current?.querySelector('.progress-fill'),
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 2,
                        ease: 'power2.inOut',
                    },
                    '-=0.5'
                )

                // Count up percentage
                .fromTo(percentRef.current,
                    { textContent: 0 },
                    {
                        textContent: 100,
                        duration: 2,
                        ease: 'power2.inOut',
                        snap: { textContent: 1 },
                        onUpdate: function () {
                            if (percentRef.current) {
                                percentRef.current.textContent = Math.round(gsap.getProperty(percentRef.current, 'textContent')) + '%'
                            }
                        },
                    },
                    '<'
                )

        }, loaderRef)

        return () => ctx.revert()
    }, [onComplete])

    return (
        <div
            ref={loaderRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
        >
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
          radial-gradient(circle at 30% 40%, rgba(46,125,50,0.12) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(249,168,37,0.08) 0%, transparent 50%)
        `,
                pointerEvents: 'none',
            }} />

            {/* 3D Spinning cube */}
            <div
                ref={spinnerRef}
                style={{
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                    top: '15%',
                    right: '20%',
                    transformStyle: 'preserve-3d',
                    opacity: 0.15,
                }}
            >
                {[
                    { transform: 'translateZ(20px)', bg: 'var(--color-green)' },
                    { transform: 'rotateY(180deg) translateZ(20px)', bg: 'var(--color-yellow)' },
                    { transform: 'rotateY(90deg) translateZ(20px)', bg: 'var(--color-green)' },
                    { transform: 'rotateY(-90deg) translateZ(20px)', bg: 'var(--color-yellow)' },
                    { transform: 'rotateX(90deg) translateZ(20px)', bg: 'var(--color-green)' },
                    { transform: 'rotateX(-90deg) translateZ(20px)', bg: 'var(--color-yellow)' },
                ].map((face, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '40px',
                            height: '40px',
                            background: face.bg,
                            opacity: 0.6,
                            transform: face.transform,
                            backfaceVisibility: 'hidden',
                        }}
                    />
                ))}
            </div>

            {/* Logo */}
            <div
                ref={logoRef}
                style={{
                    marginBottom: '2rem',
                    opacity: 0,
                    transformStyle: 'preserve-3d',
                }}
            >
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                }}>
                    SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
                </h1>
            </div>

            {/* Loading text lines */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                {['Menaka Textiles', 'Sudhama Hosieries', 'G P Textiles'].map((text, i) => (
                    <p
                        key={i}
                        ref={(el) => linesRef.current[i] = el}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.3)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginBottom: '0.4rem',
                            opacity: 0,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {text}
                    </p>
                ))}
            </div>

            {/* Progress bar */}
            <div
                ref={progressRef}
                style={{
                    width: 'min(300px, 60vw)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <div style={{
                    width: '100%',
                    height: '2px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '1px',
                    overflow: 'hidden',
                }}>
                    <div
                        className="progress-fill"
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--color-green), var(--color-yellow))',
                            transformOrigin: 'left',
                            transform: 'scaleX(0)',
                        }}
                    />
                </div>
                <span
                    ref={percentRef}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.1em',
                    }}
                >
                    0%
                </span>
            </div>
        </div>
    )
}
