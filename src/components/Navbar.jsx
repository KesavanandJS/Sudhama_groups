import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
]

const branchLinks = [
    { label: 'Menaka Textiles', route: '/menaka-textiles', accent: '#2E7D32' },
    { label: 'Sudhama Hosieries', route: '/sudhama-hosieries', accent: '#F9A825' },
    { label: 'G P Textiles', route: '/gp-textiles', accent: '#C62828' },
]

export default function Navbar() {
    const navRef = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownTimer = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const isHomePage = location.pathname === '/'
    const isSpecialPage = location.pathname === '/capacity' || location.pathname === '/achievements'

    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(true)
            return
        }
        const trigger = ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => setIsScrolled(self.progress > 0),
        })
        return () => trigger.kill()
    }, [isHomePage])

    useEffect(() => {
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
                gsap.to(window, { duration: 1.2, scrollTo: { y: el, offsetY: 0 }, ease: 'power3.inOut' })
            }
        } else {
            navigate('/', { state: { scrollTo: href } })
        }
    }

    const handleDropdownEnter = () => {
        clearTimeout(dropdownTimer.current)
        setDropdownOpen(true)
    }

    const handleDropdownLeave = () => {
        dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150)
    }

    const textColor = isScrolled ? 'var(--color-text)' : 'var(--color-white)'

    return (
        <nav ref={navRef} className={`nav-fixed ${isScrolled ? 'nav-solid' : 'nav-transparent'}`} style={{ opacity: 0 }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.25rem 4rem', maxWidth: '1600px', margin: '0 auto',
            }}>
                {/* Back button on branch/inner pages */}
                {!isHomePage && (
                    <Link to="/" style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600,
                        color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.1em',
                        marginRight: '1rem', zIndex: 1001, textDecoration: 'none',
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                    </Link>
                )}

                {/* Logo */}
                <Link to="/" style={{
                    fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800,
                    color: isScrolled ? 'var(--color-dark)' : 'var(--color-white)',
                    letterSpacing: '-0.02em', transition: 'color 0.3s ease', zIndex: 1001, textDecoration: 'none',
                }}>
                    SUDHAMA<span style={{ color: 'var(--color-green)', fontWeight: 400 }}> GROUPS</span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
                    {isHomePage ? (
                        <>
                            {navLinks.map((link) => (
                                <a key={link.label} href={link.href}
                                    onClick={(e) => handleNavClick(link.href, e)}
                                    style={{
                                        fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                                        color: textColor, textTransform: 'uppercase', letterSpacing: '0.1em',
                                        transition: 'color 0.3s ease, opacity 0.3s ease', opacity: 0.85,
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = 'var(--color-green)' }}
                                    onMouseLeave={e => { e.target.style.opacity = 0.85; e.target.style.color = textColor }}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Branches dropdown */}
                            <div
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                                style={{ position: 'relative' }}
                            >
                                <button style={{
                                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                                    color: textColor, textTransform: 'uppercase', letterSpacing: '0.1em',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                                    opacity: dropdownOpen ? 1 : 0.85,
                                    transition: 'color 0.3s ease',
                                    padding: 0,
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-green)' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = textColor }}
                                >
                                    Branches
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                {/* Dropdown panel */}
                                <div style={{
                                    position: 'absolute', top: 'calc(100% + 1rem)', left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: '#fff',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                    minWidth: '220px',
                                    padding: '0.5rem 0',
                                    opacity: dropdownOpen ? 1 : 0,
                                    pointerEvents: dropdownOpen ? 'all' : 'none',
                                    transform: `translateX(-50%) translateY(${dropdownOpen ? '0' : '-8px'})`,
                                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                                    zIndex: 2000,
                                }}>
                                    {/* Arrow */}
                                    <div style={{
                                        position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                                        width: 0, height: 0,
                                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                                        borderBottom: '6px solid #fff',
                                    }} />
                                    {branchLinks.map((b) => (
                                        <Link key={b.route} to={b.route}
                                            onClick={() => setDropdownOpen(false)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                padding: '0.8rem 1.25rem',
                                                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                                                color: '#333', textDecoration: 'none',
                                                transition: 'background 0.2s ease, color 0.2s ease',
                                                borderLeft: '3px solid transparent',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = '#f8f8f8'
                                                e.currentTarget.style.borderLeftColor = b.accent
                                                e.currentTarget.style.color = b.accent
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'transparent'
                                                e.currentTarget.style.borderLeftColor = 'transparent'
                                                e.currentTarget.style.color = '#333'
                                            }}
                                        >
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                                            {b.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link to="/capacity" style={{
                                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                                color: textColor, textTransform: 'uppercase', letterSpacing: '0.1em',
                                opacity: 0.85, transition: 'color 0.3s ease, opacity 0.3s ease',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--color-green)' }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = 0.85; e.currentTarget.style.color = textColor }}
                            >
                                Capacity
                            </Link>

                            <Link to="/achievements" style={{
                                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                                color: textColor, textTransform: 'uppercase', letterSpacing: '0.1em',
                                opacity: 0.85, transition: 'color 0.3s ease, opacity 0.3s ease',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = 'var(--color-yellow)' }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = 0.85; e.currentTarget.style.color = textColor }}
                            >
                                Achievements
                            </Link>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link to="/capacity" style={{
                                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                                color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#2E7D32'}
                                onMouseLeave={e => e.currentTarget.style.color = '#666'}
                            >
                                Capacity
                            </Link>
                            <Link to="/achievements" style={{
                                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                                color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em',
                                textDecoration: 'none',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#2E7D32'}
                                onMouseLeave={e => e.currentTarget.style.color = '#666'}
                            >
                                Achievements
                            </Link>
                            <Link to="/" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                Return Home
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none', background: 'none', border: 'none',
                        cursor: 'pointer', zIndex: 1001, padding: '0.5rem',
                    }}
                    aria-label="Toggle menu"
                >
                    <div style={{ width: '28px', height: '2px', background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none', marginBottom: menuOpen ? '0' : '8px' }} />
                    <div style={{ width: '28px', height: '2px', background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1, marginBottom: menuOpen ? '0' : '8px' }} />
                    <div style={{ width: '20px', height: '2px', background: isScrolled || menuOpen ? 'var(--color-dark)' : 'var(--color-white)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Full-Screen Menu */}
            <div
                className="mobile-menu"
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                    background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '1.5rem',
                    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1000,
                }}
            >
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href}
                        onClick={(e) => handleNavClick(link.href, e)}
                        style={{
                            fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                            color: 'var(--color-dark)', textTransform: 'uppercase', letterSpacing: '0.05em',
                            textDecoration: 'none',
                        }}
                    >
                        {link.label}
                    </a>
                ))}
                {/* Branches in mobile */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Branches</span>
                    {branchLinks.map((b) => (
                        <Link key={b.route} to={b.route} onClick={() => setMenuOpen(false)}
                            style={{
                                fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700,
                                color: b.accent, textDecoration: 'none',
                            }}
                        >{b.label}</Link>
                    ))}
                </div>
                <Link to="/capacity" onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-green)', textDecoration: 'none' }}>
                    Capacity
                </Link>
                <Link to="/achievements" onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-yellow-dark)', textDecoration: 'none' }}>
                    Achievements
                </Link>
            </div>

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
