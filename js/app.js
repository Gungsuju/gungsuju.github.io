// Komponen React + Radix UI tanpa build step.
// htm = sintaks mirip JSX di dalam template string (html`<div>...</div>`).
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import { site, links, projects, skills, faq } from "./data.js";

const html = htm.bind(React.createElement);

/* ---------- Tema gelap/terang (Radix Switch) ---------- */
function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  useEffect(() => {
    const t = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }, [dark]);

  return html`
    <label className="theme-toggle">
      <span aria-hidden="true">${dark ? "🌙" : "☀️"}</span>
      <${Switch.Root}
        className="switch"
        checked=${dark}
        onCheckedChange=${setDark}
        aria-label="Mode gelap"
      >
        <${Switch.Thumb} className="switch-thumb" />
      <//>
    </label>
  `;
}

/* ---------- Tautan dengan Tooltip ---------- */
function LinkButton({ label, href, hint }) {
  return html`
    <${Tooltip.Root}>
      <${Tooltip.Trigger} asChild>
        <a className="btn" href=${href} target="_blank" rel="noopener noreferrer">${label}</a>
      <//>
      <${Tooltip.Portal}>
        <${Tooltip.Content} className="tooltip" sideOffset=${6}>
          ${hint || label}
          <${Tooltip.Arrow} className="tooltip-arrow" />
        <//>
      <//>
    <//>
  `;
}

/* ---------- Kartu proyek + Dialog detail ---------- */
function ProjectCard({ p }) {
  return html`
    <${Dialog.Root}>
      <${Dialog.Trigger} asChild>
        <button className="card" type="button">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <div className="tags">${p.tags.map((t) => html`<span key=${t} className="tag">${t}</span>`)}</div>
        </button>
      <//>
      <${Dialog.Portal}>
        <${Dialog.Overlay} className="overlay" />
        <${Dialog.Content} className="dialog">
          <${Dialog.Title}>${p.title}<//>
          <${Dialog.Description}>${p.detail}<//>
          <div className="dialog-actions">
            ${p.href && html`<a className="btn" href=${p.href} target="_blank" rel="noopener noreferrer">Buka proyek</a>`}
            <${Dialog.Close} asChild><button className="btn ghost" type="button">Tutup</button><//>
          </div>
        <//>
      <//>
    <//>
  `;
}

/* ---------- Daftar proyek dengan Tabs ---------- */
function Projects() {
  const categories = ["Semua", ...new Set(projects.map((p) => p.category))];
  const [tab, setTab] = useState("Semua");

  return html`
    <section id="proyek">
      <h2>Proyek</h2>
      <${Tabs.Root} value=${tab} onValueChange=${setTab}>
        <${Tabs.List} className="tabs" aria-label="Kategori proyek">
          ${categories.map(
            (c) => html`<${Tabs.Trigger} key=${c} value=${c} className="tab">${c}<//>`
          )}
        <//>
        ${categories.map(
          (c) => html`
            <${Tabs.Content} key=${c} value=${c}>
              <div className="grid">
                ${projects
                  .filter((p) => c === "Semua" || p.category === c)
                  .map((p) => html`<${ProjectCard} key=${p.title} p=${p} />`)}
              </div>
            <//>`
        )}
      <//>
    </section>
  `;
}

/* ---------- Skill ---------- */
function Skills() {
  return html`
    <section id="skill">
      <h2>Skill</h2>
      <div className="grid">
        ${skills.map(
          (s) => html`
            <div key=${s.name} className="panel">
              <h3>${s.name}</h3>
              <div className="tags">${s.items.map((i) => html`<span key=${i} className="tag">${i}</span>`)}</div>
            </div>`
        )}
      </div>
    </section>
  `;
}

/* ---------- FAQ dengan Accordion ---------- */
function Faq() {
  return html`
    <section id="faq">
      <h2>Tanya Jawab</h2>
      <${Accordion.Root} type="single" collapsible className="accordion">
        ${faq.map(
          (f, i) => html`
            <${Accordion.Item} key=${i} value=${"i" + i} className="acc-item">
              <${Accordion.Header}>
                <${Accordion.Trigger} className="acc-trigger">${f.q}<span aria-hidden="true">▾</span><//>
              <//>
              <${Accordion.Content} className="acc-content"><p>${f.a}</p><//>
            <//>`
        )}
      <//>
    </section>
  `;
}

/* ---------- Halaman ---------- */
function App() {
  return html`
    <${Tooltip.Provider} delayDuration=${150}>
      <header className="topbar">
        <a className="brand" href="#">${site.name}</a>
        <nav>
          <a href="#proyek">Proyek</a>
          <a href="#skill">Skill</a>
          <a href="#faq">FAQ</a>
        </nav>
        <${ThemeToggle} />
      </header>

      <main>
        <section className="hero">
          <h1>${site.name}</h1>
          <p className="lead">${site.tagline}</p>
          <p>${site.intro}</p>
          <div className="actions">
            ${links.map((l) => html`<${LinkButton} key=${l.label} ...${l} />`)}
          </div>
        </section>

        <${Projects} />
        <${Skills} />
        <${Faq} />
      </main>

      <footer>© ${new Date().getFullYear()} ${site.name}</footer>
    <//>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
