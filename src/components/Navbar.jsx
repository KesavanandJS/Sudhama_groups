import { useEffect, useRef, useState } from 'react'
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

    useEffect(() => {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => {
                setIsScrolled(self.progress > 0)
            },
        })

        // Animate nav in
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
        )
    }, [])

    const scrollTo = (href) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: el, offsetY: 0 },
                ease: 'power3.inOut',
            })
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
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
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
                </a>

                {/* Desktop Nav */}
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
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
                    ))}
                </div>

                {/* Mobile Hamburger */}
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
            </div>

            {/* Mobile Menu */}
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
                        onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
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
