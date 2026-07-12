import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Zap, Users, Map, Mail, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12;

  const nextSlide = () => setCurrentSlide((p) => (p === totalSlides - 1 ? p : p + 1));
  const prevSlide = () => setCurrentSlide((p) => (p === 0 ? p : p - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="brx-page" style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <style>
        {`
          @media (max-width: 768px) {
            .brx-links, .brx-social-container { display: none !important; }
            .brx-nav { padding: 0 15px !important; }
            .brx-brand img { height: 28px !important; }
            .brx-grid-3 { grid-template-columns: 1fr !important; gap: 20px !important; margin-top: 20px !important; }
            .brx-grid-4 { grid-template-columns: 1fr !important; gap: 20px !important; }
            .brx-team-grid { flex-direction: column !important; padding: 20px !important; }
            .brx-table-wrapper { overflow-x: auto !important; max-width: 100% !important; margin-top: 20px !important; }
            section { padding: 30px 20px !important; overflow-y: auto !important; display: block !important; }
            h1 { font-size: 42px !important; }
            h2 { font-size: 32px !important; margin-top: 10px !important; }
            p { font-size: 15px !important; }
          }
          .resources-dropdown:hover .dropdown-menu { display: flex !important; }
        `}
      </style>
      
      {/* Navigation / Header */}
      <nav className="brx-nav" style={{ flexShrink: 0, height: '70px', padding: '0 30px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: 'var(--accent)', width: `${((currentSlide + 1) / totalSlides) * 100}%`, transition: 'width 0.3s ease' }}></div>
        <div className="brx-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/full_logo.png" alt="Brixs Logo" style={{ height: '40px', width: 'auto' }} />
        </div>
        <div className="brx-links" style={{ flex: 1, justifyContent: 'center', gap: '30px', display: 'flex', alignItems: 'center' }}>
          <a href="https://www.brixs.space" target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>Website</a>
          
          <div style={{ position: 'relative', display: 'inline-block', paddingBottom: '10px' }} className="resources-dropdown">
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e: any) => e.currentTarget.style.color = '#fff'} onMouseOut={(e: any) => e.currentTarget.style.color = '#8c93a2'}>Resources ▼</span>
            <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#12141a', border: '1px solid #1f2229', padding: '15px', display: 'none', flexDirection: 'column', gap: '15px', borderRadius: '8px', zIndex: 100, minWidth: '120px', alignItems: 'center' }}>
              <Link to="/blog" style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s', whiteSpace: 'nowrap' }} onMouseOver={(e: any) => e.currentTarget.style.color = '#fff'} onMouseOut={(e: any) => e.currentTarget.style.color = '#8c93a2'}>Blog</Link>
              <a href="https://docs.brixs.space" target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>Docs</a>
            </div>
          </div>

          <a href="https://testnet.brixs.space" target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>Explorer</a>
          <a href="https://faucet.brixs.space" target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: '#8c93a2', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>Faucet</a>
        </div>
        <div className="brx-social-container" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.1em', color: 'var(--accent)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '10px' }}>
            {currentSlide + 1} / {totalSlides}
          </span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#8c93a2', transition: 'color 0.2s', display: 'flex' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#8c93a2', transition: 'color 0.2s', display: 'flex' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#8c93a2', transition: 'color 0.2s', display: 'flex' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#8c93a2'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </nav>

      {/* Slide Container */}
      <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.6s cubic-bezier(0.87, 0, 0.13, 1)', height: '100%', display: 'flex', flexDirection: 'row', width: '100%' }}>
          
          {/* SLIDE 1: Cover */}
          <section className="brx-ph-hero" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', position: 'relative', '--accent': 'var(--b)' } as React.CSSProperties}>
            <div>
              <div className="brx-ph-eyebrow">SEED ROUND</div>
              <h1>BRIXS CHAIN</h1>
              <p className="brx-ph-lead" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--i)', marginTop: '10px' }}>
                The Zero-Gas, High-Performance Layer 2 for the Next Billion Users.
              </p>
              <div className="brx-ph-actions">
                <button onClick={nextSlide} className="brx-btn accent">Begin Pitch <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className="brx-ph-art">
              <div className="brx-ph-grid"></div>
              <div className="brx-ph-orbit o1"></div>
              <div className="brx-ph-orbit o2"></div>
              <div className="brx-ph-disc">
                <video src="/hero-loop.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="brx-ph-chip c1"><Globe size={20} color="var(--b)" /></div>
              <div className="brx-ph-chip c2"><Zap size={20} /></div>
              <div className="brx-ph-readout">
                <span>TESTNET_LIVE</span><i></i>
              </div>
            </div>
          </section>

          {/* SLIDE 2: Problem */}
          <section className="brx-band dark" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--m)' } as React.CSSProperties}>
            <div className="brx-kicker"><b></b> THE $5 WALL</div>
            <h2 style={{ fontSize: '48px', maxWidth: '800px', margin: '0 auto' }}>The $5 Wall I Hit While Building Web3.</h2>
            <div className="brx-grid-3" style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'left', display: 'grid', gap: '20px' }}>
              <div style={{ padding: '20px', borderLeft: '4px solid var(--accent)', background: '#12141a' }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>The Frustration:</strong>
                "While mentoring and onboarding thousands of developers into Web3, I noticed a massive disconnect. We promised a financial revolution, but the reality was broken."
              </div>
              <div style={{ padding: '20px', borderLeft: '4px solid var(--accent)', background: '#12141a' }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>The Barrier:</strong>
                "Brilliant developers in emerging markets built incredible DApps, but couldn't get users because approving a transaction costs $1 to $5. For a user in India or LatAm, paying $5 just to interact is a complete dealbreaker."
              </div>
              <div style={{ padding: '20px', borderLeft: '4px solid var(--accent)', background: '#12141a' }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>The UX Nightmare:</strong>
                "Even if they could afford the gas, users had to figure out seed phrases and manually switch RPCs. The infrastructure is simply hostile to everyday people."
              </div>
            </div>
          </section>

          {/* SLIDE 3: Solution */}
          <section className="brx-section gray" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--green)' } as React.CSSProperties}>
            <div className="brx-section-head">
              <div className="brx-eyebrow">THE SOLUTION</div>
              <h2>The Network I Wish I Had.</h2>
            </div>
            <div className="brx-cap-grid">
              <div className="brx-cap">
                <div className="brx-cap-bar"></div>
                <small>THE REALIZATION</small>
                <p>"I stopped trying to force developers to build on broken chains and built the infrastructure myself. That is how Brixs Chain was born."</p>
              </div>
              <div className="brx-cap">
                <div className="brx-cap-bar"></div>
                <small>ZERO-GAS REALITY</small>
                <p>"I engineered Brixs with protocol-level Account Abstraction and Paymasters. The gas fee is sponsored in the background. The user pays exactly $0."</p>
              </div>
              <div className="brx-cap">
                <div className="brx-cap-bar"></div>
                <small>WEB2 UX, WEB3 POWER</small>
                <p>"Instead of seed phrases, users log in with their email. Instead of fragmented bridging, Brixs unifies liquidity under the hood."</p>
              </div>
            </div>
          </section>

          {/* SLIDE 4: Architecture */}
          <section className="brx-h-media" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', '--accent': 'var(--b)' } as React.CSSProperties}>
            <div className="brx-rise">
              <div className="brx-ph-eyebrow">PRODUCT / TECH ARCHITECTURE</div>
              <h1 style={{ fontSize: '42px' }}>Institutional-Grade <br/><em>ZK-Rollup</em> Infrastructure.</h1>
              
              <ul style={{ marginTop: '40px', color: '#3a414b', lineHeight: '1.8', fontSize: '18px', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '15px', borderBottom: '1px solid #e2e4e9', paddingBottom: '15px' }}><strong style={{ color: 'var(--i)' }}>Execution Layer:</strong> Type-2 zkEVM (100% EVM Equivalent - seamlessly deploy existing Solidity contracts).</li>
                <li style={{ marginBottom: '15px', borderBottom: '1px solid #e2e4e9', paddingBottom: '15px' }}><strong style={{ color: 'var(--i)' }}>Data Availability:</strong> Hybrid Validium/Rollup model ensuring high throughput and low cost.</li>
                <li style={{ marginBottom: '15px', borderBottom: '1px solid #e2e4e9', paddingBottom: '15px' }}><strong style={{ color: 'var(--i)' }}>Network Specs:</strong> Sovereign Chain ID: 51515 (Testnet).</li>
                <li><strong style={{ color: 'var(--accent)' }}>Current Status:</strong> Live on Testnet (Mainnet in development).</li>
              </ul>
            </div>
            <div className="brx-h-media-frame">
              <div className="brx-tag">ZK PROOF GENERATION</div>
              <video src="/validator-network.mp4" autoPlay loop muted playsInline style={{ objectFit: 'cover' }} />
            </div>
          </section>

          {/* SLIDE 5: Market Size */}
          <section className="brx-band dark" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--yellow)' } as React.CSSProperties}>
            <div className="brx-kicker"><b></b> MARKET SIZE (TAM/SAM)</div>
            <h2 style={{ fontSize: '50px' }}>Targeting a Massively <em>Underserved Market</em>.</h2>
            
            <div className="brx-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '1000px', margin: '40px auto 0' }}>
              <div style={{ border: '2px solid var(--accent)', padding: '40px', textAlign: 'left', background: '#0a0a0b' }}>
                <h3 style={{ color: 'var(--accent)', fontSize: '24px', margin: '0 0 15px' }}>TAM</h3>
                <p style={{ color: '#fff', fontSize: '18px', lineHeight: 1.6 }}>The global unbanked and emerging market digital economy ($Trillions).</p>
              </div>
              <div style={{ border: '2px solid var(--accent)', padding: '40px', textAlign: 'left', background: '#0a0a0b' }}>
                <h3 style={{ color: 'var(--accent)', fontSize: '24px', margin: '0 0 15px' }}>SAM</h3>
                <p style={{ color: '#fff', fontSize: '18px', lineHeight: 1.6 }}>The 20+ million existing software developers globally who are intimidated by Web3 infrastructure friction.</p>
              </div>
              <div style={{ border: '2px solid var(--accent)', padding: '40px', textAlign: 'left', background: '#0a0a0b' }}>
                <h3 style={{ color: 'var(--accent)', fontSize: '24px', margin: '0 0 15px' }}>SOM</h3>
                <p style={{ color: '#fff', fontSize: '18px', lineHeight: 1.6 }}>Capturing 5% of L2 developer market share by 2026.</p>
              </div>
            </div>
          </section>

          {/* SLIDE 6: Traction */}
          <section className="brx-explore" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--i)', color: 'var(--p)', '--accent': 'var(--green)' } as React.CSSProperties}>
            <div className="brx-section-head">
              <div className="brx-eyebrow">TRACTION & THE UNFAIR ADVANTAGE</div>
              <h2 style={{ color: '#fff' }}>We are not starting from zero.</h2>
            </div>
            <div className="brx-related-grid">
              <div className="brx-related" style={{ background: '#1a1e24', borderColor: '#2b313b', color: '#fff', padding: '35px' }}>
                <div>
                  <b style={{ fontSize: '22px' }}>The Developer Moat</b>
                  <span style={{ fontSize: '14px', marginTop: '10px', color: '#8c93a2', textTransform: 'none', letterSpacing: 'normal' }}>
                    We are backed by a pre-existing, hyper-active network of over 20,000 software developers ready to build DEXs and Games on Day 1.
                  </span>
                </div>
                <Users size={40} color="var(--accent)" style={{ flexShrink: 0 }} />
              </div>
              <div className="brx-related" style={{ background: '#1a1e24', borderColor: '#2b313b', color: '#fff', padding: '35px' }}>
                <div>
                  <b style={{ fontSize: '22px' }}>Live Infrastructure</b>
                  <ul style={{ fontSize: '14px', marginTop: '10px', color: '#8c93a2', paddingLeft: '15px', lineHeight: 1.6 }}>
                    <li>RPC Gateway: rpc-testnet.brixs.space</li>
                    <li>Block Explorer: testnet.brixs.space</li>
                    <li>Live Web Faucet and CLI developer tooling.</li>
                  </ul>
                </div>
                <div className="brx-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '50px' }}>
                  <img src="/website.png" alt="Brixs Website" style={{ width: '100%', height: '80px', objectFit: 'cover', border: '2px solid var(--accent)' }} title="Main Website" />
                  <img src="/explorer.png" alt="Brixs Explorer" style={{ width: '100%', height: '80px', objectFit: 'cover', border: '2px solid var(--accent)' }} title="Block Explorer" />
                  <img src="/faucet.png" alt="Brixs Faucet" style={{ width: '100%', height: '80px', objectFit: 'cover', border: '2px solid var(--accent)' }} title="Testnet Faucet" />
                </div>
              </div>
            </div>
          </section>

          {/* SLIDE 7: Business Model */}
          <section className="brx-section gray" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--b)' } as React.CSSProperties}>
            <div className="brx-section-head">
              <div className="brx-eyebrow">BUSINESS MODEL & TOKENOMICS</div>
              <h2>Sustainable Revenue & Value Accrual.</h2>
            </div>
            <div className="brx-cap-grid">
              <div className="brx-cap" style={{ padding: '40px 30px' }}>
                <div className="brx-cap-bar"></div>
                <small>SEQUENCER REVENUE</small>
                <p>The protocol captures micro-fees on massive transaction volumes generated by high-frequency DApps and games.</p>
              </div>
              <div className="brx-cap" style={{ padding: '40px 30px' }}>
                <div className="brx-cap-bar"></div>
                <small>PAYMASTER SUBSIDIES</small>
                <p>Enterprise/B2B clients pay Brixs in fiat or stablecoins to sponsor the gas for their end-users. We capture the spread.</p>
              </div>
              <div className="brx-cap" style={{ padding: '40px 30px' }}>
                <div className="brx-cap-bar"></div>
                <small>DEFLATIONARY TOKENOMICS</small>
                <p>Base network fees are burned (EIP-1559), creating sustainable value for the native $BRIXS token.</p>
              </div>
            </div>
          </section>

          {/* SLIDE 8: Competition */}
          <section className="brx-band dark" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--m)' } as React.CSSProperties}>
            <div className="brx-kicker"><b></b> COMPETITION (THE L2 LANDSCAPE)</div>
            <h2 style={{ fontSize: '50px' }}>How we beat the <em>incumbents</em>.</h2>
            
            <div className="brx-table-wrapper" style={{ maxWidth: '1000px', margin: '40px auto 0', width: '100%', background: '#111318', border: '1px solid #22252a', padding: '1px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#fff' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #2b313b' }}>
                    <th style={{ padding: '20px', fontSize: '18px', color: '#8c93a2', width: '25%' }}>Feature</th>
                    <th style={{ padding: '20px', fontSize: '18px', color: '#8c93a2', width: '25%' }}>Ethereum L1</th>
                    <th style={{ padding: '20px', fontSize: '18px', color: '#8c93a2', width: '25%' }}>Optimism / Arbitrum</th>
                    <th style={{ padding: '20px', fontSize: '22px', color: 'var(--accent)', width: '25%' }}>Brixs Chain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #1a1e24' }}>
                    <td style={{ padding: '20px', fontWeight: 600 }}>Avg. Gas Fee</td>
                    <td style={{ padding: '20px' }}>$5.00 - $30.00</td>
                    <td style={{ padding: '20px' }}>$0.01 - $0.10</td>
                    <td style={{ padding: '20px', color: 'var(--accent)', fontWeight: 800 }}>$0.00 (Gasless)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1a1e24' }}>
                    <td style={{ padding: '20px', fontWeight: 600 }}>Sequencer</td>
                    <td style={{ padding: '20px' }}>Decentralized</td>
                    <td style={{ padding: '20px' }}>Centralized</td>
                    <td style={{ padding: '20px', color: 'var(--accent)', fontWeight: 800 }}>DPoS Decentralized</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1a1e24' }}>
                    <td style={{ padding: '20px', fontWeight: 600 }}>Account Abstraction</td>
                    <td style={{ padding: '20px' }}>No</td>
                    <td style={{ padding: '20px' }}>Contract Level</td>
                    <td style={{ padding: '20px', color: 'var(--accent)', fontWeight: 800 }}>Protocol Level Native</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '20px', fontWeight: 600 }}>Day 1 Distribution</td>
                    <td style={{ padding: '20px' }}>N/A</td>
                    <td style={{ padding: '20px' }}>Requires BD</td>
                    <td style={{ padding: '20px', color: 'var(--accent)', fontWeight: 800 }}>20,000+ Developers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SLIDE 9: Roadmap */}
          <section className="brx-section" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--b)' } as React.CSSProperties}>
            <div className="brx-section-head">
              <div className="brx-eyebrow">ROADMAP & MILESTONES</div>
              <h2>The Path to Mainnet and Beyond.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <div style={{ borderTop: '4px solid var(--i)', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>PHASE 1: Foundation (Completed)</h3>
                <ul style={{ color: '#59606a', lineHeight: 1.6, paddingLeft: '15px', fontSize: '14px' }}>
                  <li>Type-2 zkEVM Core Architecture</li>
                  <li>Hybrid Data Availability Integration</li>
                  <li>RPC Gateway Live Deployment</li>
                  <li>Internal Testnet Genesis</li>
                </ul>
              </div>
              <div style={{ borderTop: '4px solid var(--accent)', paddingTop: '20px', background: '#f4f5f7', padding: '20px', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: 'var(--accent)' }}>PHASE 2: Public Testnet (Current)</h3>
                <ul style={{ color: '#000', lineHeight: 1.6, paddingLeft: '15px', fontSize: '14px', fontWeight: 500 }}>
                  <li>Chain ID 51515 Public Launch</li>
                  <li>Live Block Explorer & Web Faucet</li>
                  <li>Native Account Abstraction Demo</li>
                  <li>Developer Onboarding Campaign</li>
                </ul>
              </div>
              <div style={{ borderTop: '4px solid #8c93a2', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#3a414b' }}>PHASE 3: Decentralization (Q4)</h3>
                <ul style={{ color: '#59606a', lineHeight: 1.6, paddingLeft: '15px', fontSize: '14px' }}>
                  <li>DPoS Sequencer Implementation</li>
                  <li>Tier-1 Smart Contract Security Audits</li>
                  <li>Cross-chain Liquidity Bridges</li>
                  <li>Ecosystem Grant Program Launch</li>
                </ul>
              </div>
              <div style={{ borderTop: '4px solid #8c93a2', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#3a414b' }}>PHASE 4: Mainnet Genesis (Q1)</h3>
                <ul style={{ color: '#59606a', lineHeight: 1.6, paddingLeft: '15px', fontSize: '14px' }}>
                  <li>Mainnet Genesis Block Production</li>
                  <li>Token Generation Event ($BRIXS)</li>
                  <li>Enterprise Paymaster Integrations</li>
                  <li>Global Marketing & Hackathons</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SLIDE 10: Team */}
          <section className="brx-band" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--green)', background: 'var(--green)', color: '#000' } as React.CSSProperties}>
            <div className="brx-kicker" style={{ color: '#000' }}><b></b> THE TEAM</div>
            <h2 style={{ fontSize: '55px', color: '#000' }}>Built by engineers who scale systems.</h2>
            <div className="brx-team-grid" style={{ maxWidth: '700px', margin: '40px auto 0', textAlign: 'left', background: '#fff', padding: '40px', boxShadow: '10px 10px 0 #000', border: '3px solid #000', display: 'flex', gap: '30px', alignItems: 'center' }}>
              <img src="/founder.jpg" alt="Founder" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '4px solid #000' }} />
              <div>
                <h3 style={{ fontSize: '24px', margin: '0 0 10px' }}>Shriyash Soni</h3>
                <h4 style={{ fontSize: '16px', color: 'var(--accent)', margin: '0 0 15px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Founder / CEO</h4>
                <p style={{ color: '#333', fontSize: '16px', lineHeight: 1.6 }}>
                  Previous experience mentoring thousands of developers, deep expertise in EVM and decentralized architecture, and a proven track record of scaling communities.
                </p>
              </div>
            </div>
          </section>

          {/* SLIDE 11: The Ask */}
          <section className="brx-explore" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--i)', color: 'var(--p)', '--accent': 'var(--yellow)' } as React.CSSProperties}>
            <div className="brx-section-head" style={{ maxWidth: '900px' }}>
              <div className="brx-eyebrow">THE ASK</div>
              <h2 style={{ color: '#fff', fontSize: '60px' }}>$20M Seed Round.</h2>
              <p style={{ color: '#8c93a2' }}>To Bootstrap the Ecosystem and scale globally.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ padding: '25px', background: '#1a1e24', border: '1px solid #2b313b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <b style={{ fontSize: '32px', color: 'var(--accent)' }}>40%</b>
                <span style={{ fontSize: '16px' }}>Ecosystem Fund (Grants to builders)</span>
              </div>
              <div style={{ padding: '25px', background: '#1a1e24', border: '1px solid #2b313b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <b style={{ fontSize: '32px', color: 'var(--accent)' }}>30%</b>
                <span style={{ fontSize: '16px' }}>Infrastructure & DA Costs</span>
              </div>
              <div style={{ padding: '25px', background: '#1a1e24', border: '1px solid #2b313b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <b style={{ fontSize: '32px', color: 'var(--accent)' }}>20%</b>
                <span style={{ fontSize: '16px' }}>Marketing & Growth</span>
              </div>
              <div style={{ padding: '25px', background: '#1a1e24', border: '1px solid #2b313b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <b style={{ fontSize: '32px', color: 'var(--accent)' }}>10%</b>
                <span style={{ fontSize: '16px' }}>Security Audits & Engineering</span>
              </div>
            </div>
          </section>

          {/* SLIDE 12: Contact / Close */}
          <section className="brx-cta" style={{ flex: '0 0 100%', height: '100%', overflow: 'hidden', margin: 0, clipPath: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', '--accent': 'var(--b)' } as React.CSSProperties}>
            <div className="brx-kicker light" style={{ justifyContent: 'center', marginBottom: '20px' }}><b></b> JOIN US</div>
            <h2 style={{ fontSize: '70px', maxWidth: '100%' }}>Build the Future with <em>Brixs</em>.</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '50px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', color: '#fff' }}>
                <LinkIcon size={24} color="var(--accent)" /> www.brixs.space
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', color: '#fff' }}>
                <Map size={24} color="var(--accent)" /> docs.brixs.space
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', color: '#fff' }}>
                <Mail size={24} color="var(--accent)" /> founder@brixs.space
              </div>
            </div>

            <nav>
              <a href="https://testnet.brixs.space" className="brx-btn" style={{ background: 'var(--p)', color: 'var(--i)', padding: '20px 40px', fontSize: '18px' }}>Join the Testnet Today</a>
            </nav>
          </section>

        </div>
      </main>
      
      {/* Invisible Click Zones for Navigation */}
      <div onClick={prevSlide} style={{ position: 'fixed', top: '70px', bottom: 0, left: 0, width: '30%', zIndex: 10, cursor: currentSlide === 0 ? 'default' : 'pointer' }} title="Previous Slide" />
      <div onClick={nextSlide} style={{ position: 'fixed', top: '70px', bottom: 0, right: 0, width: '30%', zIndex: 10, cursor: currentSlide === totalSlides - 1 ? 'default' : 'pointer' }} title="Next Slide" />

    </div>
  );
}
