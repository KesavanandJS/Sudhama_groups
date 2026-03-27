import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Marquee3D({ items = [], reverse = false, speed = 1, accent = 'var(--color-green)' }) {
    const containerRef = useRef(null)
    const trackRef = useRef(null)

    useEffect(() => {
        if (!trackRef.current) return

        const track = trackRef.current
        const itemWidth = track.firstElementChild?.offsetWidth || 300
        const totalWidth = itemWidth * items.length

        // Base speed calculation
        const duration = (totalWidth / 100) * (2 / speed)

        // Setup infinite scroll animation
        const tl = gsap.to(track, {
            x: reverse ? totalWidth : -totalWidth,
            duration: duration,
            ease: 'none',
            repeat: -1,
        })

        // Add 3D perspective to container on mouse movement
        const container = containerRef.current
        if (container) {
            const handleMouseMove = (e) => {
                const rect = container.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5

                gsap.to(track, {
                    rotateY: x * 10,
                    rotateX: -y * 10,
                    duration: 0.5,
                    ease: 'power2.out',
                })
            }

            const handleMouseLeave = () => {
                gsap.to(track, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)',
                })
            }

            container.addEventListener('mousemove', handleMouseMove)
            container.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                tl.kill()
                container.removeEventListener('mousemove', handleMouseMove)
                container.removeEventListener('mouseleave', handleMouseLeave)
            }
        }

        return () => tl.kill()
    }, [items, reverse, speed])

    // Duplicate items for seamless loop
    const displayItems = [...items, ...items, ...items, ...items]

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                overflow: 'hidden',
                padding: '2rem 0',
                perspective: '1000px',
                position: 'relative',
            }}
        >
            <div
                ref={trackRef}
                style={{
                    display: 'flex',
                    gap: '3rem',
                    width: 'max-content',
                    transformStyle: 'preserve-3d',
                    cursor: 'default',
                    // Start offset based on direction to prevent pop-in
                    transform: reverse ? 'translateX(-33.33%)' : 'translateX(0)',
                }}
            >
                {displayItems.map((item, i) => (
                    <div
                        key={i}
                        className="marquee-item"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            color: 'transparent',
                            WebkitTextStroke: `2px ${accent}`,
                            whiteSpace: 'nowrap',
                            padding: '1rem 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3rem',
                            transform: 'translateZ(0)',
                            transition: 'all 0.4s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = accent
                            e.currentTarget.style.transform = 'translateZ(50px) scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'transparent'
                            e.currentTarget.style.transform = 'translateZ(0) scale(1)'
                        }}
                    >
                        <span>{item}</span>
                        <span style={{
                            color: accent,
                            fontSize: '0.5em',
                            WebkitTextStroke: '0px',
                        }}>✦</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
