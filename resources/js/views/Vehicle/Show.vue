<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">

    <div class="flex items-center justify-between">
      <redirect-to-back :route="app.goToVehicles" />
      <div v-show="app.userRoles.includes('vehicle-destroy')" class="flex items-center cursor-pointer flex-none">
        <p class="hidden sm:block">Eliminar vehículo</p>
        <img
          class="cursor-pointer w-10 h-10"
          title="Eliminar"
          src="./../../assets/svg/deleteItem.svg"
          alt="delete item"
          @click="() => app.toggleModal({ modal: 'confirm', value: true })"
        >
      </div>
    </div>

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

    <modal-confirm
      :show="app.modals.confirm"
      :closed="() => app.toggleModal({ modal: 'confirm', value: false })"
      :action="app.deleteVehicle"
      message="¿Desea elimiar el vehículo?"
    />

    <modal-success
      :show="app.modals.success"
      :closed="app.goToVehicles"
      message="El vehiculo se elimino exitosamente."
    />
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle, destroyVehicle } from '../../api/vehicles'
import { getDirections } from './../../api/directions'
import HeaderBase from '../../components/HeaderBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import TitleBar from '../../components/TitleBar.vue'
import SelectBase from '../../components/SelectBase.vue'
import Loading from '../../components/LoadingBalls.vue'
import { userRoles as roles } from './../../helpers/LocalStorage'
import ModalConfirm from './../../components/ModalConfirm.vue'
import ModalSuccess from './../../components/ModalSuccess.vue'

export default {
  components: {
    HeaderBase,
    RedirectToBack,
    TitleBar,
    InputBase,
    SelectBase,
    ButtonBase,
    Loading,
    ModalConfirm,
    ModalSuccess,
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
      deleteVehicle: async () => {
        app.loading = true
        await destroyVehicle(app.vehicle.id)
        app.loading = false
        app.toggleModal({ modal: 'confirm', value: false })
        app.toggleModal({ modal: 'success', value: true })
      },
      vehicle: {},
      userRoles: roles(),
      modals: {
        success: false,
        confirm: false,
      },
      toggleModal: ({ modal, value }) => (app.modals[modal] = value),
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
