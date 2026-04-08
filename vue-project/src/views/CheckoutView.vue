<template>
  <div class="checkout-page">
    <TheHeader />
    
    <div class="checkout-content"><div class="stepper-container">
        <div class="stepper">
          <div class="step completed"><span class="step-icon">🛒</span></div>
          <div class="step-line"></div>
          <div class="step active"><span class="step-icon">ⓘ</span></div>
        </div>
      </div><div class="separator top-separator"></div>

      <div class="checkout-layout"><div class="checkout-form-column">
          <h3 class="delivery-title hina-mincho-font">Tipo de entrega</h3>
          
          <div class="delivery-type-options">
            <label class="radio-label">
              <input type="radio" v-model="deliveryType" value="local" /> Entrega local
            </label>
            <label class="radio-label">
              <input type="radio" v-model="deliveryType" value="nacional" /> Envio nacional
            </label>
          </div>
          
          <div class="delivery-container"><div class="delivery-header">
              <h4 class="delivery-box-title hina-mincho-font">Dirección de envío.</h4>
              <p class="delivery-box-subtitle hina-mincho-font">Recibe tu pedido en cualquier dirección del país.</p>
            </div>
            
            <div class="delivery-body"><div v-if="!deliveryType" class="unselected-state">
                <p class="hina-mincho-font">Seleccione un Tipo de entrega.</p>
              </div>
              
              <div v-else class="shipping-form"><div v-if="deliveryType === 'local'" class="local-layout">
                  <div class="sub-radio-group">
                    <label class="sub-radio-label hina-mincho-font">
                      <input type="radio" v-model="localOption" value="sede" /> Recoger en la sede principal.
                    </label>
                    <label class="sub-radio-label hina-mincho-font">
                      <input type="radio" v-model="localOption" value="delivery" /> Delivery en la ciudad.
                    </label>
                  </div>

                  <div class="form-group-custom">
                    <label class="hina-mincho-font">Dirección</label>
                    <input type="text" class="form-input-flat" placeholder="Dirección" v-model="formData.direccion" />
                  </div>

                  <div class="type-display">
                    <p class="hina-mincho-font">Tipo Envio: Local.</p>
                  </div>
                </div>

                <div v-else class="national-layout">
                  </div>
              </div>
            </div><div class="delivery-footer">
               <RouterLink to="/carrito" class="back-arrow">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5"/>
                 </svg>
               </RouterLink>

               <button 
                 class="btn-primary" 
                 :disabled="!deliveryType || isProcessing"
                 @click="processDelivery"
               >
                 {{ isProcessing ? 'Procesando...' : 'Enviar Aquí' }}
               </button>

               <RouterLink to="/carrito" class="btn-outline">Volver</RouterLink>
            </div>
          </div>
        </div>
        
        <div class="cart-summary-column"><div class="summary-box sticky-ticket">
            <h2 class="summary-card-title hina-mincho-font">Resumen de compra</h2>
            <div class="dashed-divider"></div><div class="summary-items-list">
              <div v-for="item in cart" :key="item.id" class="summary-row">
                <span>{{ item.title }} (x{{ item.quantity }})</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <div class="dashed-divider"></div><div class="summary-total-row">
              <strong class="hina-mincho-font">Total a pagar:</strong>
              <strong class="hina-mincho-font">$ {{ total_carrito.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';import TheHeader from '@/components/TheHeader.vue'

const deliveryType = ref('')
const localOption = ref('sede')
const isProcessing = ref(false)
const formData = ref({ direccion: '' })

// Datos mock para el ticket
const cart = ref([
  { id: '1', title: 'Cien años de soledad', price: 25.0, quantity: 1 },
  { id: '2', title: 'Rayuela', price: 18.5, quantity: 1 }
])

const total_carrito = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// Simulación de latencia requerida
const processDelivery = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    alert("Envío registrado con éxito.")
  }, 1500)
}
</script>

<style scoped>
/* Fuentes */
.hina-mincho-font { font-family: 'Hina Mincho', serif; }

/* Layout */
.checkout-content { width: 90%; max-width: 1400px; margin: 0 auto; padding-top: 30px; }
.checkout-layout { display: flex; gap: 40px; margin-top: 20px; align-items: flex-start; }
.checkout-form-column { flex: 6; }
.cart-summary-column { flex: 4; }

/* Estilos de los Radios Principales */
.delivery-type-options { display: flex; gap: 25px; margin-bottom: 20px; }
.radio-label { display: flex; align-items: center; gap: 10px; font-size: 1.2rem; cursor: pointer; }

/* Caja de Entrega Local (Ajustada a la captura) */
.delivery-container { 
  border: 1px solid #b5b5b5; 
  border-radius: 20px; 
  padding: 40px; 
  min-height: 480px; 
  display: flex; 
  flex-direction: column;
}

.sub-radio-group { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
.sub-radio-label { display: flex; align-items: center; gap: 15px; font-size: 1.3rem; cursor: pointer; }

.form-group-custom { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
.form-input-flat { 
  padding: 12px; 
  border: 1px solid #eee; 
  border-radius: 8px; 
  background-color: #fcfcfc;
  font-size: 1.1rem;
}

.type-display { margin-top: 20px; }
.type-display p { font-size: 2.2rem; color: #000; margin: 0; }

/* Botones y Footer */
.delivery-footer { display: flex; align-items: center; gap: 15px; margin-top: auto; }
.back-arrow { color: #000; transition: transform 0.2s; }
.back-arrow:hover { transform: scale(1.1); }

.btn-primary { 
  background-color: #776CBE; 
  color: white; 
  border: none; 
  padding: 12px 35px; 
  border-radius: 8px; 
  font-size: 1.4rem;
  font-family: 'Hina Mincho', serif;cursor: pointer;
}
.btn-primary:disabled { background-color: #cccccc; cursor: not-allowed; }

.btn-outline { 
  border: 1px solid #b5b5b5; 
  color: #776CBE; 
  padding: 12px 30px; 
  border-radius: 8px; 
  text-decoration: none; 
  font-size: 1.4rem;
  font-family: 'Hina Mincho', serif;
}

/* Ticket Sticky */
.sticky-ticket { 
  position: sticky; 
  top: 40px; 
  background: #fff; 
  padding: 30px; 
  border-radius: 12px; 
  border: 1px solid #e6e6e6; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.04); 
}
.dashed-divider { border-bottom: 1px dashed #ccc; margin: 15px 0; }</style>