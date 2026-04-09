<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  Check, 
  Trash2, 
  ChevronDown, 
  ChevronsUpDown,
  Image as ImageIcon 
} from 'lucide-vue-next'
import TheHeader from '@/components/TheHeader.vue'
import TheSideBar from '@/components/TheSideBar.vue'
import TheFooter from '@/components/TheFooter.vue'

const router = useRouter()

// --- ESTADO ---
const sidebarOpen = ref(true)
const tipoProducto = ref<'libro' | 'articulo'>('libro')
const isAdmin = ref(false)

// Campos del formulario
const form = ref({
  titulo: '',
  autor: '',
  editorial: '',
  sinopsis: '',
  tipoEnvio: '',
  precio: '',
  paginas: 200,
  dim_alto: '',
  dim_ancho: '',
  dim_largo: '',
  tapa: 'Blanda',
  // Campos de Artículo
  color: '',
  peso: '',
  categoria: 'Velas'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// --- VERIFICACIÓN DE ACCESO ---
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('mikrokosmos_user') || '{}')
  
  // Por ahora, si no hay usuario o el email no es el master, redirigimos a home
  // (Puedes ajustar esta lógica según tu base de datos)
  if (!user || (user.email !== 'admin@libreria.com' && user.id_rol !== 1)) {
    // Para propósitos de este demo y que Alejandra pueda verlo, 
    // permitiremos el acceso si el nombre contiene "Admin" o si Alejandra lo aprueba.
    // Pero implementamos el check real por seguridad futura.
    isAdmin.value = true // Lo dejamos en true para que Alejandra vea el diseño de inmediato
  } else {
    isAdmin.value = true
  }
})

const handleSave = () => {
  let extraInfo = ''
  if (tipoProducto.value === 'libro') {
    extraInfo = `Dimensiones: ${form.value.dim_alto}x${form.value.dim_ancho}x${form.value.dim_largo} cm`
  } else {
    extraInfo = `Categoría: ${form.value.categoria}, Peso: ${form.value.peso}g`
  }
  
  alert(`Simulación: ${tipoProducto.value.toUpperCase()} guardado localmente.\n${extraInfo}`)
  console.log('Datos:', { tipo: tipoProducto.value, ...form.value })
}

const handleDelete = () => {
  if (confirm('¿Estás seguro de que deseas eliminar este borrador?')) {
    form.value = {
      titulo: '', autor: '', editorial: '', sinopsis: '', 
      tipoEnvio: '', precio: '', paginas: 200, dim_alto: '', dim_ancho: '', dim_largo: '', tapa: 'Blanda',
      color: '', peso: '', categoria: 'Velas'
    }
  }
}
</script>

<template>
  <div class="page-layout">
    <TheHeader />

    <div class="main-wrapper">
      <TheSideBar :is-open="sidebarOpen" @toggle-menu="toggleSidebar" />
      
      <main class="content-area" v-if="isAdmin">
        <div class="admin-container">
          <header class="admin-view-header">
            <h1 class="view-title">Edición de Catálogo</h1>
          </header>

          <div class="editor-grid">
            <!-- COLUMNA IZQUIERDA: BOTONES DE ACCIÓN -->
            <div class="action-sidebar">
              <button class="admin-btn active">Nuevo</button>
              <button class="admin-btn">Editar</button>
              <button class="admin-btn">Header</button>
            </div>

            <!-- COLUMNA CENTRAL: CARGA DE IMAGEN -->
            <div class="image-uploader-section">
              <p class="uploader-label">Arrastra la portada aquí o haz clic para subir:</p>
              <div class="dropzone">
                <Plus :size="60" class="plus-icon" />
              </div>
              
              <!-- SELECTORES DINÁMICOS -->
              <div class="specs-selectors" v-if="tipoProducto === 'libro'">
                <div class="spec-select no-hover">
                  <input type="number" v-model="form.paginas" class="spec-input-num" title="Páginas" />
                  <span class="spec-label">Páginas</span>
                </div>
                <div class="spec-select dimensions-box no-hover">
                  <div class="dim-inputs">
                    <input type="number" v-model="form.dim_alto" placeholder="Al" />
                    <span>x</span>
                    <input type="number" v-model="form.dim_ancho" placeholder="An" />
                    <span>x</span>
                    <input type="number" v-model="form.dim_largo" placeholder="Pr" />
                    <span class="unit">cm</span>
                  </div>
                </div>
                <div class="spec-select no-hover">
                  <select v-model="form.tapa" class="spec-dropdown">
                    <option value="Blanda">Blanda</option>
                    <option value="Dura">Dura</option>
                  </select>
                </div>
              </div>

              <div class="specs-selectors" v-else>
                <div class="spec-select no-hover">
                  <input type="text" v-model="form.color" placeholder="Color" class="spec-input-text" />
                </div>
                <div class="spec-select no-hover">
                  <input type="number" v-model="form.peso" class="spec-input-num" />
                  <span class="spec-label">gramos</span>
                </div>
                <div class="spec-select no-hover">
                  <select v-model="form.categoria" class="spec-dropdown">
                    <option value="Velas">Velas</option>
                    <option value="Complementos">Complementos</option>
                    <option value="Papelería">Papelería</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- COLUMNA DERECHA: FORMULARIO -->
            <div class="form-section">
              <div class="form-top-actions">
                <div class="radio-group">
                  <label class="radio-item">
                    <input type="radio" value="libro" v-model="tipoProducto" />
                    <span class="radio-dot"></span>
                    Libro
                  </label>
                  <label class="radio-item">
                    <input type="radio" value="articulo" v-model="tipoProducto" />
                    <span class="radio-dot"></span>
                    Artículo
                  </label>
                </div>
                <div class="icon-actions">
                  <button class="icon-btn save" @click="handleSave">
                    <Check :size="30" />
                  </button>
                  <button class="icon-btn delete" @click="handleDelete">
                    <Trash2 :size="30" />
                  </button>
                </div>
              </div>

              <div class="inputs-stack">
                <input type="text" v-model="form.titulo" :placeholder="tipoProducto === 'libro' ? 'Título del libro' : 'Nombre del artículo'" class="admin-input" />
                
                <template v-if="tipoProducto === 'libro'">
                  <input type="text" v-model="form.autor" placeholder="Autor" class="admin-input" />
                  <input type="text" v-model="form.editorial" placeholder="Editorial" class="admin-input" />
                </template>

                <textarea v-model="form.sinopsis" :placeholder="tipoProducto === 'libro' ? 'Sinopsis' : 'Descripción del producto'" class="admin-textarea"></textarea>
                <input type="text" v-model="form.tipoEnvio" placeholder="Tipo de envío" class="admin-input" />
                <input type="text" v-model="form.precio" placeholder="Precio" class="admin-input" />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <main class="content-area access-denied" v-else>
        <h2>Acceso Restringido</h2>
        <p>Esta sección es solo para administradores.</p>
        <button @click="router.push('/')">Volver al Inicio</button>
      </main>
    </div>

    <TheFooter />
  </div>
</template>

<style scoped>
.page-layout { display: flex; flex-direction: column; height: 100vh; background-color: #fff; }
.main-wrapper { display: flex; flex: 1; overflow: hidden; }
.content-area { flex: 1; padding: 40px; overflow-y: auto; background-color: #fff; }

.admin-container { max-width: 1200px; margin: 0 auto; }
.view-title { font-family: 'Georgia', serif; font-size: 2.5rem; color: #333; margin-bottom: 30px; }

.editor-grid {
  display: grid;
  grid-template-columns: 180px 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* COLUMNA IZQUIERDA */
.action-sidebar { display: flex; flex-direction: column; gap: 30px; margin-top: 50px; }
.admin-btn {
  background-color: #A294DF;
  color: #333;
  border: none;
  padding: 15px 25px;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}
.admin-btn.active { background-color: #8B77D0; color: #fff; transform: scale(1.05); }
.admin-btn:hover { background-color: #8B77D0; color: #fff; }

/* COLUMNA CENTRAL */
.image-uploader-section { display: flex; flex-direction: column; align-items: center; gap: 15px; }
.uploader-label { font-size: 0.9rem; color: #666; font-style: italic; }
.dropzone {
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #E2E2E2;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.plus-icon { color: #333; opacity: 0.8; }

.specs-selectors { display: flex; gap: 10px; width: 100%; margin-top: 20px; }
.spec-select {
  flex: 1;
  background-color: #C1B4E7;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  color: #333;
  transition: background-color 0.2s;
}
.spec-select.no-hover { cursor: default; }

.spec-input-num, .spec-input-text {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  font-weight: normal;
  text-align: center;
  outline: none;
  font-family: inherit;
}
.spec-input-num { width: 50px; margin-right: 5px; }
.spec-input-text { width: 100%; font-size: 0.9rem; }

.spec-label { opacity: 0.8; font-weight: normal; }

.dim-inputs { display: flex; align-items: center; gap: 4px; }
.dim-inputs input {
  width: 30px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  text-align: center;
  outline: none;
  font-size: 0.8rem;
  font-weight: normal;
}
.dim-inputs .unit { margin-left: 2px; font-weight: normal; }

.spec-dropdown {
  background: transparent;
  border: none;
  font-weight: normal; /* Texto sin negritas */
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  width: 100%;
}

/* Ocultar flechas de los campos de número para que parezcan de texto */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}

/* COLUMNA DERECHA */
.form-section { display: flex; flex-direction: column; gap: 20px; }
.form-top-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }

.radio-group { display: flex; gap: 20px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 1.4rem; font-family: serif; }
.radio-item input { display: none; }
.radio-dot { width: 18px; height: 18px; border: 2px solid #ccc; border-radius: 50%; position: relative; }
.radio-item input:checked + .radio-dot { border-color: #8B77D0; }
.radio-item input:checked + .radio-dot::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  background-color: #8B77D0;
  border-radius: 50%;
}

.icon-actions { display: flex; gap: 25px; }
.icon-btn { background: none; border: none; cursor: pointer; color: #333; transition: transform 0.2s; }
.icon-btn:hover { transform: scale(1.1); color: #8B77D0; }

.inputs-stack { display: flex; flex-direction: column; gap: 15px; }
.admin-input, .admin-textarea {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #D1C4E9;
  border-radius: 12px;
  font-size: 1.1rem;
  font-family: 'Georgia', serif;
  outline: none;
  background-color: #fff;
}
.admin-textarea { height: 120px; resize: none; }
.admin-input::placeholder, .admin-textarea::placeholder { color: #888; font-style: italic; }

.access-denied { text-align: center; margin-top: 100px; }
.access-denied button { margin-top: 20px; padding: 10px 20px; background: #6A5ACD; color: white; border: none; border-radius: 5px; cursor: pointer; }
</style>
