import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const brands = [
    { label: 'Menaka Textiles', slug: '/menaka-textiles' },
    { label: 'Sudhama Hosieries', slug: '/sudhama-hosieries' },
    { label: 'G P Textiles', slug: '/gp-textiles' },
]

const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
    { label: 'Capacity', href: null, route: '/capacity' },
    { label: 'Achievements', href: null, route: '/achievements' },
]

export default function Footer() {
    const footerRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

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

    const handleQuickLink = (e, href) => {
        e.preventDefault()
        if (isHomePage) {
            const el = document.querySelector(href)
            if (el) {
                gsap.to(window, { duration: 1.2, scrollTo: { y: el, offsetY: 0 }, ease: 'power3.inOut' })
            }
        } else {
            navigate('/', { state: { scrollTo: href } })
        }
    }

    const linkStyle = {
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.5)',
        display: 'block',
        marginBottom: '0.6rem',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        textDecoration: 'none',
    }

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
                <div style={{ maxWidth: '320px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            color: 'var(--color-white)',
                            marginBottom: '1rem',
                        }}>
                            SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
                        </h3>
                    </Link>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.4)',
                        lineHeight: 1.7,
                    }}>
                        Three brands united by a single vision — delivering the finest textiles with integrity, innovation, and excellence.
                    </p>
                </div>

                {/* Our Brands */}
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
                    {brands.map((brand) => (
                        <Link
                            key={brand.label}
                            to={brand.slug}
                            style={linkStyle}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            {brand.label}
                        </Link>
                    ))}
                </div>

                {/* Quick Links */}
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
                        Quick Links
                    </h4>
                    {quickLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={linkStyle}
                            onClick={(e) => handleQuickLink(e, link.href)}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            {link.label}
                        </a>
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
                maxWidth: '1400px',
                margin: '3rem auto 0',
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
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {['Privacy', 'Terms', 'Sitemap'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.3)',
                                transition: 'color 0.3s ease',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

