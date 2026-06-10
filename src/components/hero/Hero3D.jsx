import { Suspense, lazy } from 'react'
import { heroConfig } from './heroConfig'

const NeuralHero = lazy(() => import('./NeuralHero'))
const GlobeHero = lazy(() => import('./GlobeHero'))
const CubesHero = lazy(() => import('./CubesHero'))

export default function Hero3D() {
  const Component = {
    neural: NeuralHero,
    globe: GlobeHero,
    cubes: CubesHero,
  }[heroConfig.style] || NeuralHero

  return (
    <Suspense fallback={null}>
      <Component colorScheme={heroConfig.colorScheme} />
    </Suspense>
  )
}
