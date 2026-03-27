import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const garmentData = [
    {
        branch: 'Sudhama Hosieries',
        color: '#F9A825',
        styles: [
            { name: 'Basic Styles', day: '4500 Pcs', month: '1,17,000 Pcs' },
            { name: 'Polo Shirt', day: '2500 Pcs', month: '65,000 Pcs' },
            { name: 'Sweat Shirt', day: '2000 Pcs', month: '52,000 Pcs' },
        ]
    },
    {
        branch: 'Menaka Textiles',
        color: '#2E7D32',
        styles: [
            { name: 'Basic Styles', day: '1500 Pcs', month: '40,000 Pcs' },
            { name: 'Polo Shirt', day: '1000 Pcs', month: '26,000 Pcs' },
            { name: 'Sweat Shirt', day: '800 Pcs', month: '21,000 Pcs' },
        ]
    },
    {
        branch: 'G.P Textiles',
        color: '#C62828',
        styles: [
            { name: 'Basic Styles', day: '1200 Pcs', month: '32,000 Pcs' },
            { name: 'Polo Shirt', day: '1200 Pcs', month: '31,000 Pcs' },
            { name: 'Sweat Shirt', day: '700 Pcs', month: '20,000 Pcs' },
        ]
    }
]

const printingData = [
    { name: 'Automatic Machines', day: '9,000 - 9,500 Nos', month: '2,40,000 - 2,45,000 Nos' },
    { name: 'Manual Machines', day: '6,000 - 6,500 Nos', month: '1,50,000 - 1,65,000 Nos' },
    { name: 'Table Printing', day: '2,000 - 2,500 Nos', month: '50,000 - 65,000 Nos' },
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
                        scrollTrigger: { trigger: el, start: 'top 88%' }
                    }
                )
            })

            // Sections
            gsap.utils.toArray('.cap-section').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

            // Data Rows stagger
            gsap.utils.toArray('.cap-row').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 90%' }
                    }
                )
            })

        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} style={{ background: '#fafafa', minHeight: '100vh', overflowX: 'hidden' }}>
            <style>{`
                .cap-grid-desktop {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 4vw;
                    align-items: flex-start;
                }
                .cap-glance-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2.5rem;
                }
                .mobile-split {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                
                @media (max-width: 900px) {
                    .cap-grid-desktop {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .cap-glance-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.5rem;
                    }
                    .mobile-split {
                        gap: 1rem;
                    }
                }
                
                @media (max-width: 500px) {
                    .mobile-split {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

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
                    position: 'absolute', right: '-2vw', bottom: '-4vh',
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    fontSize: 'clamp(6rem, 20vw, 16rem)', lineHeight: 1,
                    color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', userSelect: 'none',
                }}>CHART</div>

                <div className="cap-hero-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
                    <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 700, color: '#F9A825' }}>Production Volume</span>
                </div>
                <h1 className="cap-hero-title" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    fontWeight: 800, color: '#fff',
                    lineHeight: 1.05, opacity: 0,
                    maxWidth: '800px',
                }}>
                    Production<br />
                    <span style={{ color: '#F9A825' }}>Capacity Chart</span>
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
                    Detailing our comprehensive daily and monthly output across specialized garment, dyeing, embroidery, and printing units.
                </p>
            </section>

            {/* ══════════ AT A GLANCE ══════════ */}
            <section style={{ padding: '8vh 8vw', background: '#0a0a0a' }}>
                <div className="cap-glance-grid">
                    <div className="total-stat" style={{ opacity: 0, position: 'relative', paddingTop: '1.5rem' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '2px', background: '#2E7D32' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#4CAF50', marginBottom: '0.25rem' }}>4,04,000</div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', opacity: 0.9 }}>Pcs / Month</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Garments</div>
                    </div>
                    <div className="total-stat" style={{ opacity: 0, position: 'relative', paddingTop: '1.5rem' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '2px', background: '#F9A825' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#FDD835', marginBottom: '0.25rem' }}>1,50,000</div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', opacity: 0.9 }}>Pcs / Month</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Embroidery Cap.</div>
                    </div>
                    <div className="total-stat" style={{ opacity: 0, position: 'relative', paddingTop: '1.5rem' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '2px', background: '#2E7D32' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#4CAF50', marginBottom: '0.25rem' }}>2,45,000</div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', opacity: 0.9 }}>Nos / Month</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Auto Printing Cap.</div>
                    </div>
                    <div className="total-stat" style={{ opacity: 0, position: 'relative', paddingTop: '1.5rem' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '2px', background: '#F9A825' }} />
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#FDD835', marginBottom: '0.25rem' }}>8 Tons</div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem', opacity: 0.9 }}>Per Day</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dyeing &amp; Drying</div>
                    </div>
                </div>
            </section>

            <div style={{ padding: '10vh 8vw', display: 'flex', flexDirection: 'column', gap: '8vh' }}>

                {/* ══════════ DYEING UNIT ══════════ */}
                <section className="cap-section cap-grid-desktop" style={{ opacity: 0, paddingBottom: '6vh', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ width: '30px', height: '2px', background: '#2E7D32' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 700, color: '#2E7D32' }}>Unit 01</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.1 }}>
                            Dyeing Unit
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {[
                            { label: 'Total Output Capacity of Dyeing is', val: '8 Tons' },
                            { label: 'Total Output Capacity of Dryer is', val: '8 Tons', sub: '/ Day' },
                            { label: 'Total Output Capacity of Padding is', val: '9 Tons', sub: '/ Day' },
                        ].map((row, i) => (
                            <div key={i} className="cap-row" style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: i !== 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
                                    {row.label}
                                </span>
                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, color: '#2E7D32', lineHeight: 1 }}>
                                    {row.val} {row.sub && <span style={{ fontSize: '1rem', color: '#666', fontWeight: 600 }}>{row.sub}</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══════════ GARMENT UNIT ══════════ */}
                <section className="cap-section cap-grid-desktop" style={{ opacity: 0, paddingBottom: '6vh', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ width: '30px', height: '2px', background: '#F9A825' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 700, color: '#F9A825' }}>Unit 02</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.1 }}>
                            Garment Unit
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                        {garmentData.map((branch, bi) => (
                            <div key={bi} className="cap-row">
                                {/* Branch Header Typography */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: branch.color }} />
                                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888' }}>Facility</span>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
                                        {branch.branch}
                                    </h3>
                                </div>
                                
                                {/* Styles Grid - Ledger Style */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem' }}>
                                    {branch.styles.map((style, si) => (
                                        <div key={si} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                                            {/* Accent lines */}
                                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '1px', background: 'rgba(0,0,0,0.06)' }}>
                                                <div style={{ position: 'absolute', top: 0, left: '-1px', width: '3px', height: '30px', background: branch.color }} />
                                            </div>
                                            
                                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: branch.color, marginBottom: '1.5rem' }}>
                                                {style.name}
                                            </h4>
                                            
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(0,0,0,0.06)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Per Day</span>
                                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#333', lineHeight: 1 }}>{style.day}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Per Month</span>
                                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0a0a0a', lineHeight: 1 }}>{style.month}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══════════ EMBROIDERY UNIT ══════════ */}
                <section className="cap-section cap-grid-desktop" style={{ opacity: 0, paddingBottom: '6vh', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ width: '30px', height: '2px', background: '#2E7D32' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 700, color: '#2E7D32' }}>Unit 03</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.1 }}>
                            Embroidery Unit
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="cap-row" style={{ paddingBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '1rem' }}>
                                Production Capacity Per Month
                            </div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 7vw, 2.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.2 }}>
                                1,20,000 <span style={{ fontSize: '1.1rem', color: '#666', fontWeight: 600 }}>Pcs</span><br className="mobile-only-br" />
                                <span style={{ color: '#2E7D32', fontWeight: 400, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', margin: '0 0.5rem', display: 'inline-block' }}>to</span><br className="mobile-only-br" />
                                1,50,000 <span style={{ fontSize: '1.1rem', color: '#666', fontWeight: 600 }}>Pcs</span>
                            </div>
                            <style>{`@media(min-width: 600px){ .mobile-only-br { display: none; } }`}</style>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#666', marginTop: '1.5rem', fontStyle: 'italic', borderLeft: '2px solid #2E7D32', paddingLeft: '0.75rem' }}>* Based on Designs</p>
                        </div>
                        <div className="cap-row mobile-split">
                            <div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.75rem' }}>
                                    Machine Details
                                </div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 6vw, 2.5rem)', fontWeight: 800, color: '#2E7D32' }}>
                                    Tot. 8 <span style={{ fontSize: '1.1rem', color: '#666', fontWeight: 600 }}>Nos</span>
                                </div>
                            </div>
                            <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '10px', left: '-1.5rem', width: '3px', height: '16px', background: '#2E7D32' }} />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0a0a0a', display: 'block' }}>Barudan</span>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#666' }}>6 Nos</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '10px', left: '-1.5rem', width: '3px', height: '16px', background: '#2E7D32' }} />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#0a0a0a', display: 'block' }}>Tajima</span>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#666' }}>2 Nos (with Sequins)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ PRINTING UNIT ══════════ */}
                <section className="cap-section cap-grid-desktop" style={{ opacity: 0 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ width: '30px', height: '2px', background: '#F9A825' }} />
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.7rem', fontWeight: 700, color: '#F9A825' }}>Unit 04</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1.1 }}>
                            Printing Unit
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {printingData.map((row, i) => (
                            <div key={i} className="cap-row" style={{ padding: '2rem 0', borderBottom: i !== 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0a0a0a', marginBottom: '1.5rem' }}>
                                    {row.name}
                                </h3>
                                
                                <div className="mobile-split">
                                    <div style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: '#F9A825' }} />
                                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.5rem' }}>Per Day</div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 800, color: '#333', lineHeight: 1 }}>{row.day}</div>
                                    </div>
                                    <div style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '100%', background: 'rgba(0,0,0,0.1)' }} />
                                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.5rem' }}>Per Month</div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 800, color: '#0a0a0a', lineHeight: 1 }}>{row.month}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

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
