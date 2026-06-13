import { useRef, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Wireframe Globe Hero Background
 * Slowly rotating globe with glowing dots at locations you've worked.
 */
export default function GlobeHero({ colorScheme = 'navy' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Skip the WebGL animation on small screens — saves battery/CPU on phones.
    if (window.matchMedia('(max-width: 768px)').matches) return

    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const schemes = {
      navy:    { wire: 0x2D6A9F, dot: 0xE8A020, arc: 0xF2B843 },
      teal:    { wire: 0x2DA89F, dot: 0xF2B843, arc: 0xE8A020 },
      purple:  { wire: 0x6B5DA8, dot: 0xE8A020, arc: 0xF2B843 },
      emerald: { wire: 0x2DA85D, dot: 0xE8A020, arc: 0xF2B843 },
    }
    const colors = schemes[colorScheme] || schemes.navy

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 35

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const globeGroup = new THREE.Group()

    // Wireframe globe
    const globeGeom = new THREE.SphereGeometry(10, 40, 30)
    const wireGeom = new THREE.WireframeGeometry(globeGeom)
    const wireMat = new THREE.LineBasicMaterial({
      color: colors.wire,
      transparent: true,
      opacity: 0.25,
    })
    const wireGlobe = new THREE.LineSegments(wireGeom, wireMat)
    globeGroup.add(wireGlobe)

    // Inner solid sphere for depth
    const innerGeom = new THREE.SphereGeometry(9.85, 32, 32)
    const innerMat = new THREE.MeshBasicMaterial({
      color: colors.wire,
      transparent: true,
      opacity: 0.05,
    })
    const innerSphere = new THREE.Mesh(innerGeom, innerMat)
    globeGroup.add(innerSphere)

    // Location dots — places you've worked
    const locations = [
      { lat: 31.4, lng: 73.0, name: 'Faisalabad' },      // Pakistan
      { lat: 14.0, lng: 100.6, name: 'Bangkok' },         // Thailand
      { lat: 35.7, lng: 139.7, name: 'Tokyo' },           // Japan
      { lat: 26.1, lng: 119.3, name: 'Fuzhou' },          // China
      { lat: 53.4, lng: -6.6, name: 'Maynooth' },         // Ireland
      { lat: -37.8, lng: 175.3, name: 'Hamilton' },       // New Zealand
    ]

    const dots = []
    const latLngToVec3 = (lat, lng, radius) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      )
    }

    locations.forEach((loc) => {
      const pos = latLngToVec3(loc.lat, loc.lng, 10.2)
      const dotGeom = new THREE.SphereGeometry(0.25, 12, 12)
      const dotMat = new THREE.MeshBasicMaterial({ color: colors.dot })
      const dot = new THREE.Mesh(dotGeom, dotMat)
      dot.position.copy(pos)
      globeGroup.add(dot)

      // Outer ring (pulse)
      const ringGeom = new THREE.RingGeometry(0.35, 0.55, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.dot,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeom, ringMat)
      ring.position.copy(pos)
      ring.lookAt(0, 0, 0)
      ring.userData.phase = Math.random() * Math.PI * 2
      globeGroup.add(ring)
      dots.push({ dot, ring, pos })
    })

    // Floating particles around globe
    const particleCount = 40
    const particleGeom = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 14 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePos[i * 3 + 2] = r * Math.cos(phi)
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: colors.dot,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particleGeom, particleMat)

    scene.add(globeGroup)
    scene.add(particles)

    // Tilt globe
    globeGroup.rotation.x = 0.4

    let frameId
    let time = 0
    const animate = () => {
      time += 0.01
      globeGroup.rotation.y += 0.002

      // Ring pulse
      dots.forEach(({ ring }) => {
        const pulse = 1 + Math.sin(time * 2 + ring.userData.phase) * 0.2
        ring.scale.set(pulse, pulse, pulse)
        ring.material.opacity = 0.4 + Math.sin(time * 2 + ring.userData.phase) * 0.3
      })

      particles.rotation.y -= 0.0008

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
      wireGeom.dispose(); wireMat.dispose()
      innerGeom.dispose(); innerMat.dispose()
      particleGeom.dispose(); particleMat.dispose()
      dots.forEach(({ dot, ring }) => {
        dot.geometry.dispose(); dot.material.dispose()
        ring.geometry.dispose(); ring.material.dispose()
      })
      renderer.dispose()
    }
  }, [colorScheme])

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />
}
