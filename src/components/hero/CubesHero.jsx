import { useRef, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Floating Data Cubes Hero Background
 * Pulsing 3D cube grid like an activating neural network tensor.
 */
export default function CubesHero({ colorScheme = 'navy' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const schemes = {
      navy:    { primary: 0x2D6A9F, accent: 0xE8A020, edge: 0x4A7BA8 },
      teal:    { primary: 0x2DA89F, accent: 0xF2B843, edge: 0x4AA8A0 },
      purple:  { primary: 0x6B5DA8, accent: 0xE8A020, edge: 0x8A7BC8 },
      emerald: { primary: 0x2DA85D, accent: 0xE8A020, edge: 0x4AC880 },
    }
    const colors = schemes[colorScheme] || schemes.navy

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(15, 12, 25)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const cubesGroup = new THREE.Group()
    const cubes = []
    const gridSize = 5
    const spacing = 3
    const cubeSize = 1.2

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Only show subset for less density
          if (Math.random() > 0.55) continue

          const isAccent = Math.random() > 0.85
          const geom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
          const mat = new THREE.MeshBasicMaterial({
            color: isAccent ? colors.accent : colors.primary,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.3,
          })
          const cube = new THREE.Mesh(geom, mat)

          // Wireframe edges
          const edgesGeom = new THREE.EdgesGeometry(geom)
          const edgesMat = new THREE.LineBasicMaterial({
            color: isAccent ? colors.accent : colors.edge,
            transparent: true,
            opacity: 0.6,
          })
          const edges = new THREE.LineSegments(edgesGeom, edgesMat)
          cube.add(edges)

          cube.position.set(
            (x - gridSize / 2) * spacing,
            (y - gridSize / 2) * spacing,
            (z - gridSize / 2) * spacing,
          )
          cube.userData = {
            basePos: cube.position.clone(),
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.5,
            baseOpacity: cube.material.opacity,
            edges,
          }
          cubes.push(cube)
          cubesGroup.add(cube)
        }
      }
    }
    scene.add(cubesGroup)

    let frameId
    let time = 0
    const animate = () => {
      time += 0.01

      cubes.forEach((cube) => {
        const { basePos, phase, speed, baseOpacity } = cube.userData
        // Floating motion
        cube.position.y = basePos.y + Math.sin(time * speed + phase) * 0.4

        // Pulsing opacity (like neural activation)
        const pulse = (Math.sin(time * 1.5 + phase) + 1) / 2
        cube.material.opacity = baseOpacity * (0.6 + pulse * 0.4)
        cube.userData.edges.material.opacity = 0.4 + pulse * 0.5

        // Subtle rotation
        cube.rotation.x += 0.002
        cube.rotation.y += 0.003
      })

      // Slow camera orbit
      const camRadius = 30
      camera.position.x = Math.cos(time * 0.1) * camRadius
      camera.position.z = Math.sin(time * 0.1) * camRadius
      camera.position.y = 12 + Math.sin(time * 0.2) * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
      cubes.forEach(c => {
        c.geometry.dispose()
        c.material.dispose()
        c.userData.edges.geometry.dispose()
        c.userData.edges.material.dispose()
      })
      renderer.dispose()
    }
  }, [colorScheme])

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />
}
