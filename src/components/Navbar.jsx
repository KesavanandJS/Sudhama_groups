import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Branches', href: '#menaka' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const navRef = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(true)
            return
        }

        const trigger = ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => {
                setIsScrolled(self.progress > 0)
            },
        })

        return () => trigger.kill()
    }, [isHomePage])

    useEffect(() => {
        // Animate nav in
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
        )
    }, [])

    const handleNavClick = (href, e) => {
        e.preventDefault()
        setMenuOpen(false)

        if (isHomePage) {
            const el = document.querySelector(href)
            if (el) {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: el, offsetY: 0 },
                    ease: 'power3.inOut',
                })
            }
        } else {
            // Navigate to home and scroll to section after mount
            navigate(`/${href}`)
        }
    }

    return (
        <nav
            ref={navRef}
            className={`nav-fixed ${isScrolled ? 'nav-solid' : 'nav-transparent'}`}
            style={{ opacity: 0 }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 4rem',
                maxWidth: '1600px',
                margin: '0 auto',
            }}>
                {/* Logo / Back Button */}
                {!isHomePage && (
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginRight: '1rem',
                            zIndex: 1001,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                    </Link>
                )}

                <Link
                    to="/"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: isScrolled ? 'var(--color-dark)' : 'var(--color-white)',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.3s ease',
                        zIndex: 1001,
                    }}
                >
                    SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
                </Link>

                {/* Desktop Nav (Only fully visible on home, hidden on detail config options) */}
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                }}
                    className="desktop-nav"
                >
                    {isHomePage ? navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(link.href, e)}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: isScrolled ? 'var(--color-text)' : 'var(--color-white)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                transition: 'color 0.3s ease, opacity 0.3s ease',
                                opacity: 0.85,
                            }}
                            onMouseEnter={(e) => { e.target.style.opacity = 1; e.target.style.color = 'var(--color-green)' }}
                            onMouseLeave={(e) => {
                                e.target.style.opacity = 0.85
                                e.target.style.color = isScrolled ? 'var(--color-text)' : 'var(--color-white)'
                            }}
                        >
                            {link.label}
                        </a>
                    )) : (
                        <Link
                            to="/"
                            className="btn-primary"
                            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                        >
                            Return Home
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger */}
                {isHomePage && (
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 1001,
                            padding: '0.5rem',
                        }}
                        aria-label="Toggle menu"
                    >
                        <div style={{
                            width: '28px',
                            height: '2px',
                            background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)',
                            transition: 'all 0.3s ease',
                            transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                            marginBottom: menuOpen ? '0' : '8px',
                        }} />
                        <div style={{
                            width: '28px',
                            height: '2px',
                            background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)',
                            transition: 'all 0.3s ease',
                            opacity: menuOpen ? 0 : 1,
                            marginBottom: menuOpen ? '0' : '8px',
                        }} />
                        <div style={{
                            width: '20px',
                            height: '2px',
                            background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)',
                            transition: 'all 0.3s ease',
                            transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                        }} />
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {isHomePage && (
                <div
                    className="mobile-menu"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(20px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1000,
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(link.href, e)}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: 'var(--color-dark)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .nav-fixed > div { padding: 1rem 1.5rem !important; }
        }
      `}</style>
        </nav>
    )
}

