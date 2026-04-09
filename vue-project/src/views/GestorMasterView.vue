<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheSidebar from '@/components/TheSideBar.vue'
import TheFooter from '@/components/TheFooter.vue'

// Control de flujo de las 5 pantallas de Figma
const pantallaActual = ref('inicio')

const sidebarExpandido = ref(true)
const toggleSidebar = () => {
  sidebarExpandido.value = !sidebarExpandido.value
}
</script>

<template>
  <div class="page-layout">
    <TheHeader />

    <div class="main-wrapper">
      <TheSidebar :is-open="sidebarExpandido" @toggle-menu="toggleSidebar" />

      <main class="content-area">
        
        <div v-if="pantallaActual === 'inicio'">
          <div class="banner-contenedor">
            <img src="../../assets/banner_mock.webp" alt="Preventa Imperdible" class="banner-img">
          </div>
          
          <div class="grid-libros">
            <div v-for="n in 12" :key="n" class="libro-card" @click="pantallaActual = 'lista'">
              <div class="libro-img">Portada</div>
              <p class="libro-titulo">Libro Digital #{{ n }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="pantallaActual === 'lista'">
          <div class="gestion-container">
            <h2 class="title-figma">Lista de Pedidos por Validar Pago:</h2>
            <div class="pedidos-grid">
              <div class="pedido-item" @click="pantallaActual = 'detalle'">Pedido #1023 <span class="check">✓</span></div>
              <div class="pedido-item">Pedido #300 <span class="check">✓</span></div>
              <div class="pedido-item">Pedido #1024 <span class="check">✓</span></div>
              <div class="pedido-item">Pedido #589 <span class="check">✓</span></div>
            </div>

            <h2 class="title-figma">Cobros por entregar:</h2>
            <table class="tabla-entregas">
              <thead>
                <tr><th>Local - Parcela</th><th>Nº de Entrega</th></tr>
              </thead>
              <tbody>
                <tr><td>5 - 9</td><td>1</td></tr>
                <tr><td>3 - 8</td><td>2</td></tr>
              </tbody>
            </table>

            <h2 class="title-figma">Entregas Completadas:</h2>
            <div class="pedidos-grid">
              <div class="pedido-item">Pedido #1022 <span class="check">✓</span></div>
              <div class="pedido-item">Pedido #102 <span class="check">✓</span></div>
            </div>
          </div>
        </div>

        <div v-else-if="pantallaActual === 'confirmacion'">
          <div class="form-confirmar">
            <h2 class="title-figma">Confirmación de cobro</h2>
            <div class="input-group">
              <label>Ingrese el ID Factura:</label>
              <input type="text" class="figma-input" placeholder="Ej: 45892">
            </div>
            <div class="input-group">
              <label>Número de Entrega:</label>
              <input type="text" class="figma-input" placeholder="Ej: 1">
            </div>
            <button class="btn-figma-morado" @click="pantallaActual = 'inicio'">Confirmar Cobro</button>
          </div>
        </div>

        <div v-else-if="pantallaActual === 'detalle'">
          <div class="detalle-container">
            <h2 class="title-figma" style="text-align: center;">Pedido #0000</h2>
            <div class="items-lista">
              <div class="item-row"><span>Libro 1: Percy Jackson</span> <span>10$</span></div>
              <div class="item-row"><span>Libro 2: La Fuga del Caballo</span> <span>15$</span></div>
              <div class="item-row"><span>Libro 3: Hello World</span> <span>20$</span></div>
              <div class="item-row"><span>Libro 4: Harry Potter</span> <span>15$</span></div>
              <div class="item-row"><span>Libro 5: El Hobbit</span> <span>20$</span></div>
            </div>
            <div class="total-row">
              <strong>Total Precio:</strong> <strong>80$</strong>
            </div>
            <button class="btn-figma-morado" @click="pantallaActual = 'confirmacion'">Verificar Pago</button>
          </div>
        </div>

      </main>
    </div>

    <div class="nav-debug">
      <button @click="pantallaActual = 'inicio'">🏠 Inicio</button>
      <button @click="pantallaActual = 'lista'">📋 Lista</button>
      <button @click="pantallaActual = 'confirmacion'">💰 Cobro</button>
      <button @click="pantallaActual = 'detalle'">📄 Detalle</button>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
.page-layout { display: flex; flex-direction: column; height: 100vh; background: #fff; }
.main-wrapper { display: flex; flex: 1; overflow: hidden; }
.content-area { flex: 1; padding: 20px; overflow-y: auto; position: relative; }

/* TÍTULOS ESTILO FIGMA */
.title-figma { color: #333; font-family: 'Times New Roman', serif; font-style: italic; margin: 25px 0 15px; font-size: 1.6rem; }

/* BANNER DE PREVENTA */
.banner-contenedor { width: 100%; margin-bottom: 25px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.banner-img { width: 100%; height: auto; display: block; object-fit: cover; }

/* GRID DE LIBROS */
.grid-libros { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px; }
.libro-card { border: 1px solid #f0f0f0; padding: 15px; text-align: center; cursor: pointer; transition: transform 0.2s; background: #fafafa; border-radius: 8px; }
.libro-card:hover { transform: translateY(-5px); border-color: #8b7abf; }
.libro-img { background: #dcdcdc; height: 160px; display: flex; align-items: center; justify-content: center; border-radius: 4px; margin-bottom: 10px; color: #666; font-size: 0.8rem; }

/* LISTA DE GESTIÓN */
.pedidos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
.pedido-item { border: 1px solid #ddd; padding: 12px 15px; display: flex; justify-content: space-between; border-radius: 6px; cursor: pointer; background: #fff; }
.check { color: #8b7abf; font-weight: bold; font-size: 1.2rem; }

.tabla-entregas { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: #fff; }
.tabla-entregas th, .tabla-entregas td { border: 1px solid #eee; padding: 12px; text-align: center; }
.tabla-entregas th { background: #f8f8f8; color: #555; }

/* FORMULARIOS Y DETALLE */
.form-confirmar, .detalle-container { max-width: 450px; margin: 40px auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.input-group { text-align: left; margin-bottom: 25px; }
.figma-input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-top: 8px; outline-color: #8b7abf; }
.btn-figma-morado { background: #8b7abf; color: white; border: none; padding: 14px 50px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.3s; margin-top: 20px; width: 100%; }
.btn-figma-morado:hover { background: #7a69b0; }

.item-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f5f5f5; }
.total-row { display: flex; justify-content: space-between; padding: 25px 0; font-size: 1.3rem; border-top: 2px solid #8b7abf; margin-top: 15px; }

/* NAVEGACIÓN DEBUG (FLOTANTE) */
.nav-debug { position: fixed; bottom: 85px; right: 25px; display: flex; gap: 8px; z-index: 999; }
.nav-debug button { padding: 8px 12px; font-size: 0.75rem; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; opacity: 0.6; }
.nav-debug button:hover { opacity: 1; }
</style>
