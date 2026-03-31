import { useEffect, useRef } from 'react'

// Brand colors
const TEAL = [91 / 255, 176 / 255, 186 / 255]       // #5BB0BA
const AMETHYST = [118 / 255, 97 / 255, 164 / 255]   // #7661A4

export default function HeroWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const SCALE = 3

    let width, height, imageData, data

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      width = Math.floor(canvas.width / SCALE)
      height = Math.floor(canvas.height / SCALE)
      imageData = ctx.createImageData(width, height)
      data = imageData.data
    }

    window.addEventListener('resize', resize)
    resize()

    const SIN = new Float32Array(1024)
    const COS = new Float32Array(1024)
    for (let i = 0; i < 1024; i++) {
      const a = (i / 1024) * Math.PI * 2
      SIN[i] = Math.sin(a)
      COS[i] = Math.cos(a)
    }
    const fsin = (x) => SIN[Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023]
    const fcos = (x) => COS[Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023]

    const start = Date.now()

    const render = () => {
      const t = (Date.now() - start) * 0.001

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height
          const uy = (2 * y - height) / height

          let a = 0, d = 0
          for (let i = 0; i < 4; i++) {
            a += fcos(i - d + t * 0.4 - a * ux)
            d += fsin(i * uy + a)
          }

          // wave values in [-1, 1] range
          const wave = (fsin(a) + fcos(d)) * 0.5          // -1 to 1
          const tealStrength = Math.max(0, wave) * 0.18    // 0 to 0.18
          const amethystStrength = Math.max(0, -wave + fcos(d * 1.3 + t * 0.15) * 0.5) * 0.12 // 0 to 0.12

          // Start from near-white and tint toward brand colors
          const r = 1.0 - tealStrength * (1 - TEAL[0]) - amethystStrength * (1 - AMETHYST[0])
          const g = 1.0 - tealStrength * (1 - TEAL[1]) - amethystStrength * (1 - AMETHYST[1])
          const b = 1.0 - tealStrength * (1 - TEAL[2]) - amethystStrength * (1 - AMETHYST[2])

          const idx = (y * width + x) * 4
          data[idx]     = Math.max(0, Math.min(255, r * 255))
          data[idx + 1] = Math.max(0, Math.min(255, g * 255))
          data[idx + 2] = Math.max(0, Math.min(255, b * 255))
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'low'
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  )
}
