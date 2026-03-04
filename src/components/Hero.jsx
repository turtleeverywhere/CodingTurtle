import { useTranslation } from '../i18n/LanguageContext'
import { useRef, useEffect, useCallback } from 'react'

function Hero() {
  const { t } = useTranslation()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const isHoveringRef = useRef(false)
  const animationRef = useRef(null)
  const nodesRef = useRef([])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isMobileRef = useRef(
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
     window.matchMedia('(hover: none)').matches)
  )

  const generateNodes = useCallback((width, height) => {
    const nodes = []
    const isMobile = isMobileRef.current
    const densityDivisor = isMobile ? 15000 : 8000
    const nodeCount = Math.floor((width * height) / densityDivisor)
    const minDist = isMobile ? 80 : 60

    for (let i = 0; i < nodeCount * 3 && nodes.length < nodeCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      let valid = true
      for (const node of nodes) {
        const dx = node.x - x
        const dy = node.y - y
        if (Math.sqrt(dx * dx + dy * dy) < minDist) { valid = false; break }
      }
      if (valid) nodes.push({ x, y })
    }
    return nodes
  }, [])

  const computeConnections = useCallback((nodes, maxDist, canvasHeight) => {
    const connections = []
    const fadeZone = 150

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) {
          const y1 = nodes[i].y
          const y2 = nodes[j].y
          const dist1 = canvasHeight - y1
          const dist2 = canvasHeight - y2
          const bothInFadeZone = dist1 < fadeZone && dist2 < fadeZone
          if (bothInFadeZone) {
            const verticalDiff = Math.abs(y1 - y2)
            const horizontalDiff = Math.abs(dx)
            if (horizontalDiff > verticalDiff * 1.5) continue
            const deeperDist = Math.min(dist1, dist2)
            const keepChance = deeperDist / fadeZone
            if (Math.random() > keepChance) continue
          }
          connections.push({ i, j, dist })
        }
      }
    }
    return connections
  }, [])

  const connectionsRef = useRef([])

  const initNetworkWalkers = useCallback((nodes, connections) => {
    if (nodes.length === 0) return []
    const adjacency = nodes.map(() => [])
    for (const conn of connections) {
      adjacency[conn.i].push(conn.j)
      adjacency[conn.j].push(conn.i)
    }
    const walkers = []
    for (let i = 0; i < 3; i++) {
      let startNode = Math.floor(Math.random() * nodes.length)
      let attempts = 0
      while (adjacency[startNode].length === 0 && attempts < 50) {
        startNode = Math.floor(Math.random() * nodes.length)
        attempts++
      }
      walkers.push({ currentNode: startNode, targetNode: startNode, progress: 1, speed: 0.012 + Math.random() * 0.012 })
    }
    return walkers
  }, [])

  const adjacencyRef = useRef([])
  const walkersRef = useRef([])

  const updateNetworkWalkers = useCallback(() => {
    const walkers = walkersRef.current
    const adjacency = adjacencyRef.current
    for (const w of walkers) {
      if (w.progress >= 1) {
        w.currentNode = w.targetNode
        const neighbors = adjacency[w.currentNode]
        if (neighbors && neighbors.length > 0) {
          w.targetNode = neighbors[Math.floor(Math.random() * neighbors.length)]
          w.progress = 0
        }
      } else {
        w.progress += w.speed
        if (w.progress > 1) w.progress = 1
      }
    }
  }, [])

  const getWalkerPositions = useCallback(() => {
    const walkers = walkersRef.current
    const nodes = nodesRef.current
    return walkers.map(w => {
      const from = nodes[w.currentNode]
      const to = nodes[w.targetNode]
      if (!from || !to) return { x: 0, y: 0 }
      const t = w.progress * w.progress * (3 - 2 * w.progress)
      return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }
    })
  }, [])

  const lerpColor = useCallback((a, b, t) => {
    const parse = (c) => {
      const hex = c.replace('#', '')
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
    }
    const [r1, g1, b1] = parse(a)
    const [r2, g2, b2] = parse(b)
    return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`
  }, [])

  const lastFrameTimeRef = useRef(0)
  const targetFPSRef = useRef(isMobileRef.current ? 30 : 60)

  const drawNetwork = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const now = performance.now()
    const elapsed = now - lastFrameTimeRef.current
    const frameInterval = 1000 / targetFPSRef.current
    if (elapsed < frameInterval) {
      animationRef.current = requestAnimationFrame(drawNetwork)
      return
    }
    lastFrameTimeRef.current = now - (elapsed % frameInterval)

    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const mouse = mouseRef.current
    const isHovering = isHoveringRef.current
    const nodes = nodesRef.current
    const connections = connectionsRef.current

    if (!isHovering) updateNetworkWalkers()
    const walkerPositions = getWalkerPositions()

    ctx.clearRect(0, 0, width, height)

    const isMobile = isMobileRef.current
    const baseRadius = isMobile ? 2 : 2.5
    const maxRadius = isMobile ? 5 : 7
    const influenceRadius = isHovering ? (isMobile ? 300 : 400) : (isMobile ? 250 : 350)

    const styles = getComputedStyle(document.documentElement)
    const primaryColor = styles.getPropertyValue('--primary').trim() || '#426c53'
    const accentColor = styles.getPropertyValue('--accent').trim() || '#ba7373'

    const factors = nodes.map(node => {
      if (isHovering) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance < influenceRadius ? 1 - (distance / influenceRadius) : 0
      } else {
        let maxFactor = 0
        for (const p of walkerPositions) {
          const dx = p.x - node.x
          const dy = p.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const factor = distance < influenceRadius ? 1 - (distance / influenceRadius) : 0
          maxFactor = Math.max(maxFactor, factor * 0.7)
        }
        return maxFactor
      }
    })

    ctx.lineCap = 'round'
    for (const conn of connections) {
      const f1 = factors[conn.i]
      const f2 = factors[conn.j]
      const avgFactor = (f1 + f2) / 2
      if (avgFactor < 0.01) continue
      ctx.beginPath()
      ctx.moveTo(nodes[conn.i].x, nodes[conn.i].y)
      ctx.lineTo(nodes[conn.j].x, nodes[conn.j].y)
      ctx.strokeStyle = avgFactor > 0.1 ? accentColor : primaryColor
      ctx.globalAlpha = avgFactor * 0.6
      ctx.lineWidth = 1 + avgFactor
      ctx.stroke()
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const factor = factors[i]
      if (factor < 0.01) continue
      const radius = baseRadius + (maxRadius - baseRadius) * factor
      const color = factor > 0.1 ? lerpColor(primaryColor, accentColor, factor) : primaryColor
      if (factor > 0.2) { ctx.shadowColor = accentColor; ctx.shadowBlur = 15 * factor }
      else ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = factor
      ctx.fill()
    }

    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
    animationRef.current = requestAnimationFrame(drawNetwork)
  }, [lerpColor, updateNetworkWalkers, getWalkerPositions])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const connectionMaxDist = 120

    const initNetwork = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodesRef.current = generateNodes(canvas.width, canvas.height)
      connectionsRef.current = computeConnections(nodesRef.current, connectionMaxDist, canvas.height)
      const adjacency = nodesRef.current.map(() => [])
      for (const conn of connectionsRef.current) {
        adjacency[conn.i].push(conn.j)
        adjacency[conn.j].push(conn.i)
      }
      adjacencyRef.current = adjacency
      walkersRef.current = initNetworkWalkers(nodesRef.current, connectionsRef.current)
    }

    initNetwork()

    let resizeTimeout
    const handleResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(initNetwork, 150) }
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      isHoveringRef.current = true
    }
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; isHoveringRef.current = false }
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
        isHoveringRef.current = true
      }
    }
    const handleTouchEnd = () => {
      setTimeout(() => { mouseRef.current = { x: -1000, y: -1000 }; isHoveringRef.current = false }, 500)
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', () => { isHoveringRef.current = true })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchstart', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    animationRef.current = requestAnimationFrame(drawNetwork)

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [generateNodes, computeConnections, initNetworkWalkers, drawNetwork])

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <canvas ref={canvasRef} className="hero-grid-canvas"></canvas>
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content fade-in-up visible">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <a href="#contact" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToContact() }}>
          {t('hero.cta')}
        </a>
      </div>
    </section>
  )
}

export default Hero
