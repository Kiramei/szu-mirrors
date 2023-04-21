import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
// import { createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/:id+',
      name:'child',
      component: HomeView
    }
  ]
})

export default router
