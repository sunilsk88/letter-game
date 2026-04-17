import { useState, useEffect, useRef, useCallback } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const QWERTY = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')
const NUMBERS = Array.from({ length: 20 }, (_, i) => String(i + 1))

const LETTER_WORDS = {
  A: ['ant'],
  B: ['boot', 'book'],
  C: ['cat', 'cut', 'cap', 'cook'],
  D: ['dip', 'dish'],
  E: ['egg'],
  F: ['fish', 'fun'],
  G: ['go', 'gum'],
  H: ['hi', 'hoot', 'hum', 'hut', 'happy'],
  I: ['it', 'in'],
  J: ['jump', 'join'],
  K: ['kiss', 'kit'],
  L: ['lit', 'lip'],
  M: ['moon'],
  N: ['noon', 'none'],
  O: ['off'],
  P: ['pop', 'poop', 'push', 'pack', 'pat'],
  Q: ['quit', 'queen'],
  R: ['Roopa', 'run', 'rose', 'room', 'root'],
  S: ['sit', 'sat', 'sun'],
  T: ['take', 'took', 'ton', 'tin', 'tick'],
  U: ['up'],
  V: ['vine', 'van'],
  W: ['win', 'won'],
  X: ['fix', 'fox', 'box'],
  Y: ['you', 'yum'],
  Z: ['zoo', 'zoom'],
}

const WORD_EMOJI = {
  ant: '🐜', boot: '👢', book: '📚', cat: '🐱', cut: '✂️',
  cap: '🧢', cook: '👨‍🍳', dip: '🫙', dish: '🍽️', egg: '🥚',
  fish: '🐟', fun: '🎉', go: '🏃', gum: '🍬', hi: '👋',
  hoot: '🦉', hum: '🎵', hut: '🛖', happy: '😊', it: '👆',
  in: '📥', jump: '🦘', join: '🤝', kiss: '💋', kit: '🧰',
  lit: '💡', lip: '👄', moon: '🌙', noon: '🕛', none: '❌',
  off: '🚫', pop: '🍭', poop: '💩', push: '🫸', pack: '📦',
  pat: '🤚', quit: '🚪', queen: '👑', roopa: '👧', run: '🏃',
  rose: '🌹', room: '🛋️', root: '🌱', sit: '🪑', sat: '🪑',
  sun: '☀️', take: '✋', took: '✋', ton: '⚖️', tin: '🥫',
  tick: '✅', up: '⬆️', vine: '🌿', van: '🚐', win: '🏆',
  won: '🥇', fix: '🔧', fox: '🦊', box: '📦', you: '👉',
  yum: '😋', zoo: '🦁', zoom: '🔍',
}

function ChasePeeking() {
  return (
    <svg viewBox="0 0 100 115" width="110" height="126" style={{ display: 'block' }}>
      {/* Police hat brim */}
      <ellipse cx="50" cy="28" rx="46" ry="10" fill="#1a4fcc" />
      {/* Hat top */}
      <rect x="18" y="2" width="64" height="28" rx="10" fill="#1a4fcc" />
      {/* Hat band */}
      <rect x="18" y="24" width="64" height="7" rx="3" fill="#1536a0" />
      {/* Badge */}
      <polygon points="50,7 53,15 62,15 55,21 58,29 50,24 42,29 45,21 38,15 47,15" fill="#f5c518" />
      {/* Head */}
      <ellipse cx="50" cy="75" rx="40" ry="44" fill="#d4973a" />
      {/* Inner face (lighter muzzle) */}
      <ellipse cx="50" cy="90" rx="26" ry="22" fill="#e8b86d" />
      {/* Ears */}
      <ellipse cx="14" cy="58" rx="13" ry="22" fill="#8b4f18" transform="rotate(-15 14 58)" />
      <ellipse cx="86" cy="58" rx="13" ry="22" fill="#8b4f18" transform="rotate(15 86 58)" />
      {/* Eyes white */}
      <circle cx="34" cy="68" r="11" fill="white" />
      <circle cx="66" cy="68" r="11" fill="white" />
      {/* Iris */}
      <circle cx="35" cy="69" r="6.5" fill="#3b1f08" />
      <circle cx="67" cy="69" r="6.5" fill="#3b1f08" />
      {/* Shine */}
      <circle cx="37" cy="66" r="2.5" fill="white" />
      <circle cx="69" cy="66" r="2.5" fill="white" />
      {/* Nose */}
      <ellipse cx="50" cy="85" rx="11" ry="8" fill="#2d1505" />
      {/* Smile */}
      <path d="M 36 97 Q 50 110 64 97" stroke="#2d1505" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Tongue */}
      <ellipse cx="50" cy="107" rx="8" ry="6" fill="#e8617a" />
    </svg>
  )
}

function BumblebeePeeking() {
  return (
    <svg viewBox="0 0 100 115" width="110" height="126" style={{ display: 'block' }}>
      {/* Antennae */}
      <line x1="33" y1="10" x2="18" y2="-4" stroke="#1f2937" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="16" cy="-5" r="6" fill="#fbbf24" stroke="#1f2937" strokeWidth="2" />
      <line x1="67" y1="10" x2="82" y2="-4" stroke="#1f2937" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="84" cy="-5" r="6" fill="#fbbf24" stroke="#1f2937" strokeWidth="2" />
      {/* Head base */}
      <rect x="8" y="8" width="84" height="82" rx="18" fill="#fbbf24" />
      {/* Black stripe across middle */}
      <rect x="8" y="54" width="84" height="16" rx="3" fill="#1f2937" />
      {/* Bottom yellow chin */}
      <rect x="8" y="70" width="84" height="20" rx="18" fill="#fbbf24" />
      {/* Visor background */}
      <rect x="13" y="14" width="74" height="44" rx="14" fill="#1e3a8a" />
      {/* Visor shine */}
      <rect x="13" y="14" width="74" height="44" rx="14" fill="#60a5fa" opacity="0.45" />
      {/* Eyes */}
      <circle cx="33" cy="34" r="13" fill="#fef08a" />
      <circle cx="67" cy="34" r="13" fill="#fef08a" />
      <circle cx="33" cy="35" r="7" fill="#1f2937" />
      <circle cx="67" cy="35" r="7" fill="#1f2937" />
      <circle cx="35" cy="31" r="3" fill="white" />
      <circle cx="69" cy="31" r="3" fill="white" />
      {/* Mouth grille */}
      <rect x="28" y="76" width="44" height="9" rx="4" fill="#1f2937" />
      <rect x="34" y="76" width="4" height="9" rx="1" fill="#fbbf24" />
      <rect x="44" y="76" width="4" height="9" rx="1" fill="#fbbf24" />
      <rect x="54" y="76" width="4" height="9" rx="1" fill="#fbbf24" />
      {/* Cheek bolts */}
      <circle cx="14" cy="74" r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
      <circle cx="86" cy="74" r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
    </svg>
  )
}

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={ddStyles.wrap}>
      <button style={ddStyles.trigger} onClick={() => setOpen(v => !v)}>
        <span>{selected?.label}</span>
        <span style={{ ...ddStyles.arrow, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>
      {open && (
        <div style={ddStyles.menu}>
          {options.map(opt => (
            <div
              key={opt.value}
              style={{ ...ddStyles.option, ...(opt.value === value ? ddStyles.optionActive : {}) }}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.value === value && <span style={ddStyles.check}>✓</span>}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ddStyles = {
  wrap: { position: 'relative', display: 'inline-block', userSelect: 'none' },
  trigger: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: 'white', border: '2.5px solid #e2e8f0',
    borderRadius: '14px', padding: '10px 16px',
    fontSize: '15px', fontFamily: "'Nunito', sans-serif",
    fontWeight: '800', color: '#1e293b', cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', minWidth: '140px',
    justifyContent: 'space-between',
  },
  arrow: { fontSize: '13px', color: '#64748b', transition: 'transform 0.18s ease' },
  menu: {
    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
    background: 'white', borderRadius: '16px', overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)',
    border: '2px solid #f1f5f9', zIndex: 50, minWidth: '100%',
  },
  option: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '12px 18px', fontSize: '15px',
    fontFamily: "'Nunito', sans-serif", fontWeight: '700',
    color: '#334155', cursor: 'pointer', transition: 'background 0.1s',
    background: 'white',
  },
  optionActive: { background: '#eff6ff', color: '#2563eb' },
  check: { fontSize: '13px', color: '#2563eb', fontWeight: '900' },
}

function pickWord(letter) {
  const words = LETTER_WORDS[letter.toUpperCase()]
  if (!words) return { text: '', emoji: '' }
  const w = words[Math.floor(Math.random() * words.length)]
  return {
    text: w.charAt(0).toUpperCase() + w.slice(1),
    emoji: WORD_EMOJI[w.toLowerCase()] || '',
  }
}

const COLORS = [
  '#1d4ed8', '#b91c1c', '#047857', '#7c3aed', '#c2410c',
  '#be185d', '#0f766e', '#4338ca', '#166534', '#9f1239',
]

function randomFromArray(arr, exclude = '') {
  let next = exclude
  while (arr.length > 1 && next === exclude) {
    next = arr[Math.floor(Math.random() * arr.length)]
  }
  return next || arr[0]
}

function getPool(mode) {
  if (mode === 'numbers') return NUMBERS
  if (mode === 'qwerty') return QWERTY
  return LETTERS
}

function getInitial(mode) {
  const pool = getPool(mode)
  if (mode === 'random') return randomFromArray(pool)
  return pool[0]
}

const MODE_LABELS = {
  alphabet: 'A to Z',
  random: 'Random Letters',
  numbers: '1 to 20',
  qwerty: 'QWERTY',
}

export default function App() {
  const [mode, setMode] = useState('alphabet')
  const [current, setCurrent] = useState('A')
  const [index, setIndex] = useState(0)
  const [voiceOn, setVoiceOn] = useState(true)
  const [wrongSoundOn, setWrongSoundOn] = useState(false)
  const [voiceRate, setVoiceRate] = useState('0.8')
  const [lastKey, setLastKey] = useState('—')
  const [typedInput, setTypedInput] = useState('')
  const [flash, setFlash] = useState(null)
  const [color, setColor] = useState(COLORS[0])
  const [word, setWord] = useState(() => pickWord('A').text)
  const [emoji, setEmoji] = useState(() => pickWord('A').emoji)
  const wordRef = useRef(pickWord('A').text)
  const [winW, setWinW] = useState(() => window.innerWidth)
  const hiddenInputRef = useRef(null)
  const isMobile = winW < 640

  const colorRef = useRef(COLORS[0])
  const modeRef = useRef(mode)
  const currentRef = useRef(current)
  const indexRef = useRef(index)
  const typedInputRef = useRef(typedInput)
  const voiceOnRef = useRef(voiceOn)
  const voiceRateRef = useRef(voiceRate)
  const wrongSoundOnRef = useRef(wrongSoundOn)
  useEffect(() => {
    const fn = () => setWinW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { currentRef.current = current }, [current])
  useEffect(() => { indexRef.current = index }, [index])
  useEffect(() => { typedInputRef.current = typedInput }, [typedInput])
  useEffect(() => { voiceOnRef.current = voiceOn }, [voiceOn])
  useEffect(() => { voiceRateRef.current = voiceRate }, [voiceRate])
  useEffect(() => { wrongSoundOnRef.current = wrongSoundOn }, [wrongSoundOn])
  useEffect(() => { wordRef.current = word }, [word])

  const nextColor = useCallback(() => {
    const c = randomFromArray(COLORS, colorRef.current)
    colorRef.current = c
    setColor(c)
    return c
  }, [])

  const speak = useCallback((letter, word, onDone) => {
    if (!voiceOnRef.current || !('speechSynthesis' in window)) {
      onDone?.()
      return
    }
    speechSynthesis.cancel()

    const sayLetter = new SpeechSynthesisUtterance(letter.toLowerCase())
    sayLetter.rate = Number(voiceRateRef.current)

    if (word) {
      const sayWord = new SpeechSynthesisUtterance(word.toLowerCase())
      sayWord.rate = Number(voiceRateRef.current)
      let fired = false
      const done = () => { if (!fired) { fired = true; onDone?.() } }
      sayWord.onend = done
      sayWord.onerror = done
      setTimeout(done, 4000)
      speechSynthesis.speak(sayLetter)
      speechSynthesis.speak(sayWord)
    } else {
      let fired = false
      const done = () => { if (!fired) { fired = true; onDone?.() } }
      sayLetter.onend = done
      sayLetter.onerror = done
      setTimeout(done, 3000)
      speechSynthesis.speak(sayLetter)
    }
  }, [])

  const playWrongSound = useCallback(() => {
    if (!wrongSoundOnRef.current || !('speechSynthesis' in window)) return
    speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance('no')
    utter.rate = 1
    utter.pitch = 0.8
    speechSynthesis.speak(utter)
  }, [])

  const triggerFlash = useCallback((state) => {
    setFlash(state)
    setTimeout(() => setFlash(null), 150)
  }, [])

  const advance = useCallback(() => {
    const m = modeRef.current
    const pool = getPool(m)
    let nextCurrent, nextIndex

    if (m === 'random') {
      nextCurrent = randomFromArray(pool, currentRef.current)
      nextIndex = 0
    } else {
      nextIndex = (indexRef.current + 1) % pool.length
      nextCurrent = pool[nextIndex]
    }

    setIndex(nextIndex)
    setCurrent(nextCurrent)
    const { text: wt, emoji: we } = pickWord(nextCurrent); wordRef.current = wt; setWord(wt); setEmoji(we)
    setTypedInput('')
    nextColor()
  }, [nextColor, speak])


  // Keep mobile keyboard visible
  useEffect(() => {
    hiddenInputRef.current?.focus()
  }, [])


  const handleKeyPress = useCallback((rawKey) => {
    const key = rawKey.toUpperCase()
    const m = modeRef.current
    const cur = currentRef.current

    if (m === 'numbers') {
      if (!/^[0-9]$/.test(rawKey)) return
      setLastKey(rawKey)
      const nextTyped = typedInputRef.current + rawKey
      setTypedInput(nextTyped)
      if (cur.startsWith(nextTyped)) {
        if (nextTyped === cur) {
          triggerFlash('correct')
          speak(cur, wordRef.current, () => advance())
        }
      } else {
        triggerFlash('wrong')
        playWrongSound()
        setTypedInput('')
      }
      return
    }

    if (!/^[A-Z]$/.test(key)) return
    setLastKey(key)
    setTypedInput(key)

    if (key === cur) {
      triggerFlash('correct')
      speak(key, wordRef.current, () => advance())
    } else {
      triggerFlash('wrong')
      playWrongSound()
      setTypedInput('')
    }
  }, [advance, speak, playWrongSound, triggerFlash])

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setIndex(0)
    setTypedInput('')
    const pool = getPool(newMode)
    const init = newMode === 'random' ? randomFromArray(pool) : pool[0]
    setCurrent(init)
    const { text: wt2, emoji: we2 } = pickWord(init); setWord(wt2); setEmoji(we2)
    nextColor()
  }

  const handleReset = () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel()
    setLastKey('—')
    setTypedInput('')
    const pool = getPool(mode)
    const init = mode === 'random' ? randomFromArray(pool) : pool[0]
    setIndex(0)
    setCurrent(init)
    const { text: wt3, emoji: we3 } = pickWord(init); wordRef.current = wt3; setWord(wt3); setEmoji(we3)
    nextColor()
  }

  const wrapClass = flash ? `letter-wrap ${flash}` : 'letter-wrap'

  return (
    <div style={{ ...styles.page, ...(isMobile ? { alignItems: 'flex-start', padding: '16px 12px' } : {}) }} onClick={() => hiddenInputRef.current?.focus()}>
      {/* Hidden input keeps mobile keyboard open and captures input */}
      <input
        ref={hiddenInputRef}
        onBlur={() => setTimeout(() => hiddenInputRef.current?.focus(), 100)}
        onKeyDown={(e) => {
          handleKeyPress(e.key)
          e.preventDefault()
        }}
        onInput={(e) => {
          // Fallback for Android where onKeyDown fires with key='Unidentified'
          const val = e.currentTarget.value
          if (val) handleKeyPress(val[val.length - 1])
          e.currentTarget.value = ''
        }}
        style={{ position: 'fixed', top: '-200px', left: 0, width: '1px', height: '1px', opacity: 0, fontSize: '16px' }}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        readOnly={false}
      />

      <div style={{ ...styles.app, ...(isMobile ? { gap: '12px' } : {}) }}>

        {/* Header */}
        <div style={{ ...styles.header, ...(isMobile ? { padding: '0 8px' } : {}) }}>
          <div style={styles.headerLeft}>
            <span style={styles.appTitle}>LetterGame</span>
          </div>
          <div style={styles.headerRight}>
            <CustomSelect
              value={mode}
              onChange={handleModeChange}
              options={[
                { value: 'alphabet', label: 'A → Z' },
                { value: 'random',   label: 'Random' },
                { value: 'numbers',  label: '1 → 20' },
                { value: 'qwerty',   label: 'QWERTY' },
              ]}
            />
            <CustomSelect
              value={voiceRate}
              onChange={setVoiceRate}
              options={[
                { value: '0.65', label: 'Slower' },
                { value: '0.8',  label: 'Slow' },
                { value: '1',    label: 'Normal' },
              ]}
            />
          </div>
        </div>

        {/* Card + peeking characters wrapper */}
        <div style={{ ...styles.cardWrapper, ...(isMobile ? { marginBottom: '20px' } : {}) }}>

          {/* Side peekers — hidden on mobile (overflow) */}
          {!isMobile && <div style={{ ...styles.peekSide, ...styles.peekLeft }}>🦕</div>}
          {!isMobile && <div style={{ ...styles.peekSide, ...styles.peekRight }}>🦖</div>}
          {!isMobile && <div style={styles.peekBottomLeft}><ChasePeeking /></div>}
          {!isMobile && <div style={styles.peekBottomRight}><BumblebeePeeking /></div>}

          {/* Main card */}
          <div style={{
            ...styles.card,
            ...(isMobile ? { padding: '28px 16px 20px' } : {}),
            ...(flash === 'correct' ? styles.cardCorrect : {}),
            ...(flash === 'wrong' ? styles.cardWrong : {}),
          }}>
            <p style={styles.prompt}>{isMobile ? 'Type the matching letter' : 'Press the matching key'}</p>

            <div style={{ ...styles.letterRow, ...(isMobile ? { gap: '16px', minHeight: '160px' } : {}) }}>
              <div style={{ ...styles.letter, color }}>{current}</div>
              {word && <div style={{ ...styles.divider, ...(isMobile ? { height: '100px' } : {}) }} />}
              {word && (
                <div style={styles.wordBlock}>
                  <div style={styles.emojiDisplay}>{emoji}</div>
                  <div style={{ ...styles.wordDisplay, color }}>{word}</div>
                </div>
              )}
            </div>

            <div style={{
              ...styles.feedbackBar,
              opacity: flash ? 1 : 0,
              background: flash === 'correct' ? '#22c55e' : '#ef4444',
            }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ ...styles.controls, ...(isMobile ? { gap: '8px' } : {}) }}>
          <button onClick={handleReset} style={styles.btnGhost}>↺ Reset</button>
          <button
            onClick={() => { setVoiceOn(v => { if (v && 'speechSynthesis' in window) speechSynthesis.cancel(); return !v }) }}
            style={{ ...styles.btnPill, background: voiceOn ? '#6366f1' : '#94a3b8' }}
          >
            {voiceOn ? '🔊 Voice On' : '🔇 Voice Off'}
          </button>
          <button
            onClick={() => setWrongSoundOn(v => !v)}
            style={{ ...styles.btnPill, background: wrongSoundOn ? '#f59e0b' : '#94a3b8' }}
          >
            {wrongSoundOn ? '🔔 Wrong Sound On' : '🔕 Wrong Sound Off'}
          </button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100dvh',
    background: 'linear-gradient(160deg, #e0f2fe 0%, #fef9c3 50%, #fce7f3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Nunito', sans-serif",
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  app: {
    width: '100%',
    maxWidth: '860px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    padding: '0 4px',
  },
  headerLeft: {},
  headerRight: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  appTitle: {
    fontSize: '26px',
    fontWeight: '900',
    color: '#1e293b',
    letterSpacing: '-0.5px',
  },

  /* Card wrapper for peeking characters */
  cardWrapper: {
    position: 'relative',
    marginBottom: '60px', // room for bottom peekers
  },

  /* Side dino peekers — in FRONT of card (zIndex > card) so face shows at edge */
  peekSide: {
    position: 'absolute',
    fontSize: '100px',
    lineHeight: 1,
    userSelect: 'none',
    zIndex: 5,
  },
  peekLeft: {
    // 🦕 head is on the right → position so head is at card left edge
    left: '-70px',
    top: '38%',
    transform: 'translateY(-50%)',
  },
  peekRight: {
    // 🦖 head is on the left → position so head is at card right edge, flip to face card
    right: '-70px',
    top: '38%',
    transform: 'translateY(-50%) scaleX(-1)',
  },

  /* Bottom peekers — face peeks OVER the card's bottom edge */
  peekBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: '60px',
    transform: 'translateY(68%)', // 32% of SVG (face/head) stays above card bottom
    zIndex: 5,
  },
  peekBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: '60px',
    transform: 'translateY(68%)',
    zIndex: 5,
  },

  /* Main card */
  card: {
    background: 'white',
    borderRadius: '32px',
    padding: '52px 40px 36px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 3px 10px rgba(0,0,0,0.06)',
    border: '2px solid rgba(0,0,0,0.04)',
    transition: 'background 0.15s ease, transform 0.15s ease',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  },
  cardCorrect: {
    background: '#f0fdf4',
    transform: 'scale(1.015)',
  },
  cardWrong: {
    background: '#fff1f2',
  },
  prompt: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '32px',
  },

  /* Letter + word row */
  letterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
    minHeight: '220px',
  },
  letter: {
    fontSize: 'clamp(140px, 24vw, 240px)',
    fontWeight: '900',
    lineHeight: 1,
    userSelect: 'none',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
    transition: 'color 0.2s ease',
  },
  divider: {
    width: '3px',
    height: '160px',
    background: '#e2e8f0',
    borderRadius: '999px',
    flexShrink: 0,
  },
  wordBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  emojiDisplay: {
    fontSize: 'clamp(72px, 12vw, 130px)',
    lineHeight: 1,
    userSelect: 'none',
  },
  wordDisplay: {
    fontSize: 'clamp(40px, 7vw, 80px)',
    fontWeight: '900',
    userSelect: 'none',
    lineHeight: 1,
    letterSpacing: '-1px',
  },

  /* Feedback bar at bottom of card */
  feedbackBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '6px',
    borderRadius: '0 0 32px 32px',
    transition: 'opacity 0.15s ease',
  },

  /* Controls */
  controls: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '0 4px',
  },
  btnGhost: {
    cursor: 'pointer',
    background: 'white',
    color: '#475569',
    border: '2px solid #e2e8f0',
    borderRadius: '50px',
    padding: '12px 24px',
    fontSize: '16px',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: '700',
    backdropFilter: 'blur(8px)',
  },
  btnPill: {
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 24px',
    fontSize: '16px',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: '700',
    transition: 'background 0.2s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  },
}
