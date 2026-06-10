# 🎨 3D Hero Style Guide

**File to edit:** `src/components/hero/heroConfig.js`

That's the ONLY file you need to touch to change the homepage hero.

---

## All 12 combinations at a glance

### Hero styles

**1. `neural` — Neural Network Particles** (DEFAULT)
- 80 floating particles connected by thin lines
- Lines fade in/out as particles get close
- Reads as "AI/ML researcher" within 2 seconds
- Subtle mouse interaction (camera drifts toward cursor)

**2. `globe` — Wireframe Globe**
- Slowly rotating wireframe Earth
- Glowing dots at all 6 locations you've worked
- Pakistan → Thailand → Japan → China → Ireland → New Zealand
- Pulsing rings animate at each location
- Perfect if you want to emphasize your international academic journey

**3. `cubes` — Floating Data Cubes**
- 3D grid of wireframe cubes pulsing like neural activations
- Some cubes glow amber (active neurons)
- Slow camera orbit creates depth
- Most "tensor/deep-learning" coded visual

### Color schemes

**`navy`** — #2D6A9F + amber accent (DEFAULT, most professional)
**`teal`** — #2DA89F + amber (friendlier, more approachable)
**`purple`** — #6B5DA8 + amber (creative, research-focused)
**`emerald`** — #2DA85D + amber (data science / sustainability)

### Backgrounds

**`midnight`** — Deep navy #0A1A2E (DEFAULT)
**`space`** — Pure black (highest contrast, dramatic)
**`ocean`** — Navy 800 #0F2238 (softer)
**`gradient`** — Slowly animated gradient (most dynamic, slight performance cost)

---

## Recommended combinations

**For academic / formal feel:**
```js
{ style: 'neural', colorScheme: 'navy', background: 'midnight' }
```

**For international identity emphasis:**
```js
{ style: 'globe', colorScheme: 'navy', background: 'midnight' }
```

**For deep learning / data scientist vibe:**
```js
{ style: 'cubes', colorScheme: 'teal', background: 'space' }
```

**For something distinctive:**
```js
{ style: 'neural', colorScheme: 'purple', background: 'gradient' }
```

**For research presentation seasons (memorable):**
```js
{ style: 'globe', colorScheme: 'emerald', background: 'midnight' }
```

---

## How to switch

1. Open `src/components/hero/heroConfig.js`
2. Change any of the three values
3. Save the file
4. The browser auto-reloads — see the new hero immediately

That's it. No other files need to change.

---

## Performance

All three hero styles are GPU-accelerated WebGL via Three.js. Bundle size is ~150KB (cached after first visit). On users with `prefers-reduced-motion`, the 3D animation auto-disables and the hero falls back to the static background — accessibility-safe by default.
