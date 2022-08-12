<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicleShow" />
    <title-bar
      :title="app.vehicle.name"
      subtitle="Consulta la información del vehículo. De ser necesario puedes cargar documentación."
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
      label="Número económico:"
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

    <div class="mt-10 lg:flex">
      <button-base
        class="sm:max-w-sm mx-auto text-wine mb-5 lg:mb-0"
        style="background-color: #ffffff;"
        label="Cancelar"
        @click="app.goToVehicleShow"
      />
      <button-base
        class="sm:max-w-sm mx-auto"
        label="Actualizar"
        :loading="app.loading"
        @click="app.saveVehicle"
        :disabled="app.disabled"
      />
    </div>

    <loading v-show="app.loading" />
    <modal-success
      :show="app.modal"
      :closed="app.closeModal"
      message="Actualización de forma exitosa."
    />
  </main>
</template>

<script>
import { reactive, computed } from 'vue'
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
import ModalSuccess from '../../components/ModalSuccess.vue'
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
    ModalSuccess,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const app = reactive({
      vehicle: {
        inventory_number: '',
        name: '',
        brand: '',
        model: '',
        direction_id: 0,
        economic_number: '',
        serial_number: '',
      },
      userRoles: roles(),
      directions: [],
      loading: false,
      modal: false,
      disabled: computed(() => !(
        app.vehicle.inventory_number.trim().length > 2 &&
        app.vehicle.name.trim().length > 2 &&
        app.vehicle.brand.trim().length > 2 &&
        app.vehicle.model.trim().length > 2 &&
        app.vehicle.economic_number.trim().length > 2 &&
        app.vehicle.serial_number.trim().length > 2 &&
        app.vehicle.direction_id
      )),
      closeModal: () => {
        app.modal = false
        app.goToVehicleShow()
      },
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
        app.modal = true
      },
      fetchInitialData: async () => {
        if (!app.userRoles.includes('vehicle-update')) {
          return router.go(-1)
        }
        app.loading = true
        await app.fetchVehicle()
        await app.fetchDirections()
        app.loading = false
      },
      goToVehicleShow: () => router.push({ name: 'VehicleShow', params: { vehicle: route.params.vehicle }}),
    })

    app.fetchInitialData()

    return { app }
  },
}
</script>
