import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetailView from '../views/BookDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { 
      path: '/libro/:id', 
      name: 'book-detail', 
      component: BookDetailView, 
      props: true 
    },
    { path: '/login', name: 'LogicaLogin', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/recuperar', name: 'forgotPassword', component: ForgotPasswordView },
  ]
})

export default router