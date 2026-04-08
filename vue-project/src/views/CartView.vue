<template>
  <div class="cart-page">
    <TheHeader />
    
    <div class="cart-content">
      
      <!-- Stepper Dinámico -->
      <div class="stepper-container">
        <div class="stepper">
          <!-- Paso 1 (🛒) -->
          <div class="step" :class="{ 'active': currentStep === 1, 'completed': currentStep === 2 }">
            <span class="step-icon">🛒</span>
          </div>
          <div class="step-line"></div>
          <!-- Paso 2 (ⓘ) -->
          <div class="step" :class="{ 'active': currentStep === 2, 'inactive': currentStep === 1 }">
            <span class="step-icon">ⓘ</span>
          </div>
        </div>
      </div>

      <!-- Línea divisora superior -->
      <div class="separator top-separator"></div>

      <!-- ============================================== -->
      <!-- ESTADO: CARRITO VACÍO                          -->
      <!-- ============================================== -->
      <div v-if="cart.length === 0" class="empty-cart-view">
        <div class="empty-left-column">
          <div class="left-text-wrapper">
            <p class="main-text">
              No tienes productos en tu carro de<br/>
              compras, ¿Todavía no encuentras lo<br/>
              que buscas?
            </p>
            <p class="sub-text">Búscalo aquí:</p>
            <RouterLink to="/" class="home-link">Ir a la página de inicio</RouterLink>
          </div>
        </div>
        
        <div class="cart-summary-column">
          <div class="summary-box">
            <h2 class="summary-card-title hina-mincho-font">Resumen de compra</h2>
            <div class="dashed-divider"></div>
            <div class="empty-resumen-placeholder">
              <span>(Ver resumen)</span>
            </div>
            <div class="dashed-divider"></div>
            <div class="summary-total-row">
              <strong>Total a pagar:</strong>
              <strong>$ 0.00</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- FLUJO CON PRODUCTOS (PASO 1 y PASO 2)          -->
      <!-- ============================================== -->
      <div v-else class="cart-flow-container">
        
        <!-- Layout a dos columnas compartido -->
        <div class="main-split-layout">
          
          <!-- COLUMNA IZQUIERDA DINÁMICA -->
          <div class="left-dynamic-column">
            
            <!-- PASO 1: Lista de Items -->
            <div v-if="currentStep === 1" class="cart-items-column">
              <h2 class="column-title">Tus productos</h2>
              <div v-for="item in cart" :key="item.id" class="item-card">
                <div class="item-info">
                  <p><strong>Título:</strong> {{ item.title }}</p>
                  <p><strong>Precio:</strong> ${{ item.price.toFixed(2) }}</p>
                  
                  <div class="quantity-actions">
                    <span>Cantidad: </span>
                    <button @click="updateQuantity(item.id, -1)" class="qty-btn">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="updateQuantity(item.id, 1)" class="qty-btn">+</button>
                    <button @click="removeItem(item.id)" class="delete-btn">🗑️ Eliminar</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- PASO 2: Formulario de Envío -->
            <div v-else-if="currentStep === 2" class="checkout-form-column">
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
                <div class="delivery-header">
                  <h4 class="delivery-box-title">Dirección de envío.</h4>
                  <p class="delivery-box-subtitle">Recibe tu pedido en cualquier dirección del pais.</p>
                </div>
                
                <div class="delivery-body">
                  <div v-if="!deliveryType" class="unselected-state">
                    <p>Seleccione un Tipo de entrega.</p>
                  </div>
                  
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
                
                <div class="delivery-footer">
                  <button @click="currentStep = 1" class="back-icon-link" style="background:transparent;border:none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 14 4 9l5-5"/>
                      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5"/>
                    </svg>
                  </button>
                  <button class="btn send-btn" :disabled="!deliveryType">Enviar Aqui</button>
                  <button class="btn back-btn" @click="currentStep = 1">Volver</button>
                </div>
              </div>
            </div>

          </div>

          <!-- COLUMNA DERECHA COMPARTIDA: Ticket de Resumen -->
          <div class="cart-summary-column">
            <div class="summary-box" :class="{ 'sticky-ticket': currentStep === 2 }">
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

        <!-- FOOTER DEL PASO 1 (Solo visible en el carrito) -->
        <div v-if="currentStep === 1" class="bottom-section">
          <div class="separator"></div>
          <div class="summary-footer">
            <div class="total-text">
              <span class="subtotal-label">SubTotal</span>
              <span class="total-numbers">$ {{ total_carrito.toFixed(0) }}</span>
            </div>
            <div class="actions-wrapper">
              <RouterLink to="/" class="back-arrow" title="Regresar al catálogo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 14 4 9l5-5"/>
                  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5"/>
                </svg>
              </RouterLink>
              <button class="continue-btn" :disabled="cart.length === 0" @click="currentStep = 2">Continuar</button>
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

// Variables Globales del Flow
const currentStep = ref(1) // 1 = Carrito, 2 = Formulario de Envío
const deliveryType = ref('')

// Datos simulados (para visualizar. Cuando esté en prod se llena dinámicamente)
const props = defineProps<{
  initialCart?: CartItem[]
}>()

const cart = ref<CartItem[]>([
  { id: '1', title: 'Cien años de soledad', price: 25.0, quantity: 1 },
  { id: '2', title: 'Rayuela', price: 18.5, quantity: 1 }
])

const total_carrito = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const updateQuantity = (id: string, delta: number) => {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    const newQty = item.quantity + delta
    if (newQty > 0) item.quantity = newQty
  }
}

const removeItem = (id: string) => {
  cart.value = cart.value.filter(i => i.id !== id)
}
</script>

<style scoped>
/* Contenedor macro */
.cart-page { font-family: inherit; min-height: 100vh; background-color: #ffffff; display: flex; flex-direction: column; }
.cart-content { flex: 1; display: flex; flex-direction: column; padding-top: 30px; width: 90%; max-width: 1400px; margin: 0 auto; }

/* Tipografía */
.hina-mincho-font { font-family: 'Hina Mincho', serif; }

/* Stepper dinámico */
.stepper-container { display: flex; justify-content: center; margin-bottom: 30px; }
.stepper { display: flex; align-items: center; }
.step { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: background 0.3s; }
.step.active { background-color: #776CBE; color: white; }
.step.completed { background-color: #776CBE; color: white; opacity: 0.8; }
.step.inactive { background-color: #888888; color: white; }
.step-line { width: 50px; height: 1px; background-color: #cccccc; }

/* Separador borde a borde */
.separator {
  width: 100vw; position: relative; left: 50%; right: 50%;
  margin-left: -50vw; margin-right: -50vw;
  height: 1px; background-color: #d8d8d8; margin-top: 20px; margin-bottom: 20px;
}

/* LAYOUT PRINCIPAL EMPAQUETADO (Vacío / Flow) */
.empty-cart-view { display: flex; justify-content: space-between; gap: 40px; width: 100%; flex: 1; min-height: 350px; margin-top: 30px; }
.empty-left-column { flex: 3; display: flex; align-items: center; justify-content: center; }
.left-text-wrapper { text-align: left; max-width: 400px; font-size: 1.1rem; }
.main-text { margin-bottom: 25px; line-height: 1.4; color: #000; }
.sub-text { margin-bottom: 25px; color: #000; }
.home-link { color: #888888; text-decoration: underline; display: block; text-align: center; }
.empty-resumen-placeholder { display: flex; justify-content: center; align-items: center; height: 100px; color: #888; font-size: 1.1rem; font-style: italic; }

.cart-flow-container { display: flex; flex-direction: column; width: 100%; flex: 1; }
.main-split-layout { display: flex; gap: 50px; margin-top: 20px; margin-bottom: 20px; align-items: flex-start; }
.left-dynamic-column { flex: 6; display: flex; flex-direction: column; }

/* PASO 1 COMPONENTES */
.cart-items-column { display: flex; flex-direction: column; gap: 15px; width: 100%; }
.column-title { font-size: 1.2rem; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
.item-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; background-color: #fafafa; }
.quantity-actions { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
.qty-btn { background: #776CBE; color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer; }
.delete-btn { margin-left: auto; background: transparent; color: crimson; border: 1px solid crimson; padding: 4px 8px; border-radius: 4px; cursor: pointer; }

/* PASO 2 COMPONENTES (Formulario) */
.checkout-form-column { width: 100%; display: flex; flex-direction: column; animation: fadeIn 0.3s ease; }
.delivery-title { font-family: 'Hina Mincho', serif; font-size: 1.3rem; font-weight: normal; margin-bottom: 15px; }
.delivery-type-options { display: flex; gap: 30px; margin-bottom: 25px; }
.radio-label { display: flex; align-items: center; gap: 8px; font-size: 1.1rem; cursor: pointer; font-family: 'Hina Mincho', serif; }

.delivery-container { border: 1px solid #ccc; border-radius: 12px; padding: 30px; min-height: 400px; display: flex; flex-direction: column; }
.delivery-header { margin-bottom: 30px; }
.delivery-box-title { font-family: 'Hina Mincho', serif; font-size: 1.3rem; margin: 0; font-weight: 500; }
.delivery-box-subtitle { font-family: 'Hina Mincho', serif; font-size: 0.95rem; color: #555; margin-top: 8px; }

.delivery-body { flex: 1; display: flex; flex-direction: column; }
.unselected-state { display: flex; align-items: center; margin-top: 60px; font-family: 'Hina Mincho', serif; font-size: 1.2rem; color: #333; }
.shipping-form { display: flex; flex-direction: column; gap: 18px; margin-bottom: 20px; font-family: inherit; animation: fadeIn 0.4s ease-in-out; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 0.95rem; font-weight: 500; color: #333; }
.form-input, .form-select, .form-textarea { padding: 12px 14px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; outline: none; transition: border-color 0.2s ease; font-family: inherit; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #776CBE; }
.form-textarea { resize: vertical; min-height: 90px; }

.delivery-footer { display: flex; align-items: center; gap: 15px; margin-top: auto; padding-top: 30px; }
.back-icon-link { color: #000; cursor: pointer; display: flex; align-items: center; }
.back-icon-link:hover { opacity: 0.7; }
.btn { padding: 8px 24px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-family: 'Hina Mincho', serif; }
.send-btn { background-color: #d1d1d1; color: #333; border: none; font-weight: normal; transition: 0.3s; }
.send-btn:not(:disabled) { background-color: #776CBE; color: white; }
.send-btn:disabled { cursor: not-allowed; }
.back-btn { background-color: transparent; color: #776CBE; border: 1px solid #ccc; font-weight: normal; }
.back-btn:hover { border-color: #776CBE; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* COLUMNA DERECHA (TICKET) */
.cart-summary-column { flex: 4; height: fit-content; }
.summary-box { background-color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #e6e6e6; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); transition: all 0.3s ease; }
.sticky-ticket { position: sticky; top: 40px; } /* Solo se activa en el paso 2 */
.summary-card-title { font-size: 1.3rem; font-weight: 500; text-align: center; margin-bottom: 20px; margin-top: 0; color: #000; }
.dashed-divider { height: 1px; border-bottom: 1px dashed #cccccc; margin: 15px 0; }
.summary-items-list { max-height: 250px; overflow-y: auto; padding-right: 5px; margin: 10px 0; }
.summary-items-list::-webkit-scrollbar { width: 5px; }
.summary-items-list::-webkit-scrollbar-thumb { background: #bbb; border-radius: 4px; }
.summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: #333; font-size: 1.05rem; }
.summary-total-row { display: flex; justify-content: space-between; font-size: 1.25rem; margin-top: 20px; }

/* FOOTER INFERIOR (Paso 1) */
.bottom-section { width: 100%; padding-bottom: 30px; margin-top: auto; }
.summary-footer { display: flex; justify-content: space-between; align-items: flex-start; padding: 0 10px; }
.total-text { display: flex; flex-direction: column; line-height: 1.2; }
.subtotal-label { font-size: 0.9rem; }
.total-numbers { font-size: 1.2rem; margin: 4px 0; }
.actions-wrapper { display: flex; align-items: center; gap: 15px; }
.back-arrow { color: #000; display: flex; align-items: center; cursor: pointer; }
.back-arrow:hover { opacity: 0.7; }
.continue-btn { background-color: #776CBE; color: white; border: none; border-radius: 6px; padding: 10px 24px; font-size: 1.1rem; cursor: pointer; font-family: inherit; }
.continue-btn:disabled { opacity: 0.6; cursor: default; }

</style>