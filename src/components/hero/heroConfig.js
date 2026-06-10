/**
 * HERO CONFIGURATION
 * =====================================================
 * Change these values to swap the 3D hero style and colors.
 *
 * style options:
 *   'neural'  - Neural network particles with connecting lines (default)
 *   'globe'   - Wireframe globe with location dots (Pakistan → Thailand → NZ etc.)
 *   'cubes'   - Floating data cubes pulsing like neural activations
 *
 * colorScheme options:
 *   'navy'    - Navy blue + amber accents (default, matches brand)
 *   'teal'    - Teal + amber (more friendly)
 *   'purple'  - Purple + amber (more creative)
 *   'emerald' - Green + amber (more eco/data-science)
 *
 * background options:
 *   'midnight'  - Deep navy (#0A1A2E) — most professional
 *   'space'     - Pure black (#000) — most contrast
 *   'ocean'     - Navy 800 (#0F2238) — softer
 *   'gradient'  - Animated gradient — most dynamic
 */

export const heroConfig = {
  style: 'neural',
  colorScheme: 'navy',
  background: 'midnight',
}

export const backgroundStyles = {
  midnight: 'bg-navy-900',
  space: 'bg-black',
  ocean: 'bg-navy-800',
  gradient: 'bg-gradient-to-br from-navy-900 via-navy-700 to-navy-900 bg-[length:200%_200%] animate-gradient',
}
