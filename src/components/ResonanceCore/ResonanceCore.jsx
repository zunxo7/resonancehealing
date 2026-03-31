import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ResonanceCore.css'

const CX = 100, CY = 100, RX = 72, RY = 20
const N = 30

const ORBIT_KF = Array.from({ length: N + 1 }, (_, i) => {
  const t = (2 * Math.PI * i) / N
  const ct = Math.cos(t), st = Math.sin(t)
  const depth = st
  return {
    x: +(CX + RX * ct).toFixed(1),
    y: +(CY + RY * st).toFixed(1),
    r: +(2 + 2.5 * (depth + 1) / 2).toFixed(2),
    opacity: +(0.35 + 0.65 * (depth + 1) / 2).toFixed(2),
  }
})

const BACK_ARC  = `M ${CX - RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY}`
const FRONT_ARC = `M ${CX + RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX - RX} ${CY}`

const ORBITALS = [
  { startAngle: 0,   color: '#5BB0BA', spinDur: 6,  electronDur: 3,  dir:  1 },
  { startAngle: 45,  color: '#6EC4CE', spinDur: 8,  electronDur: 4,  dir: -1 },
  { startAngle: 90,  color: '#9B7ECA', spinDur: 10, electronDur: 5,  dir:  1 },
  { startAngle: 135, color: '#7661A4', spinDur: 12, electronDur: 6,  dir: -1 },
]

const PARTICLE_COLORS = ['#5BB0BA', '#7661A4', '#9B7ECA', '#6EC4CE', '#a8e8f0']

function buildBurst() {
  const count = 14
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count + (Math.random() - 0.5) * 0.4
    const dist  = 48 + Math.random() * 36
    return {
      id: i,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      r: 1.8 + Math.random() * 2,
      dur: 0.5 + Math.random() * 0.25,
    }
  })
}

function Shockwave({ onDone }) {
  return (
    <motion.circle cx={CX} cy={CY} fill="none"
      stroke="url(#shock-gradient)" strokeWidth="2.5"
      initial={{ r: 8, opacity: 1, strokeWidth: 2.5 }}
      animate={{ r: 85, opacity: 0, strokeWidth: 0.5 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    />
  )
}

export default function ResonanceCore() {
  const [bursts, setBursts]       = useState([])
  const [shockwaves, setShockwaves] = useState([])

  const handleClick = useCallback(() => {
    const id = Date.now()
    setBursts(b => [...b, { id, particles: buildBurst() }])
    setShockwaves(s => [...s, id])
  }, [])

  const removeBurst    = useCallback(id => setBursts(b => b.filter(x => x.id !== id)), [])
  const removeShockwave = useCallback(id => setShockwaves(s => s.filter(x => x !== id)), [])

  return (
    <motion.div
      className="resonance-core"
      aria-hidden="true"
      onClick={handleClick}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="resonance-core__svg">
        <defs>
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-md">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="shock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5BB0BA" />
            <stop offset="100%" stopColor="#7661A4" />
          </linearGradient>
        </defs>

        {/* shockwave rings */}
        <AnimatePresence>
          {shockwaves.map(id => (
            <Shockwave key={id} onDone={() => removeShockwave(id)} />
          ))}
        </AnimatePresence>

        {/* spinning orbitals */}
        {ORBITALS.map(({ startAngle, color, spinDur, electronDur, dir }) => (
          <motion.g
            key={startAngle}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            animate={{ rotate: dir > 0 ? [startAngle, startAngle + 360] : [startAngle, startAngle - 360] }}
            transition={{ duration: spinDur, ease: 'linear', repeat: Infinity }}
          >
            <path d={BACK_ARC}  fill="none" stroke={color} strokeWidth="2.5" opacity="0.72" />
            <path d={FRONT_ARC} fill="none" stroke={color} strokeWidth="2.5" opacity="0.72" />
            <motion.circle
              fill={color} filter="url(#glow-sm)"
              initial={{ cx: ORBIT_KF[0].x, cy: ORBIT_KF[0].y, r: ORBIT_KF[0].r, opacity: ORBIT_KF[0].opacity }}
              animate={{
                cx:      ORBIT_KF.map(p => p.x),
                cy:      ORBIT_KF.map(p => p.y),
                r:       ORBIT_KF.map(p => p.r),
                opacity: ORBIT_KF.map(p => p.opacity),
              }}
              transition={{ duration: electronDur, ease: 'linear', repeat: Infinity }}
            />
          </motion.g>
        ))}

        {/* click burst particles */}
        <AnimatePresence>
          {bursts.map(({ id, particles }) =>
            particles.map((p, i) => (
              <motion.circle
                key={`${id}-${p.id}`}
                cx={CX} cy={CY} r={p.r}
                fill={p.color}
                filter="url(#glow-md)"
                initial={{ cx: CX, cy: CY, opacity: 1, r: p.r }}
                animate={{ cx: CX + p.tx, cy: CY + p.ty, opacity: 0, r: p.r * 0.4 }}
                transition={{ duration: p.dur, ease: 'easeOut' }}
                onAnimationComplete={i === 0 ? () => removeBurst(id) : undefined}
              />
            ))
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  )
}
