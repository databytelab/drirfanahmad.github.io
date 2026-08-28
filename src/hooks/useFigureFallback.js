import { useEffect } from 'react'

/**
 * Markdown bodies are injected with dangerouslySetInnerHTML, so their <img>
 * tags can't carry a React onError handler. This walks the rendered figures
 * after paint and flags any image that failed to load, which swaps in the
 * dashed placeholder defined in index.css instead of a broken-image icon.
 *
 * Pass the post/project slug as the dep so it re-runs when the route changes.
 */
export function useFigureFallback(dep) {
  useEffect(() => {
    const figures = document.querySelectorAll('.blog-figure')
    const bound = []

    figures.forEach(figure => {
      const img = figure.querySelector('img')
      if (!img) return

      const flag = () => figure.classList.add('is-missing')

      // Already failed before this effect ran (cached miss, or a fast 404).
      if (img.complete && img.naturalWidth === 0) {
        flag()
        return
      }
      // Loaded fine — make sure a stale flag from a previous render is cleared.
      if (img.complete) {
        figure.classList.remove('is-missing')
        return
      }

      img.addEventListener('error', flag)
      bound.push([img, flag])
    })

    return () => bound.forEach(([img, flag]) => img.removeEventListener('error', flag))
  }, [dep])
}
