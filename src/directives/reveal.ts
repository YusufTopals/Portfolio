import type { Directive } from 'vue'

/**
 * v-reveal: fade-up zodra het element in beeld komt (eenmalig).
 * Optioneel een vertraging in ms: v-reveal="150"
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
        el.classList.add('reveal')
        if (binding.value) el.style.transitionDelay = `${binding.value}ms`

        if (!('IntersectionObserver' in window)) {
            el.classList.add('is-visible')
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('is-visible')
                        observer.disconnect()
                    }
                })
            },
            { rootMargin: '0px 0px -10% 0px' },
        )
        observer.observe(el)
        ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
    },
    unmounted(el) {
        ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver?.disconnect()
    },
}

declare module 'vue' {
    interface GlobalDirectives {
        vReveal: typeof vReveal
    }
}
