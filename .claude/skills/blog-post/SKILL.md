---
name: blog-post
description: Write or upgrade a blog post for Dr. Irfan Ahmad's portfolio site (drirfanahmad.com). Use when creating a new blog article, adding a post to src/posts/, or turning a flagship post into a premium React layout. Covers the two-tier rendering system (Markdown vs React component), the custom block syntax, the CaseStudyKit components, and the locked-in design rules (palette, typography, text size, voice).
---

# Writing a blog post for this site

This site renders blog posts in **two tiers**. Pick the right one first.

## Tier 1 — Markdown post (default, for text-led writing)
Use for essays, opinion pieces, narrative/reflective posts.

1. Create `src/posts/<slug>.md` with frontmatter:
   ```
   ---
   title: "..."
   date: "YYYY-MM-DD"
   excerpt: "One-sentence hook used on the index and post hero."
   tags: ["Tag One", "Tag Two"]
   cover: ""              # leave "" unless a real image exists (broken icon otherwise)
   type: "essay"          # essay | tutorial | resource  (drives badge + body treatment)
   youtubeId: ""          # optional; renders an embed when set
   ---
   ```
2. Write the body with the **custom blocks** below. Nothing else is needed — it renders automatically.

`type` treatments (in `src/index.css`): `essay` = Lora serif + drop cap (journal feel); `tutorial` = Inter sans, no drop cap (docs feel); `resource` = scannable, no drop cap.

### Custom Markdown blocks (parsed in `src/lib/markdown.js`)
- `::section 01 — Title` → section divider with amber rule.
- `:::stats` … `:::` — one `NUMBER — Label` per line (space-em-dash-space).
- `:::callout 💡 Label` … `:::` — highlighted box (markdown inside allowed).
- `:::actions` … `---` between blocks … `:::` — numbered step list; each block starts `**Label**` then description.
- `:::pullquote -- Citation` … `:::` — large centered quote.
- `:::imagegrid` with `::image{...}` lines … `:::` — 2/3/4-up grid.
- `::image{src=/path caption="..." class="portrait"}` — single figure (class optional).
- Fenced ```` ```lang ```` code blocks (navy panel), GFM tables, and `>` blockquotes are all styled.

> Caveat: the parser processes `::image{` even inside code fences — never show the literal image syntax in a code block; describe it instead.

## Tier 2 — Premium React post (for flagship/structured content)
Use for tool comparisons, guides, anything inherently modular (cards, comparison grids, workflows). A Markdown wall is the wrong format for these.

1. Still create `src/posts/<slug>.md` — it supplies the **frontmatter only** (title, excerpt, tags, date drive the hero + index card). Set `cover: ""`. You can keep a trimmed body for SEO, but it won't render.
2. Build `src/components/blog/<Name>.jsx` using the kit (see below).
3. Register it in `src/pages/BlogPost.jsx`:
   ```js
   import MyGuide from '../components/blog/MyGuide'
   const CUSTOM_POSTS = { '<slug>': MyGuide }
   ```
   The page renders the component instead of the Markdown body; everything else (masthead, hero, "keep reading") stays.

## The component kit — `src/components/project/CaseStudyKit.jsx`
Reuse these (don't reinvent):
- `CaseSection({ id, eyebrow, title, intro, bg, children })` — section shell. `bg`: `white | soft | cream | navy`. Pass `id` to anchor it for a TOC (adds `scroll-mt-20`).
- `StatTile({ value, label })` — big stat (reuses `.stat-card`).
- `FlowSteps({ steps, emphasizeLast })` — horizontal step flow, stacks on mobile, amber connectors. Each step `{ icon, title, caption, accent? }`. Accents cycle navy→teal→amber by default; last node solid unless `emphasizeLast={false}`.
- `StageCard({ number, title, accent, children })` — numbered card with accent bar + badge.
- `CodeCard({ filename, code })` — premium light code card (copy button, line numbers, minimal Python highlighting).
- `Figure({ src, alt, caption })` — image that degrades to a clean dashed placeholder naming the missing file (use this, not raw `<img>`, so nothing looks broken before images are added).
- `ConfusionMatrix({ labels, diagonal })` — CSS-grid matrix.

For a long guide, add a sticky TOC at the top: `<nav class="... sticky top-16 z-30">` of anchor pills linking to each `CaseSection id`.

## DESIGN RULES — non-negotiable (these were learned the hard way)

**Palette — navy + amber only, plus neutrals.** This is the site's real theme — keep to it:
- Navy `#1A3A5C` (Tailwind `navy-600`) — structure, primary; also the "positive/strengths" signal.
- Amber `#E8A020` (`amber-500`) — emphasis, CTAs; also the "caution/limitations" signal (amber text `#C8861A`).
- Neutrals: ink `#1A1A1A`, body `#4A5568`, muted `#5A6678`, border `#C8D9EC` (`navy-200`), cream `#FAFAF7`.
- **Never introduce teal/violet/emerald/clay/random colors.** To give many items distinct identity, *cycle* navy↔amber (`ACCENTS[i % 2]`), don't add hues. (The only place teal `#0694A2` is allowed is the `CodeCard` syntax highlighting — and only there.)

**Typography — intentional, not mixed.**
- Lora **serif** → titles and headings (`font-serif`, the default for h1–h4).
- Inter **sans** (the global default) → all dense/body/card text. Do NOT put serif body into data-dense cards.
- JetBrains **mono** → only small uppercase eyebrow labels and numbers.

**Text size — readable on mobile.**
- Card/body copy: **≥15px** (`text-[15px] leading-relaxed`). Never `text-xs` for primary reading.
- Mono labels: **≥11px** (`text-[11px]`). Section intros: 16px+.

**Voice — academic, no hype.** Evidence-based, practical, honest about limitations. No marketing language, no exaggerated AI claims. Verify facts (pricing, features) against official sources with WebSearch before stating them, and add a "verified <month/year>" note for anything volatile.

**No meta-narration — ever.** Never describe the page itself ("each card is colour-coded so you can scan…", "scroll down to…", "as you can see below"). Write about the subject only. The reader doesn't care how the page is built.

**Restraint / editorial feel.** Not everything is a card. Use prose to connect modules so it reads like an article, not a dashboard. Lighten boxing where you can; reserve full bordered cards for content that earns it.

## Images
- Folder: `public/blog/<slug>/`. Reference as `/blog/<slug>/<name>.jpg`.
- In React posts use `Figure` (graceful placeholder). In Markdown posts prefer native infographic blocks; only use `::image` when the file will exist soon.
- Always hand the user **AI image prompts** (purpose, prompt, placement, dimensions) on a white background with the navy/teal/amber palette and minimal embedded text (generators mangle text).

## Finish
Run `npm run build` to confirm it compiles. Don't commit unless asked.
