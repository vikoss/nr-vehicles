<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicleDetails" />
    <title-bar
      :title="app.vehicle.name"
      subtitle="Consulta la información del vehiculo. De ser necesario puedes cargar documentación."
    />
    <input-base
      id="inventory_number"
      v-model="app.vehicle.inventory_number"
      label="Número de inventario:"
      class="mb-2"
    />
    <input-base
      id="name"
      v-model="app.vehicle.name"
      label="Nombre:"
      class="mb-2"
    />
    <input-base
      id="brand"
      v-model="app.vehicle.brand"
      label="Marca:"
      class="mb-2"
    />
    <input-base
      id="model"
      v-model="app.vehicle.model"
      label="Modelo:"
      class="mb-2"
    />
    <input-base
      id="economic_number"
      v-model="app.vehicle.economic_number"
      label="Número economico:"
      class="mb-2"
    />
    <input-base
      id="serial_number"
      v-model="app.vehicle.serial_number"
      label="Número de serie:"
      class="mb-2"
    />
    <select-base
      id="responsible_area"
      label="Área responsable:"
      :options="app.directions"
      v-model="app.vehicle.direction_id"
    />
    <button-base
      class="sm:max-w-sm mx-auto mt-8"
      label="Actualizar"
      :loading="app.loading"
      @click="app.saveVehicle"
      :disabled="false"
    />
    <loading v-show="app.loading" />
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle, updateVehicle } from '../../api/vehicles'
import { getDirections } from './../../api/directions'
import HeaderBase from '../../components/HeaderBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import TitleBar from '../../components/TitleBar.vue'
import SelectBase from '../../components/SelectBase.vue'
import Loading from '../../components/LoadingBalls.vue'

export default {
  components: {
    HeaderBase,
    RedirectToBack,
    TitleBar,
    InputBase,
    SelectBase,
    ButtonBase,
    Loading,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const app = reactive({
      vehicle: {},
      directions: [],
      loading: false,
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      fetchDirections: async () => {
        const directions = await getDirections()
        app.directions = directions.map(({ name, id }) => ({ name, value: id }))
      },
      saveVehicle: async () => {
        app.loading = true
        await updateVehicle({ vehicleId: route.params.vehicle, vehicle: app.vehicle })
        app.loading = false
      },
      fetchInitialData: async () => {
        app.loading = true
        await app.fetchVehicle()
        await app.fetchDirections()
        app.loading = false
      },
      goToVehicleDetails: () => router.push({ name: 'vehicleDetails', params: { vehicle: route.params.vehicle }}),
    })

    app.fetchInitialData()

    return { app }
  },
}
</script>
