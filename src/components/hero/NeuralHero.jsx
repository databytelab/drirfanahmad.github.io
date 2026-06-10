import { useRef, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Neural Network Particles Hero Background
 * Particles drift in 3D space, connecting with thin lines when close.
 * Colors: navy + amber dots on dark background.
 */
export default function NeuralHero({ colorScheme = 'navy' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // Color schemes — easy to change here
    const schemes = {
      navy:    { particle: 0x2D6A9F, accent: 0xE8A020, line: 0x4A7BA8 },
      teal:    { particle: 0x2DA89F, accent: 0xF2B843, line: 0x4AA8A0 },
      purple:  { particle: 0x6B5DA8, accent: 0xE8A020, line: 0x8A7BC8 },
      emerald: { particle: 0x2DA85D, accent: 0xE8A020, line: 0x4AC880 },
    }
    const colors = schemes[colorScheme] || schemes.navy

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.z = 40

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Particle system
    const particleCount = 80
    const particles = []
    const particleGroup = new THREE.Group()

    for (let i = 0; i < particleCount; i++) {
      const isAccent = i % 7 === 0
      const geom = new THREE.SphereGeometry(isAccent ? 0.35 : 0.2, 12, 12)
      const mat = new THREE.MeshBasicMaterial({
        color: isAccent ? colors.accent : colors.particle,
        transparent: true,
        opacity: isAccent ? 0.95 : 0.7,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
      )
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
      )
      particles.push(mesh)
      particleGroup.add(mesh)
    }
    scene.add(particleGroup)

    // Line connections - allocate once, update per frame
    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: colors.line,
      transparent: true,
      opacity: 0.25,
    })
    const positions = new Float32Array(particleCount * particleCount * 6)
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0)
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    mount.addEventListener('mousemove', onMouseMove)

    let frameId
    const animate = () => {
      // Move particles
      particles.forEach((p) => {
        p.position.add(p.userData.velocity)
        if (Math.abs(p.position.x) > 40) p.userData.velocity.x *= -1
        if (Math.abs(p.position.y) > 25) p.userData.velocity.y *= -1
        if (Math.abs(p.position.z) > 20) p.userData.velocity.z *= -1
      })

      // Update line connections (only nearby particles)
      let lineIdx = 0
      const maxDist = 12
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = particles[i].position.distanceTo(particles[j].position)
          if (dist < maxDist) {
            positions[lineIdx++] = particles[i].position.x
            positions[lineIdx++] = particles[i].position.y
            positions[lineIdx++] = particles[i].position.z
            positions[lineIdx++] = particles[j].position.x
            positions[lineIdx++] = particles[j].position.y
            positions[lineIdx++] = particles[j].position.z
          }
        }
      }
      // Clear remaining
      for (let k = lineIdx; k < positions.length; k++) positions[k] = 0
      lineGeometry.attributes.position.needsUpdate = true

      // Subtle camera drift toward mouse
      camera.position.x += (mouse.x * 4 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      particleGroup.rotation.y += 0.0008

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
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeChild(renderer.domElement)
      particles.forEach(p => { p.geometry.dispose(); p.material.dispose() })
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [colorScheme])

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />
}
