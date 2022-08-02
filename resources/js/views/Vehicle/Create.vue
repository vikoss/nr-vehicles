<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicleIndex" />
    <title-bar
      :title="app.vehicle.name ? app.vehicle.name : 'Nuevo vehiculo'"
      subtitle="Ingresa los datos para registrar un nuevo vehiculo."
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
      label="Registrar"
      :loading="app.loading"
      @click="app.saveVehicle"
      :disabled="false"
    />
    <loading v-show="app.loading" />
    <modal-success
      :show="app.modal"
      :closed="app.closeModal"
      message="Vehiculo registrado de forma exitosa."
    />
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeVehicle } from '../../api/vehicles'
import { getDirections } from './../../api/directions'
import HeaderBase from '../../components/HeaderBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import TitleBar from '../../components/TitleBar.vue'
import SelectBase from '../../components/SelectBase.vue'
import Loading from '../../components/LoadingBalls.vue'
import ModalSuccess from '../../components/ModalSuccess.vue'

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

    const app = reactive({
      router: useRouter(),
      vehicle: {},
      directions: [],
      loading: false,
      modal: false,
      closeModal: () => {
        app.modal = false
        app.goToVehicleIndex()
      },
      fetchDirections: async () => {
        const directions = await getDirections()
        app.directions = directions.map(({ name, id }) => ({ name, value: id }))
      },
      saveVehicle: async () => {
        app.loading = true
        await storeVehicle(app.vehicle)
        app.loading = false
        app.modal = true
      },
      init: async () => {
        app.loading = true
        await app.fetchDirections()
        app.loading = false
      },
      goToVehicleIndex: () => app.router.push({ name: 'VehicleIndex' }),
    })

    app.init()

    return { app }
  },
}
</script>
