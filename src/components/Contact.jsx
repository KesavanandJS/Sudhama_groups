import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Contact() {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const formRef = useRef(null)
    const fieldsRef = useRef([])
    const formCardRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 3D Heading
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60, rotateX: -15, transformPerspective: 800 },
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

            // 3D form card entrance
            gsap.fromTo(formCardRef.current,
                { opacity: 0, y: 60, rotateY: -8, transformPerspective: 1000 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 1.2,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 80%',
                    },
                    ease: 'power3.out',
                }
            )

            // Fields stagger with 3D flip
            fieldsRef.current.forEach((field, i) => {
                if (!field) return
                gsap.fromTo(field,
                    { opacity: 0, y: 40, rotateX: -20, transformPerspective: 600 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.8,
                        delay: 0.3 + i * 0.12,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 80%',
                        },
                        ease: 'power3.out',
                    }
                )
            })

            // 3D tilt on the form card on mouse move
            const card = formCardRef.current
            if (card) {
                const handleMouseMove = (e) => {
                    const rect = card.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    gsap.to(card, {
                        rotateY: x * 5,
                        rotateX: -y * 5,
                        duration: 0.4,
                        ease: 'power2.out',
                    })
                }
                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)',
                    })
                }
                card.addEventListener('mousemove', handleMouseMove)
                card.addEventListener('mouseleave', handleMouseLeave)
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const btn = e.target.querySelector('button')
        // 3D flip button animation on submit
        gsap.to(btn, {
            rotateX: 360,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(btn, { rotateX: 0 })
                setSubmitted(true)
                setTimeout(() => setSubmitted(false), 3000)
            },
        })
    }

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section-full"
            style={{
                background: 'linear-gradient(180deg, var(--color-white) 0%, #f5f9f5 100%)',
                flexDirection: 'column',
                padding: '10vh 8vw',
                justifyContent: 'center',
                perspective: '1200px',
            }}
        >
            <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
                {/* Heading */}
                <div ref={headingRef} style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    opacity: 0,
                    transformStyle: 'preserve-3d',
                }}>
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
                            Get In Touch
                        </span>
                        <span className="accent-line" />
                    </div>
                    <h2 className="text-headline" style={{ color: 'var(--color-dark)' }}>
                        Let's Create<br />
                        <span style={{ color: 'var(--color-green)' }}>Something Together</span>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--color-text-light)',
                        marginTop: '1rem',
                        lineHeight: 1.7,
                    }}>
                        Have an inquiry about our textiles? We'd love to hear from you.
                    </p>
                </div>

                {/* 3D Form Card */}
                <div
                    ref={formCardRef}
                    style={{
                        transformStyle: 'preserve-3d',
                        opacity: 0,
                        padding: '3rem',
                        background: 'var(--color-white)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.06)',
                        borderRadius: '4px',
                    }}
                >
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div
                            ref={(el) => fieldsRef.current[0] = el}
                            style={{ marginBottom: '2.5rem', opacity: 0, transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                        >
                            <label style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: 'var(--color-text-light)',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div
                            ref={(el) => fieldsRef.current[1] = el}
                            style={{ marginBottom: '2.5rem', opacity: 0, transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }}
                        >
                            <label style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: 'var(--color-text-light)',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div
                            ref={(el) => fieldsRef.current[2] = el}
                            style={{ marginBottom: '2.5rem', opacity: 0, transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
                        >
                            <label style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: 'var(--color-text-light)',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                className="form-input"
                                placeholder="What is this regarding?"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div
                            ref={(el) => fieldsRef.current[3] = el}
                            style={{ marginBottom: '3rem', opacity: 0, transform: 'translateZ(8px)', transformStyle: 'preserve-3d' }}
                        >
                            <label style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                color: 'var(--color-text-light)',
                                display: 'block',
                                marginBottom: '0.5rem',
                            }}>
                                Message
                            </label>
                            <textarea
                                name="message"
                                className="form-input form-textarea"
                                placeholder="Tell us about your requirements..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div
                            ref={(el) => fieldsRef.current[4] = el}
                            style={{
                                textAlign: 'center',
                                opacity: 0,
                                transform: 'translateZ(20px)',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    perspective: '400px',
                                }}
                            >
                                {submitted ? '✓ Message Sent!' : 'Send Message'}
                                {!submitted && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
