import Vue from 'vue'
import VueRouter from 'vue-router'
import workspacePage from '../views/workspace-page.vue'
import homePage from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: workspacePage
  },
]

const router = new VueRouter({
  routes
})

export default router
