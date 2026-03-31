import { useState } from 'react'
import { motion } from 'framer-motion'
import './BookingPage.css'

function Label({ children }) {
  return <span className="hp-label">{children}</span>
}

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const TIMES = ['9:00am','9:30am','10:00am','10:30am','11:00am','11:30am','12:00pm','12:30pm','1:00pm','1:30pm','2:00pm','2:30pm','3:00pm','3:30pm','4:00pm']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay()
}

function CalendarFiller() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedTime, setSelectedTime] = useState(null)
  const [fmt, setFmt] = useState('12h')

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const isPast = (d) => {
    const date = new Date(year, month, d)
    const t = new Date(); t.setHours(0,0,0,0)
    return date < t
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const displayTimes = fmt === '24h'
    ? TIMES.map(t => {
        const [time, mer] = t.split(/(am|pm)/)
        const [h, m] = time.split(':')
        let hr = parseInt(h)
        if (mer === 'pm' && hr !== 12) hr += 12
        if (mer === 'am' && hr === 12) hr = 0
        return `${String(hr).padStart(2,'0')}:${m}`
      })
    : TIMES

  return (
    <div className="cal-widget">
      {/* LEFT PANEL */}
      <div className="cal-left">
        <div className="cal-left__logo">
          <img src="/Logo.png" alt="Resonance Healing" className="cal-left__img" />
        </div>
        <p className="cal-left__org">Resonance Healing</p>
        <h3 className="cal-left__title">30 Min Meeting</h3>
        <div className="cal-left__meta">
          <span className="cal-left__meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            30m
          </span>
          <span className="cal-left__meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            Cal Video
          </span>
          <span className="cal-left__meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Asia/Karachi ▾
          </span>
        </div>
      </div>

      {/* CENTER: CALENDAR */}
      <div className="cal-center">
        <div className="cal-center__nav">
          <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
          <span className="cal-center__month"><strong>{MONTHS[month]}</strong> {year}</span>
          <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
        </div>
        <div className="cal-grid">
          {DAYS.map(d => <div key={d} className="cal-grid__head">{d}</div>)}
          {cells.map((d, i) => (
            <div key={i} className={`cal-grid__cell${d === null ? ' cal-grid__cell--empty' : ''}${isPast(d) ? ' cal-grid__cell--past' : ''}${d === selectedDay && !isPast(d) ? ' cal-grid__cell--active' : ''}`}
              onClick={() => d && !isPast(d) && setSelectedDay(d)}>
              {d && <span>{d}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: TIME SLOTS */}
      {selectedDay && (
        <div className="cal-right">
          <div className="cal-right__header">
            <span className="cal-right__day-label">
              <strong>{DAYS[new Date(year, month, selectedDay).getDay()].slice(0,3)}</strong> {String(selectedDay).padStart(2,'0')}
            </span>
            <div className="cal-right__fmt">
              <button className={fmt === '12h' ? 'active' : ''} onClick={() => setFmt('12h')}>12h</button>
              <button className={fmt === '24h' ? 'active' : ''} onClick={() => setFmt('24h')}>24h</button>
            </div>
          </div>
          <div className="cal-right__slots">
            {displayTimes.map((t, i) => (
              <button
                key={t}
                className={`cal-slot${selectedTime === i ? ' cal-slot--active' : ''}`}
                onClick={() => setSelectedTime(i)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BookingPage() {
  return (
    <div className="app-page">
      <section className="bk-hero">
        <div className="bk-hero__blob bk-hero__blob--1" />
        <div className="bk-hero__blob bk-hero__blob--2" />
        <div className="bk-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Label>Book Online</Label>
          </motion.div>
          <motion.h1
            className="bk-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            Book Your <em>Session Online</em>
          </motion.h1>
          <motion.p
            className="bk-hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}>
            Whether you prefer a <strong>virtual consultation</strong> or an in-person visit, easily{' '}
            <strong>book your appointment online today</strong> to begin your healing journey.
          </motion.p>
        </div>
      </section>

      <motion.div
        className="bk-embed-wrap"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}>
        <div className="bk-embed-container">
          <CalendarFiller />
        </div>
      </motion.div>
    </div>
  )
}
