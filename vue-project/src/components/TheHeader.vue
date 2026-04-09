<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ShoppingCart, UserCircle } from 'lucide-vue-next'
import { supabase } from '@/supabase'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const router = useRouter()
const haySesion = ref(false)

const obtenerSesion = async () => {
  // 1. Verificamos sesión de Supabase Auth
  const { data } = await supabase.auth.getSession()
  if (data.session) return true

  // 2. Verificamos inicio de sesión manual en localStorage
  const userManual = localStorage.getItem('mikrokosmos_user')
  return !!userManual
}

const verificarSesion = async () => {
  haySesion.value = await obtenerSesion()
}

const irAlPerfil = async () => {
  const logueado = await obtenerSesion()
  if (logueado) {
    router.push('/perfil')
  } else {
    router.push('/login')
  }
}

onMounted(() => {
  verificarSesion()
})
</script>

<template>
  <header class="main-header">
    <router-link to="/" class="logo-section">
      <img src="/assets/logo_tree.png" alt="Mikrokosmos Logo" class="logo-img" /> <h1 class="brand-name">Librería Mikrokosmos</h1>
    </router-link>
    
    <div class="search-bar">
      <input type="text" placeholder="Buscar..." />
      <Search class="icon search-icon" />
    </div>
    
    <div class="user-actions">
      <router-link to="/carrito" class="action-link cart-link">
        <ShoppingCart class="icon action-icon" />
        <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
      </router-link>
      <UserCircle 
        class="icon action-icon" 
        :class="{ 'is-active': haySesion }"
        @click="irAlPerfil" 
      />
    </div>
  </header>
</template>

<style scoped>
.main-header {
  background-color: #6A5ACD; /* Color morado principal de Figma */
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo-section { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; color: inherit; }
.logo-img { height: 40px; }
.brand-name { font-size: 1.5rem; font-weight: bold; margin: 0; }

.search-bar {
  display: flex;
  align-items: center;
  flex: 0 1 40%;
  background-color: white;
  border-radius: 20px;
  padding: 0 15px;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.search-bar:focus-within {
  border-color: #00BFFF; /* Cian al hacer focus */
}

.search-bar input {
  width: 100%;
  padding: 10px 5px 10px 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
}

.search-icon {
  color: #6A5ACD; /* Morado para el icono de búsqueda */
  margin-left: 5px;
}

.user-actions { display: flex; gap: 20px; align-items: center; }
.icon { cursor: pointer; transition: color 0.3s, transform 0.3s; }
.icon:hover, .icon.is-active { color: #00BFFF; }
.icon:hover { transform: scale(1.1); }
.icon.is-active { 
  filter: drop-shadow(0 0 5px rgba(0, 191, 255, 0.5));
}
.action-icon { size: 24px; }
.action-link { color: inherit; text-decoration: none; display: flex; align-items: center; }
.cart-link { position: relative; }
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4d4d;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  min-width: 14px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>