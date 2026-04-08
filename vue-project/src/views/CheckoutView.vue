<template>
  <div class="checkout-page">
    <TheHeader />
    
    <div class="checkout-content">
      
      <!-- Stepper -->
      <div class="stepper-container">
        <div class="stepper">
          <!-- Paso 1 completado (morado tenue o gris) -->
          <div class="step completed">
            <span class="step-icon">🛒</span>
          </div>
          <div class="step-line"></div>
          <!-- Paso 2 ACTIVO (morado vibrante) -->
          <div class="step active">
            <span class="step-icon">ⓘ</span>
          </div>
        </div>
      </div>

      <!-- Línea divisora superior 100vw -->
      <div class="separator top-separator"></div>

      <!-- Contenedor Principal a dos columnas -->
      <div class="checkout-layout">
        
        <!-- Izquierda 60%: Formulario -->
        <div class="checkout-form-column">
          <h3 class="delivery-title">Tipo de entrega</h3>
          
          <div class="delivery-type-options">
            <label class="radio-label">
              <input type="radio" v-model="deliveryType" value="local" /> Entrega local
            </label>
            <label class="radio-label">
              <input type="radio" v-model="deliveryType" value="nacional" /> Envio nacional
            </label>
          </div>
          
          <div class="delivery-container">
            <!-- Cabecera del box de dirección -->
            <div class="delivery-header">
              <h4 class="delivery-box-title">Dirección de envío.</h4>
              <p class="delivery-box-subtitle">Recibe tu pedido en cualquier dirección del pais.</p>
            </div>
            
            <div class="delivery-body">
              <!-- Estado no seleccionado -->
              <div v-if="!deliveryType" class="unselected-state">
                <p>Seleccione un Tipo de entrega.</p>
              </div>
              
              <!-- Formulario visible al seleccionar un tipo de entrega -->
              <div v-else class="shipping-form">
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" class="form-input" placeholder="Tu nombre" />
                </div>
                <div class="form-group">
                  <label>Cédula (ID)</label>
                  <input type="text" class="form-input" placeholder="Tu cédula" />
                </div>
                <div class="form-group">
                  <label>Teléfono</label>
                  <input type="tel" class="form-input" placeholder="Tu teléfono" />
                </div>
                <div class="form-group">
                  <label>Ciudad</label>
                  <select class="form-select">
                    <option value="" disabled selected>Seleccione la ciudad</option>
                    <option value="San Cristobal">San Cristóbal</option>
                    <option value="Tariba">Táriba</option>
                    <option value="Palmira">Palmira</option>
                    <option value="Rubio">Rubio</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Dirección exacta</label>
                  <textarea class="form-textarea" placeholder="Tu dirección detallada"></textarea>
                </div>
              </div>
            </div>
            
            <!-- Botones tipo footer del box -->
            <div class="delivery-footer">
               <RouterLink to="/carrito" class="back-icon-link">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M9 14 4 9l5-5"/>
                   <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5"/>
                 </svg>
               </RouterLink>
               <!-- Enviar Aqui button -->
               <button class="btn send-btn" :disabled="!deliveryType">Enviar Aqui</button>
               <RouterLink to="/carrito" class="btn back-btn">Volver</RouterLink>
            </div>
          </div>
        </div>
        
        <!-- Derecha 40%: Orden tipo "Ticket" (Sticky) -->
        <div class="cart-summary-column">
          <div class="summary-box sticky-ticket">
            <h2 class="summary-card-title hina-mincho-font">Resumen de compra</h2>
            
            <div class="dashed-divider"></div>
            
            <div class="summary-items-list">
              <div v-for="item in cart" :key="'sum-'+item.id" class="summary-row">
                <span>{{ item.title }} (x{{ item.quantity }})</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="dashed-divider"></div>
            
            <div class="summary-total-row">
              <strong>Total a pagar:</strong>
              <strong>$ {{ total_carrito.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'

const router = useRouter()

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

// Datos de cart temporal para que la vista fluya. En un mundo ideal, usarás un Store o pasas props en la ruta
const cart = ref<CartItem[]>([
  { id: '1', title: 'Cien años de soledad', price: 25.0, quantity: 1 },
  { id: '2', title: 'Rayuela', price: 18.5, quantity: 1 },
  { id: '3', title: 'El Aleph', price: 15.0, quantity: 2 },
  { id: '4', title: 'Ficciones', price: 12.0, quantity: 1 },
  { id: '5', title: 'Don Quijote', price: 30.0, quantity: 1 }
])

const total_carrito = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// Tipos de entrega
const deliveryType = ref('')

</script>

<style scoped>
.checkout-page {
  font-family: inherit;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.checkout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Tipografía global pedida para titulos: Hina Mincho */
.hina-mincho-font {
  font-family: 'Hina Mincho', serif;
}

/* Stepper */
.stepper-container { display: flex; justify-content: center; margin-bottom: 30px; }
.stepper { display: flex; align-items: center; }
.step { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.step.active { background-color: #776CBE; color: white; }
.step.completed { background-color: #776CBE; color: white; opacity: 0.8; }
.step.inactive { background-color: #888888; color: white; }
.step-line { width: 50px; height: 1px; background-color: #cccccc; }

/* Separador 100vw (Mismo de cartview) */
.separator {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 1px;
  background-color: #d8d8d8;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Layout Main a dos columnas (60 / 40) */
.checkout-layout {
  display: flex;
  gap: 50px;
  margin-top: 30px;
  margin-bottom: 60px;
  align-items: flex-start; /* Impide que la columna sticky se estire hasta abajo forzosamente */
}

/* --- COLUMNA 1: FORMULARIO (60%) --- */
.checkout-form-column {
  flex: 6;
  display: flex;
  flex-direction: column;
}

.delivery-title {
  font-family: 'Hina Mincho', serif;
  font-size: 1.3rem;
  font-weight: normal;
  margin-bottom: 15px;
}
.delivery-type-options {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'Hina Mincho', serif;
}

/* La caja outline general del form */
.delivery-container {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 30px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.delivery-header {
  margin-bottom: 30px;
}
.delivery-box-title {
  font-family: 'Hina Mincho', serif;
  font-size: 1.3rem;
  margin: 0;
  font-weight: 500;
}
.delivery-box-subtitle {
  font-family: 'Hina Mincho', serif;
  font-size: 0.95rem;
  color: #555;
  margin-top: 8px;
}

.delivery-body {
  flex: 1; 
  display: flex;
  flex-direction: column;
}
.unselected-state {
  display: flex;
  align-items: center;
  margin-top: 60px;
  font-family: 'Hina Mincho', serif;
  font-size: 1.2rem;
  color: #333;
}

.shipping-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 20px;
  font-family: inherit;
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}
.form-input, .form-select, .form-textarea {
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: #776CBE;
}
.form-textarea {
  resize: vertical;
  min-height: 90px;
}

/* Footer "Enviar/Volver" dentro del box */
.delivery-footer {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: auto; /* Empuja el footer siempre abajo */
  padding-top: 30px;
}
.back-icon-link {
  color: #000;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-icon-link:hover { opacity: 0.7; }

.btn {
  padding: 8px 24px;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Hina Mincho', serif;
}
.send-btn {
  background-color: #d1d1d1;
  color: #333;
  border: none;
  font-weight: normal;
}
.send-btn:not(:disabled) {
  background-color: #776CBE;
  color: white;
}
.send-btn:disabled {
  cursor: not-allowed;
}

.back-btn {
  background-color: transparent;
  color: #776CBE;
  border: 1px solid #ccc;
  text-decoration: none;
  font-weight: normal;
  display: flex;
  align-items: center;
}
.back-btn:hover {
  border-color: #776CBE;
}


/* --- COLUMNA 2: RESUMEN TICKET (40%) --- */
.cart-summary-column {
  flex: 4;
}

/* El ticket que baja dinámicamente: */
.sticky-ticket {
  position: sticky;
  top: 40px; /* Al despegarse de top */
  
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e6e6e6; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04); 
}
.summary-card-title {
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 0;
  color: #000;
}
.dashed-divider {
  height: 1px;
  border-bottom: 1px dashed #cccccc;
  margin: 15px 0;
}

.summary-items-list {
  max-height: 350px; /* Scroll alto */
  overflow-y: auto;
  padding-right: 5px;
  margin: 10px 0;
}
.summary-items-list::-webkit-scrollbar { width: 5px; }
.summary-items-list::-webkit-scrollbar-thumb { background: #bbb; border-radius: 4px; }

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.05rem;
}
.summary-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  margin-top: 20px;
}
</style>
