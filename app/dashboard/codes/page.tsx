// app/codepages/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CODE_PAGES, isCodeSlug, type CodeSlug } from "@/lib/codePages";

type PageProps = {
  params: { slug: string };
};

function getPage(slug: string) {
  if (!isCodeSlug(slug)) return null;
  return CODE_PAGES[slug as CodeSlug];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getPage(params.slug);
  if (!page) return { title: "Not Found • Avirage" };

  const title = `${page.codeName} • Avirage`;
  const description =
    page.summary ||
    page.tagline ||
    "Explore your archetypal tradition match and what it means for your life lens.";

  return { title, description };
}

export default function CodePage({ params }: PageProps) {
  const page = getPage(params.slug);

  if (!page) {
    return (
      <main style={wrap}>
        <div style={card}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontWeight: 800, fontSize: 18 }}>
            404 — Code page not found
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 10, lineHeight: 1.6 }}>
            This slug doesn’t exist in <code style={code}>lib/codePages.ts</code>.
          </p>

          <div style={{ marginTop: 18 }}>
            <Link href="/" style={linkBtn}>
              ← Back to Archive
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const origin = page.origin;

  return (
    <main style={wrap}>
      <div style={{ width: "min(980px, 92vw)", margin: "0 auto", padding: "56px 0" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 18 }}>
          <Link href="/" style={linkGhost}>
            ← Back
          </Link>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={pill}>{page.codeName}</span>
            {page.levels?.level1 && <span style={pill}>Level 1: {page.levels.level1}</span>}
            {page.levels?.level2 && <span style={pill}>Level 2: {page.levels.level2}</span>}
          </div>
        </div>

        {/* Hero */}
        <section style={heroCard}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)", fontWeight: 800 }}>
              Cultural Code Page
            </div>

            <div style={{ fontSize: 44, fontWeight: 950, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.05 }}>
              {page.codeName}
            </div>

            {page.fullName && (
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
                {page.fullName}
              </div>
            )}

            {(page.tagline || page.summary) && (
              <p style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontSize: 15, maxWidth: 760 }}>
                {page.summary || page.tagline}
              </p>
            )}

            {/* Hero Image (optional) */}
            <div style={{ marginTop: 18, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)" }}>
              {/* Put: public/codepages/<slug>/hero.jpg */}
              {/* Example: public/codepages/shokunin/hero.jpg */}
              <img
                src={`/codepages/${params.slug}/hero.jpg`}
                alt={`${page.codeName} visual`}
                style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
                onError={(e) => {
                  // Hide if missing
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        </section>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18, marginTop: 18 }}>
          {/* Left: main explanation */}
          <section style={card}>
            <h2 style={h2}>What this code is (in plain terms)</h2>
            <p style={p}>{page.whatItIs ?? "—"}</p>

            <h2 style={h2}>Core traits</h2>
            <ul style={ul}>
              {(page.coreTraits ?? []).map((t: string, i: number) => (
                <li key={i} style={li}>
                  {t}
                </li>
              ))}
              {(!page.coreTraits || page.coreTraits.length === 0) && (
  <li style={liMuted}>No traits added yet.</li>
)}

            </ul>

            <h2 style={h2}>How it shows up in lifestyle</h2>
            <p style={p}>{page.lifestyle ?? "—"}</p>

            <h2 style={h2}>Good environments</h2>
            <ul style={ul}>
              {(page.goodEnvironments ?? []).map((t: string, i: number) => (
                <li key={i} style={li}>
                  {t}
                </li>
              ))}
              {(!page.goodEnvironments || page.goodEnvironments.length === 0) && <li style={liMuted}>No environments added yet.</liMuted>}
            </ul>

            <h2 style={h2}>Activities that fit</h2>
            <ul style={ul}>
              {(page.activities ?? []).map((t: string, i: number) => (
                <li key={i} style={li}>
                  {t}
                </li>
              ))}
              {(!page.activities || page.activities.length === 0) && <li style={liMuted}>No activities added yet.</liMuted>}
            </ul>
          </section>

          {/* Right: origin + images */}
          <aside style={card}>
            <h3 style={h3}>Origin & lineage</h3>

            {/* origin can be string OR object */}
            {typeof origin === "string" ? (
              <p style={pSmall}>{origin}</p>
            ) : origin ? (
              <div style={{ display: "grid", gap: 10 }}>
                <div style={kvRow}>
                  <div style={kvKey}>Level 1</div>
                  <div style={kvVal}>{origin.level1}</div>
                </div>

                {origin.lineage?.length ? (
                  <div>
                    <div style={{ ...kvKey, marginBottom: 6 }}>Lineage</div>
                    <ul style={{ ...ul, marginTop: 0 }}>
                      {origin.lineage.map((x: string, i: number) => (
                        <li key={i} style={li}>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {origin.notes ? <p style={pSmall}>{origin.notes}</p> : null}
              </div>
            ) : (
              <p style={pSmall}>—</p>
            )}

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px 0" }} />

            <h3 style={h3}>Images (optional)</h3>
            <p style={pSmall}>
              Put images here:
              <br />
              <code style={code}>public/codepages/{params.slug}/</code>
              <br />
              Suggested names:
              <br />
              <code style={code}>hero.jpg</code>, <code style={code}>a.jpg</code>, <code style={code}>b.jpg</code>
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              <img
                src={`/codepages/${params.slug}/a.jpg`}
                alt=""
                style={sideImg}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <img
                src={`/codepages/${params.slug}/b.jpg`}
                alt=""
                style={sideImg}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </div>
          </aside>
        </div>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Link href="/" style={linkBtn}>
            Back to results
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ============================
   STYLES
============================ */

const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #070a0f 0%, #0c1118 60%, #070a0f 100%)",
  color: "white",
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 18,
  padding: 18,
  boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  backdropFilter: "blur(14px)",
};

const heroCard: React.CSSProperties = {
  ...card,
  padding: 22,
};

const h2: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  letterSpacing: "0.01em",
  marginTop: 16,
  marginBottom: 8,
};

const h3: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.78)",
  marginBottom: 10,
};

const p: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.7,
  fontSize: 14,
  marginTop: 0,
};

const pSmall: React.CSSProperties = {
  color: "rgba(255,255,255,0.70)",
  lineHeight: 1.7,
  fontSize: 13,
  marginTop: 0,
};

const ul: React.CSSProperties = {
  margin: "0 0 8px 0",
  paddingLeft: 18,
  color: "rgba(255,255,255,0.78)",
};

const li: React.CSSProperties = {
  marginBottom: 6,
  lineHeight: 1.6,
  fontSize: 14,
};

const liMuted: React.CSSProperties = {
  marginBottom: 6,
  lineHeight: 1.6,
  fontSize: 14,
  color: "rgba(255,255,255,0.55)",
};

const pill: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  padding: "8px 10px",
  borderRadius: 999,
  fontSize: 12,
  color: "rgba(255,255,255,0.78)",
  fontWeight: 800,
};

const linkGhost: React.CSSProperties = {
  color: "rgba(255,255,255,0.80)",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 900,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.03)",
  padding: "10px 12px",
  borderRadius: 12,
};

const linkBtn: React.CSSProperties = {
  display: "inline-block",
  color: "#0b0f14",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 950,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: "linear-gradient(135deg, #c9a96a 0%, #e6d2a2 100%)",
  padding: "12px 14px",
  borderRadius: 12,
};

const code: React.CSSProperties = {
  padding: "2px 6px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.85)",
};

const kvRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "baseline",
};

const kvKey: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.58)",
};

const kvVal: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  color: "rgba(255,255,255,0.86)",
  textAlign: "right",
};

const sideImg: React.CSSProperties = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  display: "block",
};
