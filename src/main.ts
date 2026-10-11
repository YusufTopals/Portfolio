import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import { initSmoothScroll } from './lib/smoothScroll'
import './index.css'

createApp(App)
    .use(router)
    .directive('reveal', vReveal)
    .mount('#app')

initSmoothScroll()
