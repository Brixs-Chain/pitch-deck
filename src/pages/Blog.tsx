import React from 'react';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ArrowRight, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPublishedPosts,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div style={{ backgroundColor: '#0a0a0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Navbar Minimal */}
      <nav style={{ display: 'flex', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <img src="/full_logo.png" alt="Brixs Logo" style={{ height: '30px' }} />
        </Link>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Link to="/" style={{ color: '#8c93a2', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Home</Link>
          <Link to="/admin" style={{ color: '#8c93a2', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Admin</Link>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ padding: '80px 40px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(0,255,204,0.05) 0%, rgba(10,10,11,1) 100%)' }}>
        <h1 style={{ fontSize: '60px', margin: '0 0 20px 0' }}>Brixs <span style={{ color: '#00ffcc' }}>Insights</span></h1>
        <p style={{ fontSize: '20px', color: '#8c93a2', maxWidth: '600px', margin: '0 auto' }}>Deep dives into the tech, vision, and growth of the highest performance zero-gas L2 ecosystem.</p>
      </header>

      {/* Blog Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
        {status === 'LoadingFirstPage' && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#00ffcc' }}>Loading insights...</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
          {results.map(post => (
            <article key={post._id} style={{ background: '#12141a', border: '1px solid #1f2229', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform='translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={post.templateImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {post.tags && post.tags[0] && (
                  <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#00ffcc', color: '#000', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '20px' }}>
                    {post.tags[0]}
                  </span>
                )}
              </div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '13px', color: '#8c93a2', marginBottom: '10px' }}>
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • By {post.author}
                </div>
                <h2 style={{ fontSize: '24px', margin: '0 0 15px', lineHeight: 1.3 }}>{post.title}</h2>
                <div 
                  style={{ color: '#8c93a2', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 300) + '...' }}
                />
                <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid #1f2229' }}>
                  <span style={{ color: '#00ffcc', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 600 }}>
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {status === 'CanLoadMore' && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button 
              onClick={() => loadMore(5)}
              style={{ background: 'transparent', border: '2px solid #00ffcc', color: '#00ffcc', padding: '15px 40px', fontSize: '16px', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#00ffcc'; e.currentTarget.style.color = '#000'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ffcc'; }}
            >
              Load More
            </button>
          </div>
        )}
        
        {status === 'LoadingMore' && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#00ffcc' }}>Loading more...</div>
        )}
      </main>
    </div>
  );
}
