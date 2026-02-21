import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

// ── Confetti (success only) ───────────────────────────────────────────────────
function Confetti({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const COLS = ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];
    const p = Array.from({ length: 60 }, () => ({
      x: Math.random() * cv.width, y: Math.random() * -cv.height,
      r: Math.random() * 5 + 2, speed: Math.random() * 1.5 + 0.8,
      color: COLS[Math.floor(Math.random() * COLS.length)],
      tilt: 0, ta: 0, ts: Math.random() * 0.06 + 0.02,
      op: Math.random() * 0.6 + 0.4,
      shape: Math.random() > 0.5 ? "circle" : "rect"
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      p.forEach(q => {
        ctx.globalAlpha = q.op; ctx.fillStyle = q.color;
        if (q.shape === "circle") {
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.tilt);
          ctx.fillRect(-q.r, -q.r / 2, q.r * 2, q.r); ctx.restore();
        }
        q.ta += q.ts; q.tilt = Math.sin(q.ta) * 14;
        q.y += q.speed; q.x += Math.sin(q.ta) * 0.4;
        if (q.y > cv.height) { q.y = -10; q.x = Math.random() * cv.width; }
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  if (!active) return null;
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }} />;
}

// ── Step Progress Bar ─────────────────────────────────────────────────────────
const STEPS = ["Personal Info", "Business", "Contact", "Media"];

function StepBar({ current }) {
  return (
    <div className="step-bar">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="step-item">
            <div className={`step-circle ${i < current ? "done" : i === current ? "active" : ""}`}>
              {i < current
                ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                : <span>{i + 1}</span>
              }
            </div>
            <span className={`step-label ${i === current ? "active" : ""}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`step-connector ${i < current ? "done" : ""}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Field Component ───────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="field">
      {label && (
        <label className="field-label">
          {label}{required && <span className="field-req"> *</span>}
        </label>
      )}
      {children}
    </div>
  );
}

// ── Perks data ────────────────────────────────────────────────────────────────
const PERKS = [
  { icon: "🎁", title: "3 Months FREE Pro Plan", desc: "No monthly fee for 90 days" },
  { icon: "🚀", title: "Priority Launch Exposure", desc: "Higher search visibility at launch" },
  { icon: "🏅", title: "Founding Vendor Badge", desc: "Stand out in your category" },
  { icon: "🔒", title: "Lock $24.99 Pricing", desc: "Before potential price increase" },
  { icon: "💰", title: "Lower Commission Tier", desc: "Earn more per confirmed booking" },
];


// ── Main Modal ────────────────────────────────────────────────────────────────
export default function PreLaunchModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [direction, setDir] = useState("fwd");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [businessName, setBizName] = useState("");
  const [businessDescription, setBizDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelCat] = useState("");
  const [selectedSubCategory, setSelSub] = useState("");

  const [businessContactPerson, setBizContact] = useState("");
  const [businessEmail, setBizEmail] = useState("");
  const [businessPhone, setBizPhone] = useState("");
  const [address, setAddress] = useState("");

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetch("https://party-hub-backend.onrender.com/api/categories")
      .then(r => r.json())
      .then(d => { if (d.success) setCategories(d.data.categories); });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    fetch("https://party-hub-backend.onrender.com/api/subcategories")
      .then(r => r.json())
      .then(d => {
        if (d.success)
          setSubCategories(d.data.subCategories.filter(s => s.category._id === selectedCategory));
      });
  }, [selectedCategory]);

  const handleImageUpload = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const results = await Promise.all(
        Array.from(files).map(async file => {
          const fd = new FormData(); fd.append("file", file);
          const res = await fetch("https://party-hub-backend.onrender.com/api/upload/uploadImage", { method: "POST", body: fd });
          if (!res.ok) throw new Error();
          const d = await res.json();
          return d.success ? d.data.imageUrl : null;
        })
      );
      setUploadedImages(p => [...p, ...results.filter(Boolean)]);
    } catch { toast.error("Image upload failed"); }
    setUploading(false);
  };

  // const goNext = () => { setDir("fwd"); setStep(s => s + 1); };
  const goNext = () => {
    setDir("fwd");

    // STEP 0 Validation
    if (step === 0) {
      if (!name.trim()) return toast.error("Full name is required");
      if (!email.trim()) return toast.error("Email is required");
      if (!isValidEmail(email)) return toast.error("Enter valid email address");
      if (phone && !isValidPhone(phone)) return toast.error("Enter valid phone number");
    }

    // STEP 1 Validation
    if (step === 1) {
      if (!businessName.trim()) return toast.error("Business name is required");
    }

    // STEP 2 Validation
    if (step === 2) {
      if (businessEmail && !isValidEmail(businessEmail))
        return toast.error("Enter valid business email");

      if (businessPhone && !isValidPhone(businessPhone))
        return toast.error("Enter valid business phone number");
    }

    setStep((s) => s + 1);
  };

  const goBack = () => { setDir("bck"); setStep(s => s - 1); };

  // ── Validation Helpers ─────────────────────────────

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const isValidPhone = (phone) => {
    // Accept +91XXXXXXXXXX or 10 digit number
    return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(phone);
  };


  const submit = async () => {
    if (!name.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!isValidEmail(email)) return toast.error("Enter valid email address");
    if (!businessName.trim()) return toast.error("Business name is required");

    if (phone && !isValidPhone(phone))
      return toast.error("Enter valid phone number");

    if (businessEmail && !isValidEmail(businessEmail))
      return toast.error("Enter valid business email");

    if (businessPhone && !isValidPhone(businessPhone))
      return toast.error("Enter valid business phone number");
    setLoading(true);
    try {
      const res = await fetch("https://party-hub-backend.onrender.com/api/prelaunch-register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          businessName, businessDescription,
          businessCategory: selectedCategory, businessSubCategory: selectedSubCategory,
          businessContactPerson, businessEmail, businessPhone, address,
          displayImages: uploadedImages,
          location: { coordinates: [72.8347, 19.1394] },
        }),
      });
      const d = await res.json();
      if (d.success) { toast.success(d.message || "Registered successfully!"); setDone(true); }
      else toast.error(d.message || "Something went wrong");
    } catch { toast.error("Server error. Please try again."); }
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(() => { setOpen(true); document.body.style.overflow = "hidden"; }, 600);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  const close = () => { setOpen(false); document.body.style.overflow = ""; };

  if (!open) return null;

  return (
    <>
      <style>{CSS}</style>
      <Confetti active={done} />

      <div className="overlay" onClick={close}>
        <div className="modal" onClick={e => e.stopPropagation()}>

          {/* ── LEFT SIDEBAR ── */}
          <aside className="sidebar">
            <div className="sidebar-logo">
              <img src="party-hub-logo.png" alt="Party Hub"
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div className="sidebar-logo-fallback"><span>🎊</span></div>
            </div>

            <h2 className="sidebar-brand">PartyHub Connect</h2>
            <p className="sidebar-tagline">Early Bird Vendor Launch</p>


            <div className="sidebar-divider" />

            <div className="sidebar-spots">
              <span className="sidebar-dot" />
              <span><strong>Limited</strong> category spots remaining</span>
            </div>

            <p className="sidebar-perks-title">What you get</p>
            <ul className="sidebar-perks">
              {PERKS.map((p, i) => (
                <li key={i} className="perk-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="perk-icon">{p.icon}</div>
                  <div className="perk-text">
                    <span className="perk-title">{p.title}</span>
                    <span className="perk-desc">{p.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="sidebar-footer">No credit card · Cancel anytime</p>
          </aside>

          {/* ── RIGHT CONTENT ── */}
          <main className="content">
            <button className="btn-close" onClick={close} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            {!done ? (
              <>
                <div className="content-header">
                  <span className="badge">Pre-Launch Exclusive</span>
                  <h1 className="content-title">Secure Your Early Bird Vendor Benefits</h1>
                  <p className="content-sub">Complete the form below to secure your early bird benefits.</p>
                </div>

                <StepBar current={step} />

                <div className={`step-content ${direction === "fwd" ? "anim-fwd" : "anim-bck"}`} key={step}>

                  {/* STEP 0 — Personal */}
                  {step === 0 && (
                    <div className="form-section">
                      <div className="form-grid-2">
                        <Field label="Full Name" required>
                          <input className="inp" placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} />
                        </Field>
                        <Field label="Email Address" required>
                          <input className="inp" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </Field>
                      </div>
                      <Field label="Phone Number">
                        <input
                          className="inp"
                          placeholder="+91 9876543210"
                          value={phone}
                          maxLength={13}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
                        />

                      </Field>
                    </div>
                  )}

                  {/* STEP 1 — Business */}
                  {step === 1 && (
                    <div className="form-section">
                      <Field label="Business Name" required>
                        <input className="inp" placeholder="Your business name" value={businessName} onChange={e => setBizName(e.target.value)} />
                      </Field>
                      <Field label="Business Description">
                        <textarea className="inp inp-textarea" placeholder="Briefly describe what your business offers..." rows={3}
                          value={businessDescription} onChange={e => setBizDesc(e.target.value)} />
                      </Field>
                      <div className="form-grid-2">
                        <Field label="Category">
                          <select className="inp inp-select" value={selectedCategory} onChange={e => setSelCat(e.target.value)}>
                            <option value="">Select category</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                          </select>
                        </Field>
                        <Field label="Sub-Category">
                          <select className="inp inp-select" value={selectedSubCategory} onChange={e => setSelSub(e.target.value)} disabled={!selectedCategory}>
                            <option value="">Select sub-category</option>
                            {subCategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Contact */}
                  {step === 2 && (
                    <div className="form-section">
                      <Field label="Contact Person Name">
                        <input className="inp" placeholder="Name of point of contact" value={businessContactPerson} onChange={e => setBizContact(e.target.value)} />
                      </Field>
                      <div className="form-grid-2">
                        <Field label="Business Email">
                          <input className="inp" type="email" placeholder="business@example.com" value={businessEmail} onChange={e => setBizEmail(e.target.value)} />
                        </Field>
                        <Field label="Business Phone">
                          <input className="inp" placeholder="+91 98765 00000" value={businessPhone} maxLength={13} onChange={e => setBizPhone(e.target.value.replace(/[^0-9+]/g, ""))} />
                        </Field>
                      </div>
                      <Field label="Business Address">
                        <input className="inp" placeholder="Full address" value={address} onChange={e => setAddress(e.target.value)} />
                      </Field>
                    </div>
                  )}

                  {/* STEP 3 — Media */}
                  {step === 3 && (
                    <div className="form-section">
                      <Field label="Business Images">
                        <div className="upload-zone" onClick={() => document.getElementById("ph-file-input").click()}>
                          <div className="upload-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <p className="upload-text">Click to upload images</p>
                          <p className="upload-hint">PNG, JPG · Max 5MB each</p>
                          <input id="ph-file-input" type="file" multiple style={{ display: "none" }} onChange={e => handleImageUpload(e.target.files)} />
                        </div>
                      </Field>

                      {uploading && (
                        <div className="uploading-row">
                          <span className="spinner" /> Uploading images…
                        </div>
                      )}

                      {uploadedImages.length > 0 && (
                        <div className="img-grid">
                          {uploadedImages.map((src, i) => (
                            <div key={i} className="img-thumb">
                              <img src={src} alt="" />
                              <button className="img-remove" onClick={() => setUploadedImages(p => p.filter((_, j) => j !== i))}>
                                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="review-card">
                        <p className="review-card-title">Review your details</p>
                        <div className="review-row"><span>Name</span><strong>{name || "—"}</strong></div>
                        <div className="review-row"><span>Email</span><strong>{email || "—"}</strong></div>
                        <div className="review-row"><span>Business</span><strong>{businessName || "—"}</strong></div>
                        <div className="review-row last"><span>Phone</span><strong>{phone || "—"}</strong></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="form-nav">
                  {step > 0
                    ? <button className="btn-back" onClick={goBack}>← Back</button>
                    : <div />
                  }
                  {step < 3
                    ? <button className="btn-primary" onClick={goNext}>Continue →</button>
                    : <button className="btn-primary" onClick={submit} disabled={loading}>
                      {loading ? <><span className="spinner btn-spinner" /> Submitting…</> : "Submit Registration →"}
                    </button>
                  }
                </div>

                <p className="pricing-note">
                  After 3-month free period:
                  Pro – $24.99/month
                  Premium – $49.99/month
                  Commission applies on confirmed bookings only.

                </p>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="success-state">
                <div className="success-check">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6 12-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="success-title">You're registered!</h2>
                <p className="success-sub">
                  Welcome aboard, <strong>{name}</strong>.
                  You’ve secured Early Bird access with priority exposure and reduced commission.
                  Our onboarding team will contact you shortly.
                </p>

                <div className="success-badge">🚀 Early Bird Vendor · Spot Reserved</div>

              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --font:         'Plus Jakarta Sans', sans-serif;

  --ink-900:      #0F0A1E;
  --ink-700:      #2D2450;
  --ink-500:      #6B5E8A;
  --ink-300:      #A99EC0;
  --ink-100:      #EDE8F5;
  --ink-50:       #F7F5FB;
  --white:        #FFFFFF;

  --brand:        #5B3FE8;
  --brand-dark:   #4630C5;
  --brand-light:  #EEE9FD;
  --brand-alpha:  rgba(91,63,232,0.08);

  --green:        #059669;
  --green-bg:     #ECFDF5;
  --green-border: #A7F3D0;

  --border:       #E4DEEF;

  --shadow-modal: 0 8px 48px rgba(15,10,30,0.16), 0 2px 8px rgba(15,10,30,0.06);
  --shadow-btn:   0 2px 8px rgba(91,63,232,0.3);
  --shadow-btn-h: 0 6px 20px rgba(91,63,232,0.4);

  --r-lg: 20px;
  --r-md: 10px;
  --r-sm: 8px;
}

/* ── OVERLAY ── */
.overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center; padding: 16px;
  background: rgba(15,10,30,0.5);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.2s ease;
  font-family: var(--font);
}

/* ── MODAL ── */
.modal {
  display: flex; width: 100%; max-width: 880px; max-height: 94vh;
  background: var(--white);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-modal);
  border: 1px solid var(--border);
  animation: slideUp 0.38s cubic-bezier(0.22,1,0.36,1);
}

/* ── SIDEBAR ── */
.sidebar {
  width: 248px; flex-shrink: 0;
  background: #110C24;
  padding: 32px 22px;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
}
.sidebar::after {
  content: '';
  position: absolute; bottom: -90px; right: -90px;
  width: 220px; height: 220px; border-radius: 50%;
  background: radial-gradient(circle, rgba(91,63,232,0.3) 0%, transparent 70%);
  pointer-events: none;
}
.sidebar-logo {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px; overflow: hidden; flex-shrink: 0;
}
.sidebar-logo img { width: 100%; height: 100%; object-fit: cover; border-radius: 11px; }
.sidebar-logo-fallback {
  display: none; align-items: center; justify-content: center;
  width: 100%; height: 100%; font-size: 24px;
}
.sidebar-brand {
  font-size: 17px; font-weight: 700; color: #FFFFFF;
  letter-spacing: -0.2px; margin-bottom: 2px;
}
.sidebar-tagline {
  font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.35);
  text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 22px;
}
.sidebar-divider {
  height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 18px;
}
.sidebar-spots {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.55);
  margin-bottom: 22px; line-height: 1.4;
}
.sidebar-spots strong { color: #FBBF24; font-weight: 700; }
.sidebar-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #34D399; flex-shrink: 0;
  animation: dotPulse 2s infinite;
}
.sidebar-perks-title {
  font-size: 10px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(255,255,255,0.25);
  margin-bottom: 12px;
}
.sidebar-perks { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.perk-item {
  display: flex; align-items: flex-start; gap: 10px;
  animation: fadeSlideUp 0.35s ease backwards;
}
.perk-icon {
  font-size: 15px; width: 30px; height: 30px; flex-shrink: 0;
  border-radius: 8px; background: rgba(255,255,255,0.06);
  display: flex; align-items: center; justify-content: center;
}
.perk-text { display: flex; flex-direction: column; gap: 1px; }
.perk-title { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85); }
.perk-desc  { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.35); }
.sidebar-footer {
  margin-top: auto; padding-top: 20px;
  font-size: 11px; font-weight: 400;
  color: rgba(255,255,255,0.22); line-height: 1.6;
}

/* ── CONTENT ── */
.content {
  flex: 1; padding: 34px 34px 26px;
  display: flex; flex-direction: column; overflow-y: auto;
  position: relative;
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}
.content::-webkit-scrollbar { width: 4px; }
.content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.btn-close {
  position: absolute; top: 14px; right: 14px;
  width: 28px; height: 28px; border-radius: var(--r-sm);
  background: var(--ink-50); border: 1px solid var(--border);
  color: var(--ink-300); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.btn-close:hover {
  background: #FEF2F2; border-color: #FECACA; color: #DC2626;
}

/* Header */
.content-header { margin-bottom: 22px; padding-right: 30px; }

.badge {
  display: inline-block;
  font-size: 10px; font-weight: 700; letter-spacing: 0.9px; text-transform: uppercase;
  color: var(--brand); background: var(--brand-light);
  border-radius: 6px; padding: 3px 9px; margin-bottom: 10px;
}
.content-title {
  font-size: 21px; font-weight: 700; color: var(--ink-900);
  letter-spacing: -0.35px; line-height: 1.25; margin-bottom: 5px;
}
.content-sub {
  font-size: 13px; font-weight: 400; color: var(--ink-500); line-height: 1.6;
}

/* ── STEP BAR ── */
.step-bar {
  display: flex; align-items: center; margin-bottom: 26px;
}
.step-item {
  display: flex; flex-direction: column; align-items: center; gap: 5px; flex-shrink: 0;
}
.step-circle {
  width: 26px; height: 26px; border-radius: 50%;
  border: 1.5px solid var(--border); background: var(--white); color: var(--ink-300);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
  transition: all 0.25s ease;
}
.step-circle.active {
  background: var(--brand); border-color: var(--brand); color: var(--white);
  box-shadow: 0 0 0 3px rgba(91,63,232,0.15);
}
.step-circle.done {
  background: var(--green); border-color: var(--green); color: var(--white);
}
.step-label {
  font-size: 10.5px; font-weight: 500; color: var(--ink-300);
  white-space: nowrap; transition: color 0.2s;
}
.step-label.active { color: var(--brand); font-weight: 600; }

.step-connector {
  flex: 1; height: 1.5px; background: var(--border);
  margin: 0 3px; margin-bottom: 20px; transition: background 0.3s;
}
.step-connector.done { background: var(--green); }

/* ── STEP CONTENT ── */
@keyframes animFwd { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:none; } }
@keyframes animBck { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:none; } }
.step-content { flex: 1; }
.anim-fwd { animation: animFwd 0.25s ease; }
.anim-bck { animation: animBck 0.25s ease; }

/* ── FORM ── */
.form-section { display: flex; flex-direction: column; gap: 14px; }
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.field { display: flex; flex-direction: column; gap: 5px; }
.field-label {
  font-size: 12px; font-weight: 600; color: var(--ink-700); line-height: 1;
}
.field-req { color: #EF4444; }

.inp {
  width: 100%; padding: 10px 12px;
  font-family: var(--font); font-size: 13.5px; font-weight: 400; color: var(--ink-900);
  background: var(--ink-50); border: 1.5px solid var(--border);
  border-radius: var(--r-md); outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  appearance: none; line-height: 1.4;
}
.inp::placeholder { color: var(--ink-300); font-weight: 400; }
.inp:focus {
  border-color: var(--brand); background: var(--white);
  box-shadow: 0 0 0 3px rgba(91,63,232,0.1);
}
.inp:disabled { opacity: 0.4; cursor: not-allowed; }
.inp-textarea { resize: vertical; min-height: 80px; line-height: 1.55; }
.inp-select {
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B5E8A' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 11px center; padding-right: 32px; cursor: pointer;
}
.inp-select option { background: #fff; color: var(--ink-900); }

/* Upload */
.upload-zone {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 26px 20px; border: 1.5px dashed var(--border); border-radius: 12px;
  background: var(--ink-50); cursor: pointer; transition: all 0.2s;
}
.upload-zone:hover { border-color: var(--brand); background: var(--brand-alpha); }
.upload-icon { color: var(--ink-300); margin-bottom: 4px; }
.upload-text { font-size: 13px; font-weight: 600; color: var(--ink-700); }
.upload-hint { font-size: 11.5px; font-weight: 400; color: var(--ink-300); }

.uploading-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 12.5px; font-weight: 500; color: var(--ink-500); padding: 2px 0;
}

/* Spinner */
.spinner {
  display: inline-block; width: 13px; height: 13px; border-radius: 50%;
  border: 2px solid var(--border); border-top-color: var(--brand);
  animation: spin 0.65s linear infinite; flex-shrink: 0; vertical-align: middle;
}
.btn-spinner { border-color: rgba(255,255,255,0.3); border-top-color: #fff; }

/* Images */
.img-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.img-thumb {
  position: relative; width: 66px; height: 66px;
  border-radius: var(--r-sm); overflow: hidden; border: 1.5px solid var(--border);
}
.img-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.img-remove {
  position: absolute; top: 3px; right: 3px;
  width: 17px; height: 17px; border-radius: 50%;
  background: rgba(0,0,0,0.5); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background 0.15s;
}
.img-remove:hover { background: #DC2626; }

/* Review */
.review-card {
  background: var(--ink-50); border: 1.5px solid var(--border);
  border-radius: 12px; padding: 14px 16px;
}
.review-card-title {
  font-size: 10px; font-weight: 700; letter-spacing: 0.8px;
  text-transform: uppercase; color: var(--ink-300); margin-bottom: 10px;
}
.review-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12.5px; font-weight: 400; color: var(--ink-500);
  padding: 6px 0; border-bottom: 1px solid var(--border);
}
.review-row.last { border-bottom: none; }
.review-row strong {
  font-size: 13px; font-weight: 600; color: var(--ink-900);
  max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* ── NAV ── */
.form-nav {
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px; margin-top: 22px;
}
.btn-back {
  font-family: var(--font); font-size: 13px; font-weight: 600; color: var(--ink-500);
  background: transparent; border: 1.5px solid var(--border); border-radius: var(--r-md);
  padding: 9px 18px; cursor: pointer; transition: all 0.15s; white-space: nowrap;
}
.btn-back:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-alpha); }

.btn-primary {
  flex: 1; font-family: var(--font); font-size: 13.5px; font-weight: 600; color: #fff;
  background: var(--brand); border: none; border-radius: var(--r-md);
  padding: 10px 22px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  box-shadow: var(--shadow-btn);
  transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
}
.btn-primary:hover { background: var(--brand-dark); box-shadow: var(--shadow-btn-h); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.pricing-note {
  font-size: 11px; font-weight: 400; color: var(--ink-300);
  text-align: center; margin-top: 10px; line-height: 1.55;
}

/* ── SUCCESS ── */
.success-state {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 28px 16px;
  animation: fadeIn 0.4s ease;
}
.success-check {
  width: 68px; height: 68px; border-radius: 50%; background: var(--green);
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
  box-shadow: 0 0 0 10px rgba(5,150,105,0.1), 0 8px 28px rgba(5,150,105,0.25);
}
.success-title {
  font-size: 22px; font-weight: 700; color: var(--ink-900);
  letter-spacing: -0.35px; margin-bottom: 8px;
}
.success-sub {
  font-size: 14px; font-weight: 400; color: var(--ink-500);
  max-width: 290px; line-height: 1.65; margin-bottom: 22px;
}
.success-sub strong { color: var(--ink-900); font-weight: 600; }
.success-badge {
  font-size: 12.5px; font-weight: 600; color: var(--green);
  background: var(--green-bg); border: 1.5px solid var(--green-border);
  border-radius: var(--r-sm); padding: 9px 18px;
}

/* ── ANIMATIONS ── */
@keyframes fadeIn      { from{opacity:0} to{opacity:1} }
@keyframes slideUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
@keyframes fadeSlideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
@keyframes dotPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 60%{box-shadow:0 0 0 6px rgba(52,211,153,0)} }
@keyframes spin        { to{transform:rotate(360deg)} }

/* ── RESPONSIVE ── */
@media (max-width: 660px) {
  .modal { flex-direction: column; max-height: 96vh; }
  .sidebar {
    width: 100%; padding: 16px 20px; flex-direction: row;
    align-items: center; gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .sidebar::after { display: none; }
  .sidebar-logo { margin-bottom: 0; }
  .sidebar-brand { font-size: 15px; margin-bottom: 0; }
  .sidebar-tagline, .sidebar-divider, .sidebar-perks,
  .sidebar-perks-title, .sidebar-footer, .sidebar-spots { display: none; }
  .content { padding: 22px 18px 18px; }
  .form-grid-2 { grid-template-columns: 1fr; }
  .content-title { font-size: 18px; }
  .step-label { display: none; }
}
`;