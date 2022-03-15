import Vue from 'vue'
import VueRouter from 'vue-router'
import workspacePage from '../views/workspace-page.vue'
import homePage from '../views/home-page.vue'
import loginPage from '../views/login-page.vue'
import taskDetails from '../cmps/task-details.vue'

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
    component: workspacePage,
    children: [
      {
        path: ':groupId/:taskId',
        component: taskDetails,
      }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
]

const router = new VueRouter({
  routes
})

export default router
