// Komponen React + Radix UI + Tailwind, tanpa build step.
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

/* ---------- Kelas Tailwind yang dipakai ulang (edit di sini) ---------- */
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const btn = `inline-block cursor-pointer rounded-full border border-accent bg-accent px-4 py-2 font-semibold text-white hover:brightness-110 dark:text-stone-900 ${focus}`;
const btnGhost = `inline-block cursor-pointer rounded-full border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800 ${focus}`;
const panel = "rounded-xl border border-stone-200 bg-white p-4 text-left dark:border-stone-800 dark:bg-stone-900";
const tag = "rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent";
const grid = "grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]";
const h2 = "mb-4 text-2xl font-bold";

/* ---------- Tema gelap/terang (Radix Switch) ---------- */
function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const t = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }, [dark]);

  return html`
    <label className="flex cursor-pointer items-center gap-2">
      <span aria-hidden="true">${dark ? "🌙" : "☀️"}</span>
      <${Switch.Root}
        className=${`relative h-6 w-11 cursor-pointer rounded-full bg-stone-300 data-[state=checked]:bg-accent dark:bg-stone-700 ${focus}`}
        checked=${dark}
        onCheckedChange=${setDark}
        aria-label="Mode gelap"
      >
        <${Switch.Thumb} className="block h-[18px] w-[18px] translate-x-[3px] rounded-full bg-white transition-transform data-[state=checked]:translate-x-[23px]" />
      <//>
    </label>
  `;
}

/* ---------- Tautan dengan Tooltip ---------- */
function LinkButton({ label, href, hint }) {
  return html`
    <${Tooltip.Root}>
      <${Tooltip.Trigger} asChild>
        <a className=${btn} href=${href} target="_blank" rel="noopener noreferrer">${label}</a>
      <//>
      <${Tooltip.Portal}>
        <${Tooltip.Content}
          className="z-50 animate-fade rounded-md bg-stone-900 px-2.5 py-1 text-sm text-white dark:bg-stone-100 dark:text-stone-900"
          sideOffset=${6}
        >
          ${hint || label}
          <${Tooltip.Arrow} className="fill-stone-900 dark:fill-stone-100" />
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
        <button
          type="button"
          className=${`${panel} cursor-pointer transition hover:-translate-y-0.5 hover:border-accent ${focus}`}
        >
          <h3 className="mb-1 font-semibold">${p.title}</h3>
          <p className="mb-3 text-stone-500 dark:text-stone-400">${p.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            ${p.tags.map((t) => html`<span key=${t} className=${tag}>${t}</span>`)}
          </div>
        </button>
      <//>
      <${Dialog.Portal}>
        <${Dialog.Overlay} className="fixed inset-0 z-40 animate-fade bg-black/50" />
        <${Dialog.Content}
          className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 animate-pop rounded-xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900"
        >
          <${Dialog.Title} className="mb-2 text-xl font-bold">${p.title}<//>
          <${Dialog.Description} className="text-stone-500 dark:text-stone-400">${p.detail}<//>
          <div className="mt-5 flex justify-end gap-2">
            ${p.href && html`<a className=${btn} href=${p.href} target="_blank" rel="noopener noreferrer">Buka proyek</a>`}
            <${Dialog.Close} asChild><button className=${btnGhost} type="button">Tutup</button><//>
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
    <section id="proyek" className="py-10">
      <h2 className=${h2}>Proyek</h2>
      <${Tabs.Root} value=${tab} onValueChange=${setTab}>
        <${Tabs.List} className="mb-5 flex flex-wrap gap-2" aria-label="Kategori proyek">
          ${categories.map(
            (c) => html`
              <${Tabs.Trigger}
                key=${c}
                value=${c}
                className=${`cursor-pointer rounded-full border border-stone-300 px-4 py-1.5 text-stone-500 data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-white dark:border-stone-700 dark:text-stone-400 dark:data-[state=active]:text-stone-900 ${focus}`}
              >${c}<//>`
          )}
        <//>
        ${categories.map(
          (c) => html`
            <${Tabs.Content} key=${c} value=${c}>
              <div className=${grid}>
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
    <section id="skill" className="py-10">
      <h2 className=${h2}>Skill</h2>
      <div className=${grid}>
        ${skills.map(
          (s) => html`
            <div key=${s.name} className=${panel}>
              <h3 className="mb-2 font-semibold">${s.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                ${s.items.map((i) => html`<span key=${i} className=${tag}>${i}</span>`)}
              </div>
            </div>`
        )}
      </div>
    </section>
  `;
}

/* ---------- FAQ dengan Accordion ---------- */
function Faq() {
  return html`
    <section id="faq" className="py-10">
      <h2 className=${h2}>Tanya Jawab</h2>
      <${Accordion.Root}
        type="single"
        collapsible
        className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900"
      >
        ${faq.map(
          (f, i) => html`
            <${Accordion.Item} key=${i} value=${"i" + i}>
              <${Accordion.Header} className="m-0">
                <${Accordion.Trigger}
                  className=${`flex w-full cursor-pointer items-center justify-between p-4 text-left font-semibold [&[data-state=open]>span]:rotate-180 ${focus}`}
                >${f.q}<span aria-hidden="true" className="transition-transform">▾</span><//>
              <//>
              <${Accordion.Content} className="overflow-hidden px-4 text-stone-500 data-[state=open]:animate-slide dark:text-stone-400">
                <p className="pb-4">${f.a}</p>
              <//>
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
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/85 backdrop-blur dark:border-stone-800 dark:bg-stone-950/85">
        <div className="mx-auto flex max-w-4xl items-center gap-5 px-5 py-4">
          <a className="mr-auto font-bold" href="#">${site.name}</a>
          <nav className="hidden gap-4 text-stone-500 sm:flex dark:text-stone-400">
            <a className="hover:text-stone-900 dark:hover:text-stone-100" href="#proyek">Proyek</a>
            <a className="hover:text-stone-900 dark:hover:text-stone-100" href="#skill">Skill</a>
            <a className="hover:text-stone-900 dark:hover:text-stone-100" href="#faq">FAQ</a>
          </nav>
          <${ThemeToggle} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5">
        <section className="pb-8 pt-16">
          <h1 className="mb-2 text-4xl font-bold sm:text-5xl">${site.name}</h1>
          <p className="mb-3 text-xl text-stone-500 dark:text-stone-400">${site.tagline}</p>
          <p>${site.intro}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            ${links.map((l) => html`<${LinkButton} key=${l.label} ...${l} />`)}
          </div>
        </section>

        <${Projects} />
        <${Skills} />
        <${Faq} />
      </main>

      <footer className="mx-auto mt-8 max-w-4xl border-t border-stone-200 px-5 py-8 text-center text-stone-500 dark:border-stone-800 dark:text-stone-400">
        © ${new Date().getFullYear()} ${site.name}
      </footer>
    <//>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
