import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const units = [
    {
        name: 'Menaka Textiles',
        route: '/menaka-textiles',
        accent: '#2E7D32',
        bgGrad: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        location: 'Corporate Office, Tirupur City',
        divisions: [
            {
                title: 'Garment Manufacturing',
                capacity: '30,000',
                unit: 'Pcs / Month',
                machines: 'Latest machinery with skilled craftsmen',
                icon: '🧵',
            },
            {
                title: 'Embroidery Division',
                capacity: '50,000',
                unit: 'Pcs / Month',
                machines: 'Burdan & Tajima technology machines',
                icon: '✨',
            },
        ],
        products: ['Embroidery', 'Sequence', 'Cording', 'Knitted & Woven Garments'],
    },
    {
        name: 'Sudhama Hosieries',
        route: '/sudhama-hosieries',
        accent: '#F9A825',
        bgGrad: 'linear-gradient(135deg, #F57F17, #F9A825)',
        location: 'TEKIC Industrial Area, Tirupur',
        divisions: [
            {
                title: 'Knitting Unit',
                capacity: '15,000',
                unit: 'Kg / Month',
                machines: 'Falmac, Mayer & Cie, Stoll machines',
                icon: '🔄',
            },
            {
                title: 'Garment Manufacturing',
                capacity: '1,00,000',
                unit: 'Pcs / Month',
                machines: 'Brother, Juki, Pegasus, Yamato machines',
                icon: '👕',
            },
        ],
        products: ['Knitted Fabric', 'Collar Knitting', 'Cut & Sew Garments', 'T-Shirts', 'Activewear'],
    },
    {
        name: 'G P Textiles',
        route: '/gp-textiles',
        accent: '#C62828',
        bgGrad: 'linear-gradient(135deg, #0a0a0a, #2d2d2d)',
        location: 'Near Corporate Office, Tirupur',
        divisions: [
            {
                title: 'Printing Unit',
                capacity: '1,50,000',
                unit: 'Pcs / Month',
                machines: 'Automatic, Manual & Table Top machines',
                icon: '🖨️',
            },
            {
                title: 'Garment Manufacturing',
                capacity: '50,000',
                unit: 'Pcs / Month',
                machines: 'Fully equipped garment unit',
                icon: '🏭',
            },
        ],
        products: ['Water Base', 'PVC & Non-PVC', 'Flock', 'High-Density', 'Foil', 'Sugar Print'],
    },
]

const totalStats = [
    { value: '3,95,000', label: 'Total Pcs / Month', sub: 'Garment Production Capacity' },
    { value: '15,000', label: 'Kg / Month', sub: 'Knitting Capacity' },
    { value: '3', label: 'Manufacturing Units', sub: 'Across Tirupur' },
    { value: '25+', label: 'Years', sub: 'Of Manufacturing Excellence' },
]

export default function CapacityPage() {
    const pageRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.cap-hero-label', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
            gsap.fromTo('.cap-hero-title', { opacity: 0, y: 80, rotateX: -20, transformPerspective: 800 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, delay: 0.5, ease: 'expo.out' })
            gsap.fromTo('.cap-hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' })

            // Total stats
            gsap.utils.toArray('.total-stat').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: 'back.out(1.4)',
                      scrollTrigger: { trigger: el, start: 'top 88%' } }
                )
            })

            // Unit cards
            gsap.utils.toArray('.unit-block').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                      scrollTrigger: { trigger: el, start: 'top 82%' } }
                )
            })

            // Division rows
            gsap.utils.toArray('.div-row').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                      scrollTrigger: { trigger: el, start: 'top 88%' } }
                )
            })

            // Section intro headers
            gsap.utils.toArray('.section-header-reveal').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                      scrollTrigger: { trigger: el, start: 'top 85%' } }
                )
            })

        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} style={{ background: '#fafafa', minHeight: '100vh' }}>

            {/* ══════════ HERO ══════════ */}
            <section style={{
                minHeight: '65vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #0f2113 60%, #1B5E20 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 8vw 8vh',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(249,168,37,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(46,125,50,0.12) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', right: '4vw', bottom: '-3vh',
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    fontSize: 'clamp(5rem, 16vw, 14rem)', lineHeight: 1,
                    color: 'rgba(255,255,255,0.03)', pointerEvents: 'none', userSelect: 'none',
                }}>CAP</div>

                <div className="cap-hero-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
                    <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 700, color: '#F9A825' }}>Production</span>
                </div>
                <h1 className="cap-hero-title" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                    fontWeight: 800, color: '#fff',
                    lineHeight: 1.05, opacity: 0,
                    maxWidth: '700px',
                }}>
                    Capacity<br />
                    <span style={{ color: '#F9A825' }}>Details</span>
                </h1>
                <p className="cap-hero-sub" style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '1.5rem',
                    maxWidth: '500px',
                    opacity: 0,
                    lineHeight: 1.7,
                }}>
                    Three world-class manufacturing units — delivering exceptional textile output with precision, scale, and craftsmanship.
                </p>
            </section>

            {/* ══════════ TOTAL STATS ══════════ */}
            <section style={{ padding: '8vh 8vw', background: '#0a0a0a' }}>
                <div className="section-header-reveal" style={{ marginBottom: '4rem', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: '#F9A825' }}>At A Glance</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff' }}>
                        Combined Production Capacity
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
                    gap: '1.5rem',
                }}>
                    {totalStats.map((s, i) => (
                        <div key={i} className="total-stat" style={{
                            opacity: 0,
                            borderTop: `2px solid ${i % 2 === 0 ? '#2E7D32' : '#F9A825'}`,
                            paddingTop: '1.5rem',
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                                fontWeight: 800,
                                color: i % 2 === 0 ? '#4CAF50' : '#FDD835',
                                marginBottom: '0.25rem',
                            }}>{s.value}</div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{s.label}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════ PER UNIT ══════════ */}
            <section style={{ padding: '10vh 8vw' }}>
                <div className="section-header-reveal" style={{ marginBottom: '6rem', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ width: '40px', height: '2px', background: '#2E7D32' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: '#2E7D32' }}>Unit Breakdown</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0a0a0a' }}>
                        Production by<br />
                        <span style={{ color: '#2E7D32' }}>Manufacturing Unit</span>
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                    {units.map((unit, ui) => (
                        <div key={ui} className="unit-block" style={{ opacity: 0, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '4rem' }}>
                            {/* Unit header - now clean text with no box */}
                            <div style={{
                                padding: '1rem 0 2rem',
                                position: 'relative',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: unit.accent }} />
                                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 800, color: unit.accent, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                                {unit.location}
                                            </span>
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#0a0a0a' }}>
                                            {unit.name}
                                        </h3>
                                    </div>
                                    <Link to={unit.route} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        color: '#0a0a0a',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.8rem', fontWeight: 600,
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        transition: 'all 0.3s ease',
                                        alignSelf: 'flex-start',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
                                    >
                                        View Unit →
                                    </Link>
                                </div>
                            </div>

                            {/* Division rows - clean line separated list instead of grid boxes */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {unit.divisions.map((div, di) => (
                                    <div key={di} className="div-row" style={{
                                        opacity: 0,
                                        padding: '2.5rem 0',
                                        borderTop: `1px solid rgba(0,0,0,0.1)`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                                            <div style={{ fontSize: '2.5rem', flexShrink: 0, transform: 'translateY(-0.25rem)' }}>{div.icon}</div>
                                            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                                                <div style={{ maxWidth: '400px' }}>
                                                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0a0a0a', marginBottom: '0.5rem' }}>
                                                        {div.title}
                                                    </h4>
                                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>
                                                        {div.machines}
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-heading)',
                                                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                                        fontWeight: 900,
                                                        color: unit.accent,
                                                        lineHeight: 1,
                                                        letterSpacing: '-0.02em',
                                                    }}>{div.capacity}</span>
                                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                                        {div.unit}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Products tag row */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                                {unit.products.map((p) => (
                                    <span key={p} style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.8rem', fontWeight: 600,
                                        color: '#666',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                    }}>• {p}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Back */}
            <div style={{ padding: '0 8vw 8vh', display: 'flex', justifyContent: 'center' }}>
                <Link to="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600,
                    color: '#2E7D32', textDecoration: 'none',
                    textTransform: 'uppercase', letterSpacing: '0.15em',
                }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
