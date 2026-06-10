# drirfanahmad.com — v3

Personal portfolio website for Dr. Irfan Ahmad — Teaching Fellow at the University of Waikato.

**React + Vite + Tailwind CSS + Three.js + Markdown blog**. Hosted on GitHub Pages at https://drirfanahmad.com

---

## Quick start

```bash
npm install
npm run dev          # local dev at http://localhost:5173
npm run build        # production build
npm run preview      # preview production build locally
```

---

## 🎨 Changing the 3D hero style

Edit `src/components/hero/heroConfig.js`. Three values control everything:
- `style`: `neural` | `globe` | `cubes`
- `colorScheme`: `navy` | `teal` | `purple` | `emerald`
- `background`: `midnight` | `space` | `ocean` | `gradient`

See `HERO_GUIDE.md` for full combinations.

---

## ✍️ Writing blog posts

Blog posts are Markdown files in `src/posts/`. The site auto-generates the blog index and individual post pages.

### Create a new post

1. Create a file: `src/posts/my-new-post.md`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2026-06-15"
excerpt: "One-sentence summary that appears in the blog index."
tags: ["Machine Learning", "Tutorial"]
cover: ""
---

Your post content goes here in normal Markdown.
```

3. Create folder for images: `public/blog/my-new-post/` and drop image files (01.jpg, 02.jpg etc.)

That's it. The post appears on `/blog/my-new-post` automatically after `npm run build` or hot-reload.

### Special editorial blocks

Use these custom blocks in your Markdown for magazine-style formatting:

**Section header (with number):**
```
::section 01 — Choose Your Niche
```

**Pull quote:**
```
:::pullquote -- Optional citation
The lecture you give Tuesday is already content.
:::
```

**Callout box (with label):**
```
:::callout 🎯 Recommended approach
Your callout text. Can contain **bold** and other markdown.
:::
```

**Stats row:**
```
:::stats
87% — Hiring committees Google candidates
3 hrs — Per week
10× — More grant inquiries
:::
```

**Numbered action list:**
```
:::actions
**Record your lecture (once)**
Description goes here on the next line(s).
---
**Transcript → LinkedIn post**
More description.
:::
```

**Single image:**
```
::image{src=/blog/my-post/01.jpg caption="Optional caption"}
```

**Image grid (2-3 images side by side):**
```
:::imagegrid
::image{src=/blog/my-post/01.jpg caption="First image"}
::image{src=/blog/my-post/02.jpg caption="Second image"}
:::
```

**Highlight in body text:**
```
Use <mark>highlighted text</mark> like this.
```

---

## How to update content

| File | What to edit |
|------|-------------|
| `src/data/profile.js` | Name, title, bio, photo, stats, social links |
| `src/data/publications.js` | Publications (place new ones at top) |
| `src/data/researchInterests.js` | Research interests shown on Research page |
| `src/data/teaching.js` | Courses and institutions |
| `src/data/projects.js` | Research and supervised projects |
| `src/data/resources.js` | Scholarships, PhD positions, datasets, tools |
| `src/data/skills.js` | Skills marquee + 3 focus areas + 3 philosophy pillars |
| `src/data/youtube.js` | Featured YouTube videos on homepage |
| `src/posts/*.md` | Blog posts (one Markdown file per post) |

---

## Project structure

```
drirfanahmad/
├── public/
│   ├── CNAME, favicon.svg, photo.jpg
│   ├── cv/Irfan_Ahmad_CV.pdf
│   └── blog/<post-slug>/         ← Drop blog post images here
├── src/
│   ├── components/
│   │   ├── hero/                 3D homepage hero (3 styles)
│   │   ├── Nav.jsx, Footer.jsx, PageHero.jsx
│   ├── pages/
│   │   ├── Home.jsx              Homepage with 10 sections
│   │   ├── Research.jsx          Research interests + publications
│   │   ├── Teaching.jsx          Philosophy + courses
│   │   ├── Projects.jsx, Resources.jsx, About.jsx
│   │   ├── Blog.jsx              Blog index
│   │   └── BlogPost.jsx          Individual post
│   ├── data/                     ← Content data
│   ├── posts/                    ← Blog posts (Markdown)
│   ├── hooks/useReveal.js        IntersectionObserver hook
│   ├── lib/blogLoader.js         Markdown parser + custom blocks
│   ├── App.jsx, main.jsx, index.css
├── .github/workflows/deploy.yml
├── package.json
└── tailwind.config.js
```

---

## What's new in v3

- ✨ **Fixed the marquee bug** — skills now scroll smoothly with pure CSS animation
- ✨ **6 distinct page heroes** — Research / Teaching / Projects / Resources / Blog / About each have their own visual identity
- ✨ **Card gradient borders on hover** — premium navy → amber gradient sweeps around cards
- ✨ **Reveal-on-scroll cascade** — cards fade and scale into view as you scroll
- ✨ **Markdown blog system** — write posts in `.md` files with editorial blocks
- ✨ **First blog post included** — "Invisible in 5 Years" with stats, pull quotes, callouts, image slots
- ✨ **Research interests section** — 4 interest cards (ML, Deep Learning, Computer Vision, Chaos Theory) with icons at top of Research page
- ✨ **Teaching philosophy** — 3 pillars for the AI era, on both Home and Teaching pages
- ✨ **New tools added** — Docker, LaTeX, Moodle, Claude Code, HuggingFace in the marquee
