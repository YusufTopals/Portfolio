/**
 * Vloeiende (inertia) scroll voor de hele site, zonder externe dependency.
 * Muiswiel/trackpad-scrolls worden opgevangen en zacht naar de doelpositie
 * geïnterpoleerd. Touch, toetsenbord en de scrollbalk blijven native werken.
 */

const EASE = 0.1          // hoe hoger, hoe sneller hij "bijtrekt" (0–1)
const LINE_HEIGHT = 16    // voor muizen die in regels i.p.v. pixels scrollen

let target = 0
let current = 0
let frame: number | null = null

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight

const clamp = (value: number) => Math.max(0, Math.min(value, maxScroll()))

/** Stopt een lopende animatie, bijv. bij navigatie of toetsenbordgebruik. */
export const stopSmoothScroll = () => {
    if (frame !== null) cancelAnimationFrame(frame)
    frame = null
    target = current = window.scrollY
}

const tick = () => {
    current += (target - current) * EASE

    if (Math.abs(target - current) < 0.5) {
        current = target
        frame = null
    } else {
        frame = requestAnimationFrame(tick)
    }

    // 'instant' omdat html { scroll-behavior: smooth } anders elke stap opnieuw zou animeren
    window.scrollTo({ top: current, behavior: 'instant' })
}

/** Kan een element binnen de pagina zelf nog in deze richting scrollen? (lightbox, lijsten) */
const canScrollInside = (start: EventTarget | null, deltaY: number) => {
    let el = start instanceof Element ? start : null
    while (el && el !== document.documentElement && el !== document.body) {
        const { overflowY } = getComputedStyle(el)
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
            if (deltaY < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight) return true
        }
        el = el.parentElement
    }
    return false
}

const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return                                   // pinch-zoom
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return // horizontaal scrollen
    if (document.body.style.overflow === 'hidden') return       // bijv. lightbox open
    if (canScrollInside(event.target, event.deltaY)) return

    event.preventDefault()

    const multiplier = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? window.innerHeight : 1
    if (frame === null) target = current = window.scrollY
    target = clamp(target + event.deltaY * multiplier)

    if (frame === null) frame = requestAnimationFrame(tick)
}

/** Houdt de positie gelijk als er buiten het wiel om gescrold wordt (toetsen, scrollbalk, ankers). */
const onScroll = () => {
    if (frame === null) target = current = window.scrollY
}

export const initSmoothScroll = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (reducedMotion || touchOnly) return

    target = current = window.scrollY
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', stopSmoothScroll)
    window.addEventListener('resize', () => { target = clamp(target) })
}
