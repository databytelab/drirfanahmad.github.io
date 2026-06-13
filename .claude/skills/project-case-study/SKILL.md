---
name: project-case-study
description: Build or upgrade a project case study for Dr. Irfan Ahmad's portfolio site. Use when adding a project to src/projects/, writing a research/ML project page, or turning a project into a premium infographic case study (like the Thai Currency Recognition page). Covers the two-tier system (Markdown vs React component), the CaseStudyKit components, the recommended section structure, and the locked-in design rules.
---

# Building a project case study for this site

Projects render in **two tiers**, mirroring the blog. Pick first.

## Tier 1 — Markdown case study (default)
For a straightforward write-up. Create `src/projects/<slug>.md`:
```
---
title: "..."
year: "2024"
role: "Lead author · Supervised project"
venue: "Conference / journal, location"
excerpt: "One-sentence result-led hook."
stack: ["TensorFlow", "Keras", "Xception", "Python"]
paper: "https://doi.org/..."     # optional
github: ""                        # optional
type: "project"
---
```
Then write the body with the **same custom blocks** as blog posts (`::section`, `:::stats`, `:::callout`, `:::actions`, `:::pullquote`, `:::imagegrid`, `::image`, code fences, tables). It renders via `blog-prose--tutorial` (sans, documentation feel).

Link the card: in `src/data/projects.js` add `slug: '<slug>'` (plus `github`/`paper`) to the matching entry — the Projects page then shows "View case study →".

## Tier 2 — Premium React case study (for flagship projects)
For a visual, infographic showcase.
1. Still create `src/projects/<slug>.md` for **frontmatter** (drives the hero: title, year, role, venue, stack, paper/github buttons).
2. Build `src/components/project/<Name>Study.jsx` from the kit.
3. Register in `src/pages/ProjectDetail.jsx`:
   ```js
   import MyStudy from '../components/project/MyStudy'
   const CUSTOM_STUDIES = { '<slug>': MyStudy }
   ```
   The hero stays (from frontmatter); the component renders the body.

## The component kit — `src/components/project/CaseStudyKit.jsx`
- `CaseSection({ id, eyebrow, title, intro, bg, children })` — section shell (`bg`: white|soft|cream|navy).
- `StatTile({ value, label })` — headline metric.
- `FlowSteps({ steps, emphasizeLast })` — pipeline diagram (problem → solution, data pipeline, model architecture). `{ icon, title, caption, accent? }`; accents cycle navy→teal→amber; last node solid unless `emphasizeLast={false}`.
- `StageCard({ number, title, accent, children })` — numbered stages (e.g. the four fine-tuning steps).
- `CodeCard({ filename, code })` — premium light code card (copy button, line numbers).
- `ConfusionMatrix({ labels, diagonal })` — native CSS-grid matrix (no image needed).
- `Figure({ src, alt, caption })` — image with graceful dashed placeholder. Always use this, never raw `<img>`.

## Recommended section structure (proven on Thai Currency Recognition)
1. **Hero** — provided by `ProjectDetail` (title, role, venue, stack, paper/code buttons).
2. **Impact stats** — `StatTile` grid (the 3–4 numbers that matter).
3. **Problem flow** — `FlowSteps`: who has the problem → input → model → outcome.
4. **Dataset pipeline** — `FlowSteps` (`emphasizeLast={false}`) + a `Figure` of samples + a lesson `:::`/callout.
5. **Model architecture** — `FlowSteps` of the layer transformation + optional `Figure` of the formal diagram.
6. **Code** — `StageCard` grid explaining the stages, then a `CodeCard` with the real snippet.
7. **Results dashboard** — `StatTile` metrics + `ConfusionMatrix` + a class-performance table + `Figure` curves + an honest "perfect scores?" callout.
8. **Real-world impact** — icon cards.
9. **Future work** — on a `bg="navy"` band; cards with an amber left accent + amber icon chip so they pop on dark.

## DESIGN RULES — non-negotiable (shared with the blog-post skill)

**Palette — navy + amber only, plus neutrals.** Navy `#1A3A5C`, amber `#E8A020`, plus neutrals (ink `#1A1A1A`, body `#4A5568`, muted `#5A6678`, border `#C8D9EC`, cream `#FAFAF7`). For per-item identity, **cycle** navy↔amber (`ACCENTS[i % 2]`) — never invent colors. Navy = structure / positive-strengths, amber = emphasis / caution-limitations.

**Typography.** Lora serif → titles/headings. Inter sans (default) → dense/card body. JetBrains mono → only small uppercase labels & numbers. Don't put serif body into data-dense cards.

**Text size.** Body ≥15px (`text-[15px] leading-relaxed`); labels ≥11px; never `text-xs` for primary reading. Must be readable on mobile.

**One supporting colour exception:** the `CodeCard` uses teal `#0694A2` for code keywords and amber `#E8A020` for strings — this is intentional and the only place extra hues appear.

**Voice.** Engaging but rigorous. Focus on *real learning* (frame the problem like the person who'll use it; explain the "why"), not dry difficulty. Be honest about limitations (e.g. flag near-perfect accuracy and discuss overfitting). No hype.

**No meta-narration.** Never describe the page UI itself. Write about the work.

**Restraint.** Connect sections with short prose; not every block is a card; reserve heavy cards for content that earns it.

## Images
- Folder: `public/projects/<slug>/`. Reference as `/projects/<slug>/<name>.jpg`.
- Use `Figure` so missing images show a clean placeholder, not a broken icon.
- Render what you can **natively** (confusion matrix, metric tiles, flows) instead of relying on images.
- Hand the user AI image prompts (purpose, prompt, placement, dimensions); white background, navy/teal/amber palette, minimal embedded text.

## Finish
Run `npm run build`. Don't commit unless asked.
