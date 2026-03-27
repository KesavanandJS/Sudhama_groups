import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageTransition({ isVisible }) {
    const overlayRef = useRef(null)
    const logoRef = useRef(null)

    useEffect(() => {
        if (!overlayRef.current) return

        if (isVisible) {
            // Transition IN (Cover the screen)
            gsap.to(overlayRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.8,
                ease: 'power4.inOut',
            })

            // Spin logo
            gsap.fromTo(logoRef.current,
                { rotateY: -90, opacity: 0, scale: 0.5 },
                { rotateY: 0, opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: 'back.out(1.5)' }
            )
        } else {
            // Transition OUT (Reveal new page)
            // First spin logo out
            gsap.to(logoRef.current, {
                rotateY: 90,
                opacity: 0,
                scale: 0.5,
                duration: 0.4,
                ease: 'power2.in',
            })

            // Then slide overlay up
            gsap.to(overlayRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 0.8,
                delay: 0.3,
                ease: 'power4.inOut',
            })

            // Reset clip path to bottom for next transition after it finishes
            setTimeout(() => {
                if (overlayRef.current) {
                    gsap.set(overlayRef.current, {
                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
                    })
                }
            }, 1200)
        }
    }, [isVisible])

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'var(--color-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                pointerEvents: isVisible ? 'auto' : 'none',
            }}
        >
            <div
                ref={logoRef}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    transformStyle: 'preserve-3d',
                    opacity: 0,
                }}
            >
                SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
            </div>
        </div>
    )
}
