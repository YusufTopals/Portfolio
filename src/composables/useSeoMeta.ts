export interface SeoMeta {
    title: string
    description: string
    /** Pad binnen /public, bijv. '/projects/dark-tech/sprint1-eerste-design.png' */
    image?: string
}

const SITE_NAME = 'Yusuf Topal'

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
}

const removeMeta = (attr: 'name' | 'property', key: string) => {
    document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

/** Zet title, description en Open Graph/Twitter-tags voor de huidige pagina. */
export const setSeoMeta = ({ title, description, image }: SeoMeta) => {
    const fullTitle = `${title} – ${SITE_NAME}`
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', window.location.href)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)

    if (image) {
        const absolute = new URL(image, window.location.origin).href
        upsertMeta('property', 'og:image', absolute)
        upsertMeta('name', 'twitter:image', absolute)
        upsertMeta('name', 'twitter:card', 'summary_large_image')
    } else {
        removeMeta('property', 'og:image')
        removeMeta('name', 'twitter:image')
        upsertMeta('name', 'twitter:card', 'summary')
    }
}
