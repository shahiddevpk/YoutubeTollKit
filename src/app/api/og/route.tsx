import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'YouTubeFreeToolkit';
    const desc = searchParams.get('desc') || '100% Free Creator Suite & YouTube SEO Toolkit';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            backgroundColor: '#090d16',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(239, 68, 68, 0.08) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top Brand Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '24px',
                boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.5)',
              }}
            >
              ▶
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                YouTube<span style={{ color: '#ef4444' }}>Free</span>Toolkit
              </span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>youtubefreetoolkit.com</span>
            </div>
          </div>

          {/* Center Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto 0' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: '6px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                width: 'max-content',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              Free YouTube Creator Tool
            </div>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: '900',
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-1px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {desc}
            </p>
          </div>

          {/* Bottom Trust Highlights */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '24px',
              fontSize: '16px',
              color: '#cbd5e1',
            }}
          >
            <div style={{ display: 'flex', gap: '32px' }}>
              <span>✓ Public Tools Need No Login</span>
              <span>✓ 100% Free & Unlimited</span>
              <span>✓ Policy & ToS Compliant</span>
            </div>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Instant Access →</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(`Failed to generate the image: ${message}`, {
      status: 500,
    });
  }
}
