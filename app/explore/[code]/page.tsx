"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'; 
/* ============================
   THEME (matching your existing style)
============================ */

const THEME = {
  bg: "linear-gradient(180deg, #0a0d12 0%, #111720 100%)",
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.14)",
  softBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#e6e9ee",
  textSecondary: "#9aa3ad",
  textMuted: "rgba(154,163,173,0.75)",
  accent: "#c9a96a",
};

const DISPLAY_FONT = "'Cinzel', serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

/* ============================
   COMPONENT
============================ */

export default function LandingPage() {
  return (
    <main style={mainStyle}>
      {/* Navigation */}
      <nav style={navStyle}>
        <div style={navContainer}>
          <Link href="/" style={logoStyle}>
            Avirage
          </Link>

          <div style={navLinks}>
            <Link href="/about" style={navLink}>
              About
            </Link>
            <Link href="/codes" style={navLink}>
              Code Library
            </Link>
            <Link href="/faq" style={navLink}>
              FAQ
            </Link>
             <SignedIn>
  <Link href="/dashboard" style={navLink}>
    Dashboard
  </Link>
</SignedIn>
            <SignedOut>
  <SignInButton mode="modal">
    <button style={signInBtn}>Sign In</button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton />
</SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroSection}>
        <div style={heroContent}>
          {/* Kicker */}
          <div style={heroKicker}>Cultural Lens Archive</div>

          {/* Main Headline */}
          <h1 style={h1}>
            Discover Your
            <br />
            <span style={accentText}>Archetypal Tradition</span>
          </h1>

          {/* Subheading */}
          <p style={subheading}>
            Avirage maps the cultural lens through which you naturally experience and navigate the world.
            <br />
            Not a personality test—a lens identification system grounded in behavioral patterns and cultural archetypes.
          </p>

          {/* CTAs */}
          <div style={ctaRow}>
            <Link href="/quiz" style={primaryBtn}>
              Start Free Quiz
            </Link>
            <button onClick={() => scrollToSection('explainer')} style={secondaryBtn}>
              Learn More
            </button>
          </div>

          {/* Trust Badge */}
          <div style={trustBadge}>
            <span style={trustIcon}>✓</span>
            <span style={trustText}>
              Multi-framework triangulation • Culturally grounded • Non-deterministic
            </span>
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section id="explainer" style={explainerSection}>
        <div style={container}>
          <h2 style={h2}>How Avirage Works</h2>
          <p style={sectionDesc}>
            A structured interpretive system that identifies archetypal cultural traditions
            through cross-framework behavioral pattern analysis.
          </p>

          <div style={threeColGrid}>
            {/* What */}
            <div style={featureCard}>
              <div style={featureIcon}>1</div>
              <h3 style={featureTitle}>What</h3>
              <p style={featureText}>
                Maps your archetypal cultural lens—the tradition through which you naturally
                perceive, decide, and navigate the world.
              </p>
            </div>

            {/* How */}
            <div style={featureCard}>
              <div style={featureIcon}>2</div>
              <h3 style={featureTitle}>How</h3>
              <p style={featureText}>
                30 questions → 4 frameworks (Big Five, MBTI, Enneagram, Astrology) → 25 behavioral
                patterns → Your Cultural Code match.
              </p>
            </div>

            {/* Why */}
            <div style={featureCard}>
              <div style={featureIcon}>3</div>
              <h3 style={featureTitle}>Why</h3>
              <p style={featureText}>
                Self-knowledge, lifestyle alignment, community fit, creative direction, and
                understanding the lens through which you operate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Codes Preview */}
      <section style={codesPreviewSection}>
        <div style={container}>
          <h2 style={h2}>Example Cultural Codes</h2>
          <p style={sectionDesc}>20 archetypal traditions grounded in historical cultures</p>

          <div style={fourColGrid}>
            <CodePreviewCard
              name="Shokunin"
              origin="Japanese"
              description="Craft mastery lens: precision, harmony, quality as care"
              slug="shokunin"
            />
            <CodePreviewCard
              name="Alethir"
              origin="Ancient Greek"
              description="Inquiry lens: truth through reasoning, debate, and exploration"
              slug="alethir"
            />
            <CodePreviewCard
              name="Namsea"
              origin="Vietnamese + Thai"
              description="Flow lens: adaptability, ease, conflict avoidance mastery"
              slug="namsea"
            />
            <CodePreviewCard
              name="Enzuka"
              origin="Maasai + Zulu"
              description="Collective honor lens: strength through people, warrior discipline"
              slug="enzuka"
            />
          </div>

          <div style={centerAlign}>
            <Link href="/codes" style={secondaryBtnLarge}>
              Browse All 20 Codes
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={finalCtaSection}>
        <div style={finalCtaCard}>
          <h2 style={finalCtaTitle}>Ready to discover your lens?</h2>
          <p style={finalCtaText}>
            Takes 10 minutes. Free. No login required to start.
          </p>
          <Link href="/quiz" style={primaryBtnLarge}>
            Start Quiz Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={footerContainer}>
          <div style={footerBrand}>
            <div style={footerLogo}>Avirage</div>
            <p style={footerTagline}>Cultural lens identification system</p>
          </div>

          <div style={footerLinks}>
            <div style={footerCol}>
              <div style={footerColTitle}>Learn</div>
              <Link href="/about" style={footerLink}>
                About
              </Link>
              <Link href="/codes" style={footerLink}>
                Code Library
              </Link>
              <Link href="/faq" style={footerLink}>
                FAQ
              </Link>
            </div>

            <div style={footerCol}>
              <div style={footerColTitle}>Start</div>
              <Link href="/quiz" style={footerLink}>
                Take Quiz
              </Link>
              <Link href="/quiz" style={footerLink}>
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div style={footerBottom}>
          <p style={footerCopyright}>© 2025 Avirage. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

/* ============================
   HELPER COMPONENTS
============================ */

function CodePreviewCard({
  name,
  origin,
  description,
  slug,
}: {
  name: string;
  origin: string;
  description: string;
  slug: string;
}) {
  return (
    <Link href={`/codepages/${slug}`} style={codeCard}>
      <div style={codeCardHeader}>
        <div style={codeCardName}>{name}</div>
        <div style={codeCardOrigin}>{origin}</div>
      </div>
      <p style={codeCardDesc}>{description}</p>
      <div style={codeCardArrow}>→</div>
    </Link>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ============================
   STYLES
============================ */

const mainStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: BODY_FONT,
  background: THEME.bg,
  color: THEME.textPrimary,
};

// Navigation
const navStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "rgba(10,13,18,0.92)",
  backdropFilter: "blur(12px)",
  borderBottom: `1px solid ${THEME.softBorder}`,
};

const navContainer: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  textDecoration: "none",
};

const navLinks: CSSProperties = {
  display: "flex",
  gap: 32,
  alignItems: "center",
};

const navLink: CSSProperties = {
  color: THEME.textSecondary,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.02em",
  transition: "color 0.2s",
};

const signInBtn: CSSProperties = {
  padding: "8px 20px",
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  color: THEME.textPrimary,
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.04em",
};

// Hero
const heroSection: CSSProperties = {
  padding: "120px 24px 100px",
  textAlign: "center",
};

const heroContent: CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
};

const heroKicker: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.20em",
  textTransform: "uppercase",
  color: THEME.accent,
  fontWeight: 900,
  marginBottom: 24,
};

const h1: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 64,
  fontWeight: 900,
  lineHeight: 1.1,
  margin: "0 0 24px",
  color: THEME.textPrimary,
};

const accentText: CSSProperties = {
  background: "linear-gradient(135deg, #c9a96a 0%, #d4b87a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subheading: CSSProperties = {
  fontSize: 18,
  lineHeight: 1.7,
  color: THEME.textSecondary,
  maxWidth: 680,
  margin: "0 auto 40px",
};

const ctaRow: CSSProperties = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  marginBottom: 24,
};

const primaryBtn: CSSProperties = {
  padding: "16px 32px",
  borderRadius: 14,
  border: `1px solid rgba(201,169,106,0.45)`,
  background: "rgba(201,169,106,0.12)",
  color: THEME.textPrimary,
  fontWeight: 900,
  fontSize: 14,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const secondaryBtn: CSSProperties = {
  padding: "16px 32px",
  borderRadius: 14,
  border: `1px solid ${THEME.softBorder}`,
  background: "transparent",
  color: THEME.textSecondary,
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: "0.04em",
  cursor: "pointer",
};

const trustBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  borderRadius: 12,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
};

const trustIcon: CSSProperties = {
  fontSize: 14,
  color: THEME.accent,
};

const trustText: CSSProperties = {
  fontSize: 12,
  color: THEME.textMuted,
  fontWeight: 600,
};

// Sections
const explainerSection: CSSProperties = {
  padding: "80px 24px",
  background: "rgba(255,255,255,0.02)",
};

const container: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
};

const h2: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 40,
  fontWeight: 900,
  textAlign: "center",
  marginBottom: 16,
};

const sectionDesc: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  textAlign: "center",
  maxWidth: 680,
  margin: "0 auto 60px",
  lineHeight: 1.7,
};

const threeColGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const featureCard: CSSProperties = {
  padding: 32,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
};

const featureIcon: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 12,
  border: `1px solid rgba(201,169,106,0.30)`,
  background: "rgba(201,169,106,0.08)",
  color: THEME.accent,
  fontWeight: 900,
  fontSize: 20,
  display: "grid",
  placeItems: "center",
  marginBottom: 16,
};

const featureTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  marginBottom: 12,
  color: THEME.textPrimary,
};

const featureText: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: THEME.textSecondary,
  margin: 0,
};

// Code Preview
const codesPreviewSection: CSSProperties = {
  padding: "80px 24px",
};

const fourColGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 20,
  marginBottom: 40,
};

const codeCard: CSSProperties = {
  padding: 24,
  borderRadius: 16,
  border: `1px solid ${THEME.softBorder}`,
  background: THEME.panel,
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s",
  cursor: "pointer",
};

const codeCardHeader: CSSProperties = {
  marginBottom: 12,
};

const codeCardName: CSSProperties = {
  fontSize: 18,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 4,
};

const codeCardOrigin: CSSProperties = {
  fontSize: 12,
  color: THEME.textMuted,
  fontWeight: 600,
  letterSpacing: "0.04em",
};

const codeCardDesc: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: THEME.textSecondary,
  margin: "0 0 16px",
  flex: 1,
};

const codeCardArrow: CSSProperties = {
  fontSize: 20,
  color: THEME.accent,
  opacity: 0.5,
};

const centerAlign: CSSProperties = {
  textAlign: "center",
};

const secondaryBtnLarge: CSSProperties = {
  padding: "14px 28px",
  borderRadius: 14,
  border: `1px solid ${THEME.border}`,
  background: THEME.panelStrong,
  color: THEME.textPrimary,
  fontWeight: 800,
  fontSize: 14,
  letterSpacing: "0.04em",
  textDecoration: "none",
  display: "inline-block",
  cursor: "pointer",
};

// Final CTA
const finalCtaSection: CSSProperties = {
  padding: "80px 24px",
};

const finalCtaCard: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: 60,
  borderRadius: 20,
  border: `1px solid ${THEME.border}`,
  background: "rgba(255,255,255,0.02)",
  textAlign: "center",
};

const finalCtaTitle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 36,
  fontWeight: 900,
  marginBottom: 16,
};

const finalCtaText: CSSProperties = {
  fontSize: 16,
  color: THEME.textSecondary,
  marginBottom: 32,
};

const primaryBtnLarge: CSSProperties = {
  ...primaryBtn,
  padding: "18px 40px",
  fontSize: 15,
};

// Footer
const footerStyle: CSSProperties = {
  borderTop: `1px solid ${THEME.softBorder}`,
  padding: "60px 24px 32px",
  background: "rgba(0,0,0,0.2)",
};

const footerContainer: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto 40px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 60,
};

const footerBrand: CSSProperties = {};

const footerLogo: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 24,
  fontWeight: 900,
  color: THEME.accent,
  marginBottom: 8,
};

const footerTagline: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  margin: 0,
};

const footerLinks: CSSProperties = {
  display: "flex",
  gap: 80,
  justifyContent: "flex-end",
};

const footerCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const footerColTitle: CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  color: THEME.textPrimary,
  marginBottom: 4,
};

const footerLink: CSSProperties = {
  fontSize: 14,
  color: THEME.textSecondary,
  textDecoration: "none",
};

const footerBottom: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  paddingTop: 24,
  borderTop: `1px solid ${THEME.softBorder}`,
  textAlign: "center",
};

const footerCopyright: CSSProperties = {
  fontSize: 13,
  color: THEME.textMuted,
  margin: 0,
};
