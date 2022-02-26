import Vue from 'vue'
import VueRouter from 'vue-router'
import workspacePage from '../views/workspace-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workspace',
    component: workspacePage
  },
]

const router = new VueRouter({
  routes
})

export default router
