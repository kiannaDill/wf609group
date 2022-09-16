import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from '@/views/login/index.vue'
import PageNotFount from "@/views/exception/PageNotFount.vue";
import UserLayout from '@/components/layout/UserLayout.vue'

const routes = [
  {
    path: '/',
    component: UserLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: '' }
      }
    ],
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/:pathMatch(.*)',
    component: PageNotFount
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;