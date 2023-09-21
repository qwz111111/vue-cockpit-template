import VueRouter from 'vue-router'


const cockpitChildren = [
  {
    path: 'index',
    component: () => import('@/views/cockpit/index/Index')
  }
]

const routes = [
  {
    path: '/error/not_found',
    component: () => import('@/views/error/NotFound.vue'),
  },
  {
    path: '/cockpit',
    component: () => import('@/views/cockpit/Layout.vue'),
    children: cockpitChildren
  },
  {
    path: '/',
    redirect: '/cockpit/index'
  },
  {
    path: '*',
    redirect: '/error/not_found'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
