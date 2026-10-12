import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home     from '@/components/Home.vue'
import About    from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Contact  from '@/components/Contact.vue'
import { setSeoMeta } from '@/composables/useSeoMeta'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        description?: string
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/', name: 'Home', component: Home,
        meta: { title: 'Portfolio', description: 'Portfolio van Yusuf Topal, Software Engineering student aan de HvA uit Amsterdam-Noord.' },
    },
    {
        path: '/about', name: 'About', component: About,
        meta: { title: 'Over mij', description: 'Yusuf Topal, 20 jaar, HBO-ICT Software Engineering student aan de HvA.' },
    },
    {
        path: '/projects', name: 'Projects', component: Projects,
        meta: { title: 'Projecten', description: 'Een overzicht van de projecten die Yusuf Topal heeft ontwikkeld.' },
    },
    {
        path: '/projects/ai-stylist-mirror', name: 'AIStylistProject', component: () => import('@/components/AIStylistProject.vue'),
        meta: { title: 'AI Stylist Mirror', description: 'Dark Tech semesterproject over AI-styling, smaakmanipulatie en de vraag waar persoonlijk advies overgaat in sturen.' },
    },
    // Devlog-pagina's zetten hun eigen SEO-metadata (zie ProjectDetail.vue)
    { path: '/projects/:slug', name: 'ProjectDetail', component: () => import('@/components/ProjectDetail.vue'), props: true },
    {
        path: '/contact', name: 'Contact', component: Contact,
        meta: { title: 'Contact', description: 'Neem contact op met Yusuf Topal.' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
        if (to.hash) return { el: to.hash, top: 96 }
        if (savedPosition) return savedPosition
        return { top: 0 }
    },
})

router.afterEach((to) => {
    if (to.meta.title && to.meta.description) {
        setSeoMeta({ title: to.meta.title, description: to.meta.description })
    }
})

export default router
