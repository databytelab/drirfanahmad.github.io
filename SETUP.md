# Manual Setup — items only you can complete

The codebase audit fixes are done. The items below need **your real data** (URLs, IDs,
DOIs, photos) that I can't invent. Each one lists *what*, *where (file + line)*, and *how*.

Work top-to-bottom — they're ordered by how visible/broken they are to visitors.

---

## 1. Contact + newsletter forms (CRITICAL — currently non-functional)

Both the contact form (About page) and newsletter (Home page) now submit via AJAX to a
**single shared endpoint**. Right now it points at a placeholder, so submissions fail.

- **Where:** `src/data/profile.js` → `formEndpoint` (line ~14)
- **How:**
  1. Go to <https://formspree.io>, sign up (free), and create a new form.
  2. Copy the form's endpoint — it looks like `https://formspree.io/f/abcdwxyz`.
  3. Replace the placeholder:
     ```js
     formEndpoint: 'https://formspree.io/f/abcdwxyz',
     ```
  4. Submit a test message from the live About page and confirm it arrives in your
     Formspree dashboard / email.
- **Note:** Contact and newsletter share one endpoint. Formspree tags each submission with
  the originating form, so you can tell them apart. If you'd rather keep them separate,
  create two Formspree forms and split `formEndpoint` into `contactEndpoint` /
  `newsletterEndpoint`, then update `src/pages/About.jsx` and `src/pages/Home.jsx`.

---

## 2. Social / profile links (CRITICAL — they point to generic homepages)

These feed the footer icons, the Research page buttons, and the About "University Profile"
link. Five of them currently open a logged-in homepage instead of *your* profile.

- **Where:** `src/data/profile.js` → `socials` (lines ~22–28)
- **How:** Replace each with your canonical profile URL:

  | Field          | Currently        | Put your real URL, e.g.                                   |
  |----------------|------------------|-----------------------------------------------------------|
  | `googleScholar`| homepage         | `https://scholar.google.com/citations?user=YOUR_ID`       |
  | `researchGate` | homepage         | `https://www.researchgate.net/profile/Your-Name`          |
  | `linkedin`     | homepage         | `https://www.linkedin.com/in/your-handle`                 |
  | `youtube`      | homepage         | `https://www.youtube.com/@yourchannel`                    |
  | `waikatoIRIS`  | homepage         | `https://profiles.waikato.ac.nz/your.profile`             |
  | `github`       | ✅ already real  | (leave as is — `github.com/databytelab`)                  |

  To find your Google Scholar ID: open your Scholar profile, copy the `user=...` value
  from the URL.

---

## 3. YouTube videos (CRITICAL — all three are the "Rick Astley" placeholder)

The three homepage video cards currently link to `dQw4w9WgXcQ` (a rickroll) and show its
thumbnail.

- **Where:** `src/data/youtube.js` → `videoId` on lines ~7, ~15, ~23, and
  `youtubeChannelUrl` on line ~32.
- **How:**
  1. Open each real video on YouTube. The URL is `https://youtube.com/watch?v=VIDEO_ID` —
     copy the 11-character `VIDEO_ID`.
  2. Paste it into the matching entry's `videoId`, and update `title`, `publishedAt`,
     `duration`, `description`, `tags` to match the real video.
  3. Confirm `youtubeChannelUrl` is your real channel handle (`@...`).
- **If you don't have videos yet:** delete the three entries in the `videos` array (leave
  it `export const videos = []`). The homepage YouTube section already handles an empty
  list gracefully — better to show nothing than rickrolls.

---

## 4. Publication links / DOIs (HIGH)

All 22 publications have an empty `link`. I added a **"View paper" link** to the Research
page that appears automatically once a `link` is filled in — so you only need to add the
data.

- **Where:** `src/data/publications.js` → the `link: ''` field on each entry.
- **How:** For each paper, paste its DOI URL, e.g.:
  ```js
  link: 'https://doi.org/10.1109/ACCESS.2020.2978492',
  ```
  Use the DOI (preferred), the IEEE Xplore page, or the journal's article URL. Entries you
  leave empty simply show no link — no breakage.

---

## 5. Project links (HIGH)

All 5 projects have empty `github` and `paper`, so every card shows "Contact for details".

- **Where:** `src/data/projects.js` → `github` / `paper` on each entry.
- **How:** Add a GitHub repo URL and/or the paper DOI. Four of the five map to papers you
  can reuse from step 4:
  - *Credit Card Fraud Detection* → the ACS 2025 conference paper
  - *Thai Currency Recognition* → the ICSPCS paper
  - *Thai Traffic Sign Recognition* → repo, if public
  - *Power Transformer Health Index* → the ICPEI 2022 paper
  Leave empty to keep the "Contact for details" fallback.

---

## 6. Compress the large blog images (PERFORMANCE)

`public/blog/invisible-in-5-years/` has three oversized images — `hero.jpg` (1.8 MB),
`01.jpg` (1.7 MB), `02.jpg` (1.3 MB) — ~5 MB for one post. The anthropic-academy images
(150–200 KB each) are the right size; match them.

- **How:** Resize each to ≤ 1600px wide and re-export at ~80% quality (target 150–250 KB),
  or convert to WebP. Tools: <https://squoosh.app> (browser, no install), or
  `npx @squoosh/cli --resize '{"width":1600}' --mozjpeg '{"quality":78}' public/blog/invisible-in-5-years/*.jpg`.
  Keep the same filenames so the markdown keeps working.

---

## 7. Verify the headline stats (DATA ACCURACY)

- **Where:** `src/data/profile.js` → `stats` (h-index, citations, rgScore, countries).
- **How:** Cross-check against your Google Scholar / ResearchGate (which you're wiring up in
  step 2) and update the numbers so the homepage counters are current. `publications: 22`
  already matches the array length.

---

## 8. (Optional) Dedicated social-share image

I added `og:image` pointing at `/photo.jpg`. For nicer link previews, create a 1200×630
banner (name + title + headshot), save it to `public/og-image.jpg`, and update the
`og:image` URL in `index.html`.

---

## What was already fixed in code (no action needed)

- Deleted dead files: `src/data/posts.js`, `src/pages/Scholarships.jsx`, `src/data/scholarships.js`.
- Removed the unused `HomeIcon` import, the unused `.card` CSS rule, and the unused
  `pattern-*` / `hero-orb` / `hero-symbol` CSS plus the ignored `variant` props.
- Forms converted to AJAX with real success/error states (just need the endpoint from #1).
- Added `aria-label`s to all form & search inputs; darkened `muted` text for WCAG AA contrast.
- Added the SPA redirect-decode script to `index.html` so deep links/refreshes work on
  GitHub Pages (pairs with `public/404.html`).
- Research page now renders a "View paper" link when a publication `link` is set.
- Made the blog `:::stats` parser tolerant of em-dash / en-dash / hyphen separators.
- `og:image` + `twitter:card` meta added.

> Tip: `public/photo1.jpg` and `public/photo3.jpg` are not referenced anywhere. Delete them
> if they're unused alternates (saves ~600 KB), or wire one in as your share image (#8).
