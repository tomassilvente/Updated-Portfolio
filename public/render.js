// ---------- render + interactions ----------
(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);

  // ----- persisted state -----
  let lang = localStorage.getItem("ts_lang") || "es";
  let theme = localStorage.getItem("ts_theme") || "light";

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5a10.3 10.3 0 0 0 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V9.8h2.6v8.5zM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.3 9.7h-2.6v-4.2c0-1-.3-1.7-1.2-1.7-.7 0-1 .4-1.2.9 0 .2-.1.4-.1.6v4.4H10.5V9.8h2.5v1.1a2.6 2.6 0 0 1 2.3-1.3c1.7 0 2.9 1.1 2.9 3.4v5.3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  };

  function render() {
    const t = D[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;

    // nav links
    const navKeys = ["about", "experience", "projects", "skills", "education", "photography", "contact"];
    $("navlinks").innerHTML = navKeys
      .map((k) => `<a href="#${k}" data-sec="${k}">${t.nav[k]}</a>`)
      .join("");

    // lang toggle visual
    document.querySelectorAll("#langBtn span").forEach((s) => {
      s.classList.toggle("on", s.dataset.l === lang);
    });

    // hero
    $("h-avail").textContent = t.hero.available;
    $("h-greeting").textContent = t.hero.greeting;
    const parts = t.hero.name.split(" ");
    $("h-name").innerHTML = parts[0] + '<br><span class="last">' + parts.slice(1).join(" ") + "</span>";
    $("h-role").textContent = t.hero.role;
    $("h-tagline").textContent = t.hero.tagline;
    $("h-cta").innerHTML = t.hero.cta + ' <span class="arr">↓</span>';
    $("h-cta2").textContent = t.hero.cta2;
    $("h-meta").innerHTML = `
      <span><b>${t.hero.based}</b></span>
      <span>${lang === "es" ? "Disponible" : "Status"}: <b>${lang === "es" ? "Remoto" : "Remote"}</b></span>`;
    const heroPhoto = $("hero-photo");
    if (heroPhoto) heroPhoto.setAttribute("placeholder", lang === "es" ? "Arrastrá tu foto" : "Drop your photo");

    // about
    $("a-label").textContent = t.about.label;
    $("a-bio").innerHTML =
      `<h2 class="sectitle" style="margin-bottom:28px;">${t.about.title}</h2>` +
      t.about.bio.map((p) => `<p>${p}</p>`).join("");
    $("a-facts").innerHTML = t.about.facts
      .map((f) => `<div class="fact"><span class="k">${f.k}</span><span class="v">${f.v}</span></div>`)
      .join("");

    // experience
    $("e-label").textContent = t.experience.label;
    $("e-title").textContent = t.experience.title;
    $("e-list").innerHTML = t.experience.jobs
      .map(
        (j) => `<div class="job rv">
        <div class="job-side">
          <span class="job-period">${j.period}</span>
          <span class="job-loc">${j.location}</span>
          ${j.current ? `<span class="job-current">${lang === "es" ? "Actual" : "Current"}</span>` : ""}
        </div>
        <div class="job-main">
          <h3>${j.role}</h3>
          <div class="job-company">${j.company}</div>
          <ul class="job-bullets">${j.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        </div>
      </div>`
      )
      .join("");

    // projects
    $("p-label").textContent = t.projects.label;
    $("p-title").textContent = t.projects.title;
    $("p-list").innerHTML = t.projects.items
      .map((p, i) => {
        const statusTxt = p.status === "live" ? t.projects.statusLive : t.projects.statusArchived;
        let links = "";
        if (p.live) links += `<a class="proj-link" href="${p.live}" target="_blank" rel="noopener">${ICONS.ext}${t.projects.viewLive}</a>`;
        if (p.github) links += `<a class="proj-link" href="${p.github}" target="_blank" rel="noopener">${ICONS.code}${t.projects.viewCode}</a>`;
        return `<div class="proj rv">
          <div class="proj-idx">0${i + 1}</div>
          <div class="proj-body">
            <div class="proj-head">
              <h3>${p.name}</h3>
              <span class="proj-year">${p.year}</span>
              <span class="proj-status ${p.status}">${statusTxt}</span>
            </div>
            <p class="proj-desc">${p.description}</p>
            <ul class="proj-high">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
            <div class="proj-foot">
              <div class="tech-row">${p.tech.map((x) => `<span class="chip">${x}</span>`).join("")}</div>
              <div class="proj-links">${links}</div>
            </div>
          </div>
        </div>`;
      })
      .join("");

    // skills
    $("s-label").textContent = t.skills.label;
    $("s-title").textContent = t.skills.title;
    $("s-list").innerHTML = t.skills.categories
      .map(
        (c) => `<div class="skill-cat">
        <h4><span class="ic"></span>${c.label}</h4>
        <div class="skill-items">${c.items.map((x) => `<span>${x}</span>`).join("")}</div>
      </div>`
      )
      .join("");

    // education
    $("ed-label").textContent = t.education.label;
    $("ed-title").textContent = t.education.title;
    $("ed-studies-label").textContent = t.education.studiesLabel;
    $("ed-courses-label").textContent = t.education.coursesLabel;
    $("ed-studies").innerHTML = t.education.studies
      .map(
        (s) => `<div class="study">
        <h4>${s.degree}</h4>
        <div class="org">${s.school}</div>
        <div class="per">${s.period}</div>
        <div class="note">${s.note}</div>
      </div>`
      )
      .join("");
    $("ed-courses").innerHTML = t.education.courses
      .map(
        (c) => `<div class="course">
        <span class="course-when">${c.date}</span>
        <div class="course-body">
          <h4>${c.name}</h4>
          <div class="iss">${c.issuer}</div>
          <div class="course-skills">${c.skills.map((s) => `<span>${s}</span>`).join("")}</div>
        </div>
      </div>`
      )
      .join("");

    // languages
    $("lg-label").textContent = t.languages.label;
    $("lg-list").innerHTML = t.languages.items
      .map(
        (l) => `<div class="lang-row">
        <div class="lang-top"><span class="lname">${l.name}</span><span class="llevel">${l.level}</span></div>
        <div class="lbar"><i data-pct="${l.pct}"></i></div>
      </div>`
      )
      .join("");

    // photography
    $("ph-label").textContent = t.photography.label;
    $("ph-title").textContent = t.photography.title;
    $("ph-intro").textContent = t.photography.intro;
    const cells = ["tall wide", "", "", "wide"];
    const dropTxt = lang === "es" ? "Arrastrá una foto" : "Drop a photo";
    $("ph-gallery").innerHTML = cells
      .map(
        (cls, i) => `<div class="cell ${cls}">
          <image-slot id="ph-${i}" shape="rounded" radius="16" placeholder="${dropTxt}"></image-slot>
          <span class="cap">${t.photography.captions[i] || ""}</span>
        </div>`
      )
      .join("");
    $("ph-ig").href = t.photography.igUrl;
    $("ph-ig").innerHTML = `
      <div class="ig-left">
        <span class="ig-mark">${ICONS.ig}</span>
        <div class="ig-txt"><div class="h">${t.photography.handle}</div><div class="s">${t.photography.igSub}</div></div>
      </div>
      <span class="btn btn-primary">${t.photography.igCta} <span class="arr">→</span></span>`;

    // contact
    $("c-label").textContent = t.contact.label;
    const ct = t.contact.title.split(" ");
    $("c-title").innerHTML = ct.slice(0, -1).join(" ") + ' <em>' + ct.slice(-1) + "</em>";
    $("c-intro").textContent = t.contact.intro;
    $("c-email").innerHTML = ICONS.mail + " " + t.contact.email;
    $("c-email").href = "mailto:" + t.contact.email;
    $("c-socials").innerHTML = t.contact.socials
      .map((s) => {
        const ic = s.label === "GitHub" ? ICONS.gh : ICONS.li;
        return `<a class="social" href="${s.href}" target="_blank" rel="noopener">${ic}${s.label}</a>`;
      })
      .join("");
    $("c-loc").textContent = "◷ " + t.contact.location;

    // footer
    $("f-built").innerHTML = "<b>Tomás Silvente</b> · " + (lang === "es" ? "Diseñado y desarrollado" : "Designed & built");
    $("f-year").textContent = t.footer.year;
    $("f-toptext").textContent = lang === "es" ? "Volver arriba" : "Back to top";
    $("h-scroll").textContent = lang === "es" ? "DESLIZÁ" : "SCROLL";

    bindReveals();
    setTimeout(animateLangBars, 50);
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    $("themeBtn").innerHTML = theme === "light" ? ICONS.moon : ICONS.sun;
  }

  // ----- reveal observer -----
  let io;
  function bindReveals() {
    if (io) io.disconnect();
    const els = document.querySelectorAll(".rv");
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el, i) => {
      // light stagger within groups
      el.style.transitionDelay = Math.min(i % 6, 5) * 40 + "ms";
      io.observe(el);
    });
  }

  function animateLangBars() {
    document.querySelectorAll(".lbar i").forEach((bar) => {
      const target = bar.parentElement.closest(".lang-row");
      const obs = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            bar.style.width = bar.dataset.pct + "%";
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      obs.observe(target);
    });
  }

  // ----- nav scroll state + active link -----
  const nav = $("nav");
  const sections = ["about", "experience", "projects", "skills", "education", "photography", "contact"];
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    let cur = "";
    for (const id of sections) {
      const el = $(id);
      if (el && el.getBoundingClientRect().top <= 140) cur = id;
    }
    document.querySelectorAll("#navlinks a").forEach((a) => {
      a.classList.toggle("active", a.dataset.sec === cur);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ----- toggles -----
  $("langBtn").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    localStorage.setItem("ts_lang", lang);
    render();
    onScroll();
  });
  $("themeBtn").addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("ts_theme", theme);
    applyTheme();
  });
  $("f-top").addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // ----- pixel cursor -----
  const cursor = $("cursor");
  if (matchMedia("(hover: hover)").matches) {
    // build a 4x4 cluster of pixels, each blinking at its own random rhythm
    let px = "";
    for (let i = 0; i < 16; i++) {
      const dur = (0.45 + Math.random() * 1.05).toFixed(2);
      const delay = (Math.random() * 1.4).toFixed(2);
      px += `<span class="px" style="animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
    }
    cursor.innerHTML = px;

    let shown = false, hot = false;
    window.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(${hot ? 1.55 : 1})`;
      if (!shown) { cursor.style.opacity = 1; shown = true; }
    });
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .chip, .skill-items span")) { hot = true; cursor.classList.add("hot"); }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .chip, .skill-items span")) { hot = false; cursor.classList.remove("hot"); }
    });
  }

  applyTheme();
  render();
  onScroll();
})();
