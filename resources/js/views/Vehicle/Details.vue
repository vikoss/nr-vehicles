<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back />
    <input-base
      id="inventory_number"
      v-model="app.vehicle.inventory_number"
      label="Número de inventario:"
      :disabled="true"
    />
    <input-base
      id="name"
      v-model="app.vehicle.name"
      label="Nombre:"
      :disabled="true"
    />
    <input-base
      id="brand"
      v-model="app.vehicle.brand"
      label="Marca:"
      :disabled="true"
    />
    <input-base
      id="model"
      v-model="app.vehicle.model"
      label="Modelo:"
      :disabled="true"
    />
    <input-base
      id="economic_number"
      v-model="app.vehicle.economic_number"
      label="Número economico:"
      :disabled="true"
    />
    <input-base
      id="serial_number"
      v-model="app.vehicle.serial_number"
      label="Número de serie:"
      :disabled="true"
    />
    <input-base
      id="responsible_area"
      v-model="app.vehicle.responsible_area"
      label="Área responsable:"
      :disabled="true"
    />
    <div>
      <img src="https://adrianalonso.es/wp-content/uploads/2018/01/vue.jpg" alt="imagen">
    </div>
    <p class="mt-8 mb-4">Selecciona una imagen para verificar la información.</p>
    <div class="flex">
      <div class="mr-12">
        <div class="bg-gray-200 h-32 w-28 flex justify-center items-center cursor-pointer">
          <img src="https://adrianalonso.es/wp-content/uploads/2018/01/vue.jpg" alt="imagen">
        </div>
        <p class="text-wine text-base font-normal mt-4">Factura</p>
      </div>
      <div class="mr-12">
        <div class="bg-gray-200 h-32 w-28 flex justify-center items-center cursor-pointer">
          <img src="https://adrianalonso.es/wp-content/uploads/2018/01/vue.jpg" alt="imagen">
        </div>
        <p class="text-wine text-base font-normal mt-4">Factura</p>
      </div>
      <div class="mr-12">
        <div class="bg-gray-200 h-32 w-28 flex justify-center items-center cursor-pointer">
          <img src="https://adrianalonso.es/wp-content/uploads/2018/01/vue.jpg" alt="imagen">
        </div>
        <p class="text-wine text-base font-normal mt-4">Factura</p>
      </div>
      <div class="mt-12">
        <arrow-right class="cursor-pointer h-9" />
      </div>
    </div>
    <button-base
      class="sm:max-w-sm mx-auto"
      label="Agregar documentación"
      :loading="false"
      @click="app.goToUploadVehicleDocuments"
      :disabled="false"
    />
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchVehicles, getVehicle } from '../../api/vehicles'
import HeaderBase from '../../components/HeaderBase.vue'
import SearchBar from '../../components/SearchBar.vue'
import TableBase from '../../components/TableBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import ArrowRight from '../../svg/ArrowRight.vue'

export default {
  components: { HeaderBase, SearchBar, TableBase, RedirectToBack, InputBase, ArrowRight, ButtonBase },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const app = reactive({
      value: '',
      vehicles: [],
      isEmpty: computed(() => {
        if (app.vehicles.data) {
          return !!app.vehicles.data.length
        }
        return false
      }),
      getVehicles: async () => {
        app.vehicles = await searchVehicles(app.value)
      },
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      goToUploadVehicleDocuments: () => router.push({ name: 'VehicleDocuments', params: { vehicle: route.params.vehicle }}),
      vehicle: {},
    })

    app.fetchVehicle()

    return { app }
  },

}
</script>
