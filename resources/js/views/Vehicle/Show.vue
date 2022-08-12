<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicles" />
    <title-bar
      :title="app.vehicle.name"
      subtitle="Consulta la información del vehículo. De ser necesario puedes cargar documentación."
    />
    <input-base
      id="inventory_number"
      v-model="app.vehicle.inventory_number"
      label="Número de inventario:"
      :disabled="true"
      class="mb-2"
    />
    <input-base
      id="name"
      v-model="app.vehicle.name"
      label="Nombre:"
      :disabled="true"
      class="mb-2"
    />
    <input-base
      id="brand"
      v-model="app.vehicle.brand"
      label="Marca:"
      :disabled="true"
      class="mb-2"
    />
    <input-base
      id="model"
      v-model="app.vehicle.model"
      label="Modelo:"
      :disabled="true"
      class="mb-2"
    />
    <input-base
      id="economic_number"
      v-model="app.vehicle.economic_number"
      label="Número económico:"
      :disabled="true"
      class="mb-2"
    />
    <input-base
      id="serial_number"
      v-model="app.vehicle.serial_number"
      label="Número de serie:"
      :disabled="true"
      class="mb-2"
    />
    <select-base
      id="responsible_area"
      label="Área responsable:"
      :options="app.directions"
      v-model="app.vehicle.direction_id"
      disabled
    />

    <div class="mt-10 lg:flex">
      <button-base
        v-show="app.userRoles.includes('vehicle-update')"
        class="sm:max-w-sm mx-auto text-wine mb-5 lg:mb-0"
        style="background-color: #ffffff;"
        label="Editar"
        :loading="false"
        @click="app.goToVehicleUpdate"
        :disabled="false"
      />
      <button-base
        class="sm:max-w-sm mx-auto"
        label="Consultar documentación"
        :loading="false"
        @click="app.goToUploadVehicleDocuments"
        :disabled="false"
      />
    </div>
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle } from '../../api/vehicles'
import { getDirections } from './../../api/directions'
import HeaderBase from '../../components/HeaderBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import TitleBar from '../../components/TitleBar.vue'
import SelectBase from '../../components/SelectBase.vue'
import Loading from '../../components/LoadingBalls.vue'
import { userRoles as roles } from './../../helpers/LocalStorage'

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
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      fetchDirections: async () => {
        const directions = await getDirections()
        app.directions = directions.map(({ name, id }) => ({ name, value: id }))
      },
      goToUploadVehicleDocuments: () => router.push({ name: 'VehicleDocuments', params: { vehicle: route.params.vehicle }}),
      goToVehicleUpdate: () => router.push({ name: 'VehicleUpdate', params: { vehicle: route.params.vehicle }}),
      goToVehicles: () => router.push({ name: 'VehicleIndex' }),
      vehicle: {},
      userRoles: roles(),
      fetchInitialData: async () => {
        app.loading = true
        await app.fetchVehicle()
        await app.fetchDirections()
        app.loading = false
      },
    })

    app.fetchInitialData()

    return { app }
  },

}
</script>
