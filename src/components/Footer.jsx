import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
    const footerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(footerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 95%',
                    },
                    ease: 'power3.out',
                }
            )
        }, footerRef)

        return () => ctx.revert()
    }, [])

    return (
        <footer
            ref={footerRef}
            style={{
                background: 'var(--color-dark)',
                padding: '4rem 8vw',
                opacity: 0,
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '3rem',
            }}>
                {/* Brand */}
                <div style={{ maxWidth: '350px' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: 'var(--color-white)',
                        marginBottom: '1rem',
                    }}>
                        SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.4)',
                        lineHeight: 1.7,
                    }}>
                        Three brands united by a single vision — delivering the finest textiles with integrity, innovation, and excellence.
                    </p>
                </div>

                {/* Brands */}
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--color-green)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '1.25rem',
                    }}>
                        Our Brands
                    </h4>
                    {['Menaka Textiles', 'Sudhama Hosieries', 'G P Textiles'].map((brand) => (
                        <p key={brand} style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'rgba(255,255,255,0.5)',
                            marginBottom: '0.6rem',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-white)'}
                            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            {brand}
                        </p>
                    ))}
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--color-yellow)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: '1.25rem',
                    }}>
                        Contact
                    </h4>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.8,
                    }}>
                        Tirupur, Tamil Nadu, India<br />
                        info@sudhamagroups.com<br />
                        +91 98765 43210
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                marginTop: '3rem',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.3)',
                }}>
                    © {new Date().getFullYear()} Sudhama Groups. All rights reserved.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                }}>
                    {['Privacy', 'Terms', 'Sitemap'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.3)',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--color-white)'}
                            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.3)'}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}
