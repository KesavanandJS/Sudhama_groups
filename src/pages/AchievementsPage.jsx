import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const csrPoints = [
    { icon: '🚫', title: 'Zero Child Labour', desc: 'Our main objective is to strictly act against child labour — a non-negotiable policy across all our units.' },
    { icon: '⚖️', title: 'Fair Wages', desc: 'We follow the salary scale fixed by the labour union to ensure employees are satisfied and able to fulfil their needs.' },
    { icon: '🌿', title: 'Environmental Awareness', desc: 'Environmental cleanliness awareness is provided to all employees, keeping in mind the protection of Nature and Environment.' },
    { icon: '🏥', title: 'Employee Amenities', desc: 'All employees are provided with amenities like Rest Room, First Aid, Crèche, and transport facilities for comfort and safety.' },
    { icon: '🤝', title: 'Community Support', desc: "Sudhama Group's policy is to help the needy and underprivileged — funding children's education, medical help for the elderly, and more. Our MD is an active Lions Club member." },
    { icon: '✅', title: '100% Compliant', desc: 'We ensure all government regulations are followed in all departments — Sudhama Group is a 100% risk-free zone.' },
]

const certs = [
    {
        code: 'ISO',
        title: 'ISO 9001:2008',
        subtitle: 'Quality Management',
        desc: 'Certified company that strictly follows international quality management norms across all production processes.',
        accent: '#2E7D32',
    },
    {
        code: 'OT',
        title: 'Oeko-Tex Standard',
        subtitle: '100% Eco-Friendly',
        desc: 'Certified for producing 100% Eco-Friendly products with UV protection sun-blocking technology up to 100 PPF.',
        accent: '#F9A825',
    },
    {
        code: 'GOTS',
        title: 'GOTS Certified',
        subtitle: 'Global Organic Textile Standard',
        desc: 'Obtained for the standard processing of fibers from certified organic agriculture — from field to finished garment.',
        accent: '#2E7D32',
    },
    {
        code: 'WRAP',
        title: 'WRAP Certified',
        subtitle: 'Worldwide Responsible Accredited Production',
        desc: 'Awarded for doing business with better trading and sustainable products, meeting the highest global standards.',
        accent: '#F9A825',
    },
]

export default function AchievementsPage() {
    const pageRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            // Hero
            gsap.fromTo('.ach-hero-label', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
            gsap.fromTo('.ach-hero-title', { opacity: 0, y: 80, rotateX: -20, transformPerspective: 800 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, delay: 0.5, ease: 'expo.out' })

            // CSR cards
            gsap.utils.toArray('.csr-card').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.08, ease: 'power3.out',
                      scrollTrigger: { trigger: el, start: 'top 88%' } }
                )
            })

            // Eco section
            gsap.fromTo('.eco-content',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                  scrollTrigger: { trigger: '.eco-content', start: 'top 80%' } }
            )

            // Cert cards
            gsap.utils.toArray('.cert-card').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 60, rotateY: -10, transformPerspective: 600 },
                    { opacity: 1, y: 0, rotateY: 0, duration: 1, delay: i * 0.12, ease: 'power3.out',
                      scrollTrigger: { trigger: el, start: 'top 88%' } }
                )
            })

            // Section headers
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
                minHeight: '60vh',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1B5E20 60%, #2E7D32 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 8vw 8vh',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background pattern */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(249,168,37,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(46,125,50,0.15) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />
                {/* Large BG text */}
                <div style={{
                    position: 'absolute', right: '5vw', bottom: '-2vh',
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    fontSize: 'clamp(6rem, 18vw, 16rem)', lineHeight: 1,
                    color: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
                    userSelect: 'none',
                }}>ACH</div>

                <div className="ach-hero-label" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
                    <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 700, color: '#F9A825' }}>Sudhama Groups</span>
                </div>
                <h1 className="ach-hero-title" style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                    fontWeight: 800, color: '#fff',
                    lineHeight: 1.05, opacity: 0,
                    maxWidth: '700px',
                }}>
                    Our Achievements<br />
                    <span style={{ color: '#F9A825' }}>&amp; Commitments</span>
                </h1>
            </section>

            {/* ══════════ CSR ══════════ */}
            <section style={{ padding: '10vh 8vw' }}>
                <div className="section-header-reveal" style={{ marginBottom: '5rem', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ width: '40px', height: '2px', background: '#2E7D32' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: '#2E7D32' }}>People &amp; Planet</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0a0a0a', maxWidth: '600px' }}>
                        Corporate Social<br />
                        <span style={{ color: '#2E7D32' }}>Responsibility</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                    gap: '1.5rem',
                }}>
                    {csrPoints.map((item, i) => (
                        <div key={i} className="csr-card" style={{
                            opacity: 0,
                            padding: '2rem 0',
                            borderTop: `1px solid rgba(0,0,0,0.1)`,
                            transition: 'transform 0.3s ease',
                        }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                                <div style={{ fontSize: '2.5rem', flexShrink: 0, transform: 'translateY(-0.25rem)' }}>{item.icon}</div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0a0a0a', marginBottom: '0.75rem' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#555', lineHeight: 1.7, maxWidth: '400px' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════ ECO FRIENDLY ══════════ */}
            <section style={{
                padding: '10vh 8vw',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', right: '-5vw', top: '50%', transform: 'translateY(-50%)',
                    fontSize: 'clamp(8rem, 20vw, 18rem)', lineHeight: 1,
                    color: 'rgba(255,255,255,0.04)', fontFamily: 'var(--font-heading)', fontWeight: 900,
                    pointerEvents: 'none', userSelect: 'none',
                }}>ECO</div>

                <div className="eco-content" style={{ maxWidth: '700px', position: 'relative', zIndex: 2, opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: '#F9A825' }}>Sustainability</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>
                        Eco Friendly<br />
                        <span style={{ color: '#FDD835' }}>Manufacturing</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                        At all our units we strictly follow Eco-Friendly norms in order to protect nature and the environment. We use <strong style={{ color: '#FDD835' }}>AZO-Free dyes</strong> and our in-house <strong style={{ color: '#FDD835' }}>Hi-Tech Effluent Treatment Plant</strong> helps to positively contribute to a better environment for future generations.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                        {['AZO-Free Dyes', 'ETP Plant', 'Zero Discharge', 'Green Processing'].map((tag) => (
                            <div key={tag} style={{
                                padding: '0.6rem 1.2rem',
                                border: '1px solid rgba(253,216,53,0.4)',
                                color: '#FDD835',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}>{tag}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ AWARDS & CERTIFICATES ══════════ */}
            <section style={{ padding: '10vh 8vw' }}>
                <div className="section-header-reveal" style={{ marginBottom: '5rem', opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ width: '40px', height: '2px', background: '#F9A825' }} />
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, color: '#F9A825' }}>Recognition</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0a0a0a', maxWidth: '600px' }}>
                        Awards &amp;<br />
                        <span style={{ color: '#F9A825' }}>Certifications</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '550px' }}>
                        With continuous efforts of our dedicated and skilled workforce, Sudhama Group holds pride in achieving the following international certifications and standards.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                    gap: '2rem',
                }}>
                    {certs.map((cert, i) => (
                        <div key={i} className="cert-card" style={{
                            opacity: 0,
                            background: 'transparent',
                            padding: '2.5rem 0',
                            position: 'relative',
                            overflow: 'hidden',
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                        }}
                        >
                            {/* Accent indicator */}
                            <div style={{ width: '40px', height: '3px', background: cert.accent, marginBottom: '2rem' }} />

                            {/* Large background code */}
                            <div style={{
                                position: 'absolute', right: 0, top: '2rem',
                                fontFamily: 'var(--font-heading)', fontWeight: 900,
                                fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1,
                                color: cert.accent === '#2E7D32' ? 'rgba(46,125,50,0.06)' : 'rgba(249,168,37,0.08)',
                                pointerEvents: 'none', userSelect: 'none',
                            }}>{cert.code}</div>

                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.5rem', fontWeight: 800,
                                color: cert.accent, marginBottom: '0.5rem',
                                position: 'relative', zIndex: 2,
                            }}>{cert.title}</h3>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem', fontWeight: 700,
                                color: '#0a0a0a', textTransform: 'uppercase',
                                letterSpacing: '0.1em', marginBottom: '1.5rem',
                                position: 'relative', zIndex: 2,
                            }}>{cert.subtitle}</p>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem', color: '#555', lineHeight: 1.7,
                                position: 'relative', zIndex: 2,
                                maxWidth: '350px',
                            }}>{cert.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════ BACK LINK ══════════ */}
            <div style={{ padding: '0 8vw 8vh', display: 'flex', justifyContent: 'center' }}>
                <Link to="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600,
                    color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.15em',
                    textDecoration: 'none',
                }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
