import VueRouter from 'vue-router'

const redirectRoutes = [
  {
    path: '/',
    redirect: '/cockpit/index'
  },
  {
    path: '*',
    redirect: '/'
  }
]

const cockpitChildren = [
  {
    path: 'index',
    component: () => import('@/views/cockpit/index/Index')
  }
]

const routes = [
  ...redirectRoutes,
  {
    path: '/cockpit',
    component: () => import('@/views/cockpit/Layout.vue'),
    children: cockpitChildren
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
