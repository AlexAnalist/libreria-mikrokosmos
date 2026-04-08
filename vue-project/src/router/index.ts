import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Asegúrate de que el nombre coincida
import BookDetailView from '../views/BookDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Ruta dinámica: el :id cambiará según el libro
      path: '/libro/:id', 
      name: 'book-detail',
      component: BookDetailView,
      // Esto permite pasar el :id como una prop al componente
      props: true 
    }
    // Aquí irás añadiendo tus otras 39 rutas después
  ]
})

export default router