<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicles" />
    <title-bar
      :title="app.vehicle.name"
      subtitle="Consulta la información del vehiculo. De ser necesario puedes cargar documentación."
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
      label="Número economico:"
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
    <input-base
      id="responsible_area"
      v-model="app.vehicle.responsible_area"
      label="Área responsable:"
      :disabled="true"
      class="mb-2"
    />
    <!-- <image-viewer
      v-if="!!app.documents.length"
      :documents="app.documents"
    /> -->
    <!-- <button-base
      class="sm:max-w-sm mx-auto mt-20"
      label="Agregar documentación"
      :loading="false"
      @click="app.goToUploadVehicleDocuments"
      :disabled="false"
    /> -->
    <button-base
      class="sm:max-w-sm mx-auto mt-8"
      label="Consultar documentación"
      :loading="false"
      @click="app.goToUploadVehicleDocuments"
      :disabled="false"
    />
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle } from '../../api/vehicles'
import { getDocuments } from '../../api/documents'
import HeaderBase from '../../components/HeaderBase.vue'
import SearchBar from '../../components/SearchBar.vue'
import TableBase from '../../components/TableBase.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import InputBase from '../../components/InputBase.vue'
import ButtonBase from '../../components/ButtonBase.vue'
import ArrowRight from '../../svg/ArrowRight.vue'
import ImageViewer from '../../components/ImageViewer.vue'
import TitleBar from '../../components/TitleBar.vue'

export default {
  components: { HeaderBase, SearchBar, TableBase, RedirectToBack, InputBase, ArrowRight, ButtonBase, ImageViewer, TitleBar, },
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
      fetchDocuments: async () => {
        const { data } =  await getDocuments(route.params.vehicle)
        app.documents = data.map((document) => ({
          type: document.document_type.name,
          description: document.description,
          url: document.url,
        }))
      },
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      goToUploadVehicleDocuments: () => router.push({ name: 'VehicleDocuments', params: { vehicle: route.params.vehicle }}),
      goToVehicles: () => router.push({ name: 'Search' }),
      vehicle: {},
      documents: [],
    })

    app.fetchVehicle()
    app.fetchDocuments()

    return { app }
  },

}
</script>
