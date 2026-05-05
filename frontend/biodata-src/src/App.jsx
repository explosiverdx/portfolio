import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "./assets/biodata-profile.png";

gsap.registerPlugin(ScrollTrigger);

function Icon({ name, className = "" }) {
  const base = {
    className: `biodata-icon ${className}`.trim(),
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "user":
      return <svg {...base}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "calendar":
      return <svg {...base}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "cake":
      return <svg {...base}><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M9 7h6M12 11v10" /><path d="M12 11c-1.5 0-3 .5-3 2s1.5 2 3 2 3-.5 3-2-1.5-2-3-2Z" /></svg>;
    case "ruler":
      return <svg {...base}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /><path d="m14.5 4.5 2 2M12 7l1 1M9.5 9.5l1 1M7 12l1 1M4.5 14.5l1 1" /></svg>;
    case "scale":
      return <svg {...base}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 4-1 4-3h2c0 2 2 3 4 3h2" /></svg>;
    case "users":
      return <svg {...base}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "droplet":
      return <svg {...base}><path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7Z" /></svg>;
    case "star":
      return <svg {...base}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>;
    case "layers":
      return <svg {...base}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m2.6 12.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" /><path d="m2.6 17.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" /></svg>;
    case "message":
      return <svg {...base}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case "heart":
      return <svg {...base}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
    case "home":
      return <svg {...base}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "briefcase":
      return <svg {...base}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case "book":
      return <svg {...base}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
    case "building":
      return <svg {...base}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12h12M10 9h4M10 15h4M10 18h4" /></svg>;
    case "mapPin":
      return <svg {...base}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "phone":
      return <svg {...base}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case "mail":
      return <svg {...base}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
    case "sparkles":
      return <svg {...base}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.36 1.36L3 12l5.74 1.84a2 2 0 0 1 1.36 1.36L12 21l1.9-5.8a2 2 0 0 1 1.36-1.36L21 12l-5.8-1.9a2 2 0 0 1-1.36-1.36L12 3Z" /><path d="M5 3v4M19 17v4M3 5h4M17 19h4" /></svg>;
    case "utensils":
      return <svg {...base}><path d="M3 2v7c0 1.1.9 2 2 2h3v8a2 2 0 0 0 4 0v-8h3a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v8" /></svg>;
    case "ban":
      return <svg {...base}><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>;
    case "wine":
      return <svg {...base}><path d="M8 22h8M12 11v11M12 11c3.5 0 6.4-2.6 6-6-.4-3.3-3-5-6-5s-5.6 1.7-6 5c-.4 3.4 2.6 6 6 6Z" /></svg>;
    case "graduation":
      return <svg {...base}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
    case "rocket":
      return <svg {...base}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    case "fileDown":
      return <svg {...base}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6M9 15l3 3 3-3" /></svg>;
    default:
      return <svg {...base}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

const SECTION_ICONS = {
  personal: "user",
  family: "heart",
  career: "briefcase",
  lifestyle: "sparkles",
  contact: "phone",
};

const FIELD_ICONS = {
  "Full Name": "user",
  "Date of Birth": "calendar",
  Age: "cake",
  Height: "ruler",
  Weight: "scale",
  Gender: "users",
  "Blood Group": "droplet",
  Religion: "star",
  "Caste / Sub-caste": "layers",
  "Mother Tongue": "message",
  "Marital Status": "heart",
  "Father's Name": "user",
  "Father's Occupation": "briefcase",
  "Mother's Name": "user",
  "Mother's Occupation": "briefcase",
  Siblings: "users",
  "Family Type": "home",
  "Family Location": "mapPin",
  "Highest Qualification": "graduation",
  "College / University": "book",
  Profession: "briefcase",
  "Company / Organization": "building",
  "Phone Number": "phone",
  "Email ID": "mail",
  Address: "mapPin",
};

const CHIP_ICONS = {
  Diet: "utensils",
  Smoking: "ban",
  Drinking: "wine",
  Hobbies: "sparkles",
};

function SectionTitle({ children, section }) {
  const iconName = SECTION_ICONS[section];
  return (
    <h2 className="section-title stagger-item">
      {iconName ? (
        <span className="section-title__icon-wrap">
          <Icon name={iconName} className="section-title__icon" />
        </span>
      ) : null}
      <span className="section-title__text">{children}</span>
    </h2>
  );
}

const personal = [
  ["Full Name", "Rohit Kumar"],
  ["Date of Birth", "26 January 2000"],
  ["Age", "26 Years"],
  ["Height", "5'7\""],
  ["Weight", "65 kg"],
  ["Gender", "Male"],
  ["Blood Group", "A+"],
  ["Religion", "Hindu"],
  ["Caste / Sub-caste", "SC"],
  ["Mother Tongue", "Hindi"],
  ["Marital Status", "Unmarried"],
];

const family = [
  ["Father's Name", "Girish Chandra"],
  ["Father's Occupation", "Tailor"],
  ["Mother's Name", "Indramati"],
  ["Mother's Occupation", "Homemaker"],
  ["Siblings", "2 Brothers, 1 Sister"],
  ["Family Type", "Joint Family"],
  ["Family Location", "SDDN"],
];

const career = [
  ["Highest Qualification", "B.Tech in Computer Science & Engineering"],
  ["College / University", "AKTU"],
  ["Profession", "Software Engineer"],
  ["Company / Organization", "Alishbatech"],
];

const lifestyle = [
  ["Diet", "Non-Vegetarian"],
  ["Smoking", "No"],
  ["Drinking", "No"],
  ["Hobbies", "Traveling, Video Games"],
];

const contact = [
  ["Phone Number", "9648832796", "tel:+919648832796"],
  ["Email ID", "rohitkumar.sde26@gmail.com", "mailto:rohitkumar.sde26@gmail.com"],
  ["Address", "Lucknow, Uttar Pradesh"],
];

function DataGrid({ items, className = "" }) {
  return (
    <dl className={`data-grid ${className}`}>
      {items.map(([label, value, href]) => {
        const iconName = FIELD_ICONS[label];
        return (
          <div className="data-item tilt-card" key={label}>
            <dt>
              {iconName ? <Icon name={iconName} className="data-item__icon" /> : null}
              <span className="data-item__label">{label}</span>
            </dt>
            <dd>{href ? <a href={href}>{value}</a> : value}</dd>
          </div>
        );
      })}
    </dl>
  );
}

function RoseBackdrop({ variant }) {
  return (
    <div className={`rose-bg rose-bg--${variant}`} aria-hidden="true">
      <div className="rose-bg__roses" />
      <div className="rose-bg__veil" />
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const photoRef = useRef(null);
  const printTitleBackupRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(profilePhoto);
  const downloadPdf = () => {
    window.print();
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
        heroTl
          .from(".hero-title", { y: 28, opacity: 0, duration: 0.75 })
          .from(".hero-subtitle", { y: 16, opacity: 0, duration: 0.55 }, "-=0.45")
          .from(".hero-photo", { scale: 1.04, opacity: 0, duration: 0.65 }, "-=0.35")
          .from(".hero-card.hero-glass", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

        gsap.utils.toArray(".page-panel").forEach((panel) => {
          const roses = panel.querySelector(".rose-bg__roses");
          if (!roses) return;
          gsap.fromTo(
            roses,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });

        gsap.utils.toArray(".reveal-section").forEach((section) => {
          const items = section.querySelectorAll(".stagger-item");
          gsap.from(items, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });
        });
      }
    }, rootRef);

    const hoverButtons = gsap.utils.toArray(".cta-btn");
    hoverButtons.forEach((btn) => {
      const over = () =>
        gsap.to(btn, {
          scale: 1.03,
          boxShadow: "0 14px 32px rgba(139, 92, 246, 0.22)",
          duration: 0.28,
          ease: "power2.out",
        });
      const out = () =>
        gsap.to(btn, {
          scale: 1,
          boxShadow: "0 8px 18px rgba(91, 53, 163, 0.14)",
          duration: 0.28,
          ease: "power2.out",
        });
      btn.addEventListener("mouseenter", over);
      btn.addEventListener("mouseleave", out);
      btn.__over = over;
      btn.__out = out;
    });

    const cardNodes = gsap.utils.toArray(".tilt-card");
    const cleanups = cardNodes.map((card) => {
      if (isMobile || prefersReducedMotion) return () => {};
      const rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" });
      const rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" });
      const onMove = (e) => {
        const b = card.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width - 0.5;
        const py = (e.clientY - b.top) / b.height - 0.5;
        rotY(px * 5);
        rotX(py * -5);
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    const onPhotoEnter = () => gsap.to(photoRef.current, { scale: 1.03, duration: 0.45, ease: "power2.out" });
    const onPhotoLeave = () => gsap.to(photoRef.current, { scale: 1, duration: 0.45, ease: "power2.out" });
    photoRef.current?.addEventListener("mouseenter", onPhotoEnter);
    photoRef.current?.addEventListener("mouseleave", onPhotoLeave);

    const onBeforePrint = () => {
      const root = rootRef.current;
      if (!root) return;
      printTitleBackupRef.current = document.title;
      document.title = "";

      document.documentElement.classList.add("biodata-print-mode");
      document.body.classList.add("biodata-print-mode");
      root.classList.add("biodata-print-mode");

      const resetSelectors = root.querySelectorAll(
        ".stagger-item, .data-item, .timeline-card, .chip-card, .hero-title, .hero-subtitle, .hero-photo, .hero-card",
      );
      gsap.killTweensOf(resetSelectors);
      gsap.set(resetSelectors, {
        opacity: 1,
        visibility: "visible",
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        x: 0,
        y: 0,
        z: 0,
      });
    };

    const onAfterPrint = () => {
      const root = rootRef.current;
      if (!root) return;
      if (printTitleBackupRef.current !== null) {
        document.title = printTitleBackupRef.current;
        printTitleBackupRef.current = null;
      }
      document.documentElement.classList.remove("biodata-print-mode");
      document.body.classList.remove("biodata-print-mode");
      root.classList.remove("biodata-print-mode");
    };

    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      hoverButtons.forEach((btn) => {
        btn.removeEventListener("mouseenter", btn.__over);
        btn.removeEventListener("mouseleave", btn.__out);
      });
      cleanups.forEach((fn) => fn());
      photoRef.current?.removeEventListener("mouseenter", onPhotoEnter);
      photoRef.current?.removeEventListener("mouseleave", onPhotoLeave);
      document.documentElement.classList.remove("biodata-print-mode");
      document.body.classList.remove("biodata-print-mode");
      rootRef.current?.classList.remove("biodata-print-mode");
      if (printTitleBackupRef.current !== null) {
        document.title = printTitleBackupRef.current;
        printTitleBackupRef.current = null;
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="biodata-root" ref={rootRef}>
      <main className="page-shell">
        <section className="hero-section page-panel" ref={heroRef}>
          <RoseBackdrop variant="hero" />
          <h1 className="hero-title">Marriage Biodata</h1>
          <p className="hero-subtitle">Rohit Kumar — Full Stack Software Engineer</p>
          <div className="hero-layout">
            <article className="hero-card hero-glass">
              <h2>Profile Summary</h2>
              <p>
                Family-oriented and career-focused professional looking for a meaningful
                life partnership based on trust, respect, and shared values.
              </p>
              <ul className="hero-highlights">
                <li>
                  <Icon name="briefcase" className="hero-highlights__icon" />
                  <span><strong>Profession:</strong> Software Engineer at Alishbatech</span>
                </li>
                <li>
                  <Icon name="graduation" className="hero-highlights__icon" />
                  <span><strong>Education:</strong> B.Tech CSE, AKTU</span>
                </li>
                <li>
                  <Icon name="mapPin" className="hero-highlights__icon" />
                  <span><strong>Location:</strong> Lucknow, Uttar Pradesh</span>
                </li>
                <li>
                  <Icon name="heart" className="hero-highlights__icon" />
                  <span><strong>Lifestyle:</strong> Non-smoker, non-drinker</span>
                </li>
              </ul>
            </article>
            <aside className="hero-photo hero-glass" ref={photoRef}>
              <div className="photo-slot">
                <img
                  src={photoSrc}
                  alt="Rohit Kumar profile photo"
                  loading="eager"
                  onError={() => {
                    if (photoSrc !== "/assets/images/biodata-profile.png") {
                      setPhotoSrc("/assets/images/biodata-profile.png");
                    }
                  }}
                />
              </div>
              <span className="hero-photo__label">Rohit Kumar</span>
            </aside>
          </div>
        </section>

        <section className="section reveal-section page-panel">
          <RoseBackdrop variant="personal" />
          <SectionTitle section="personal">Personal Details</SectionTitle>
          <DataGrid items={personal} />
        </section>

        <section className="section reveal-section page-panel">
          <RoseBackdrop variant="family" />
          <SectionTitle section="family">Family Details</SectionTitle>
          <DataGrid items={family} />
        </section>

        <section className="section reveal-section timeline-wrap page-panel">
          <RoseBackdrop variant="career" />
          <SectionTitle section="career">Career Timeline</SectionTitle>
          <div className="timeline">
            <article className="timeline-card stagger-item tilt-card">
              <h3>
                <Icon name="graduation" className="timeline-card__icon" />
                <span>Education</span>
              </h3>
              <p>B.Tech in Computer Science & Engineering, AKTU</p>
            </article>
            <article className="timeline-card stagger-item tilt-card">
              <h3>
                <Icon name="rocket" className="timeline-card__icon" />
                <span>Professional Start</span>
              </h3>
              <p>Began career in software engineering with backend and MERN projects.</p>
            </article>
            <article className="timeline-card stagger-item tilt-card">
              <h3>
                <Icon name="briefcase" className="timeline-card__icon" />
                <span>Current Role</span>
              </h3>
              <p>Software Engineer at Alishbatech.</p>
            </article>
          </div>
          <DataGrid items={career} className="career-grid" />
        </section>

        <section className="section reveal-section page-panel">
          <RoseBackdrop variant="lifestyle" />
          <SectionTitle section="lifestyle">Lifestyle & Hobbies</SectionTitle>
          <div className="chips">
            {lifestyle.map(([label, val]) => {
              const chipIcon = CHIP_ICONS[label];
              return (
                <div key={label} className="chip-card stagger-item tilt-card">
                  <span className="chip-title">
                    {chipIcon ? <Icon name={chipIcon} className="chip-card__icon" /> : null}
                    <span>{label}</span>
                  </span>
                  <span className="chip-value">{val}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section reveal-section contact-section page-panel">
          <RoseBackdrop variant="contact" />
          <SectionTitle section="contact">Contact</SectionTitle>
          <DataGrid items={contact} className="contact-grid" />
          <div className="cta-row stagger-item">
            <a className="cta-btn" href="tel:+919648832796">
              <Icon name="phone" className="cta-btn__icon" />
              Call
            </a>
            <a className="cta-btn cta-secondary" href="mailto:rohitkumar.sde26@gmail.com">
              <Icon name="mail" className="cta-btn__icon" />
              Email
            </a>
            <button
              className="cta-btn cta-pdf"
              type="button"
              onClick={downloadPdf}
            >
              <Icon name="fileDown" className="cta-btn__icon" />
              Download PDF
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
