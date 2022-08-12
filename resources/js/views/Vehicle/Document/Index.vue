<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back :route="app.goToVehicleShow" />

    <title-bar
      :title="app.vehicle.name"
      subtitle="Gestiona y visualiza la documentación del vehículo."
    />

    <div v-show="!app.loading">
      <image-viewer
        class="mt-12"
        v-if="!!app.documents.length"
        :documents="app.documents"
        @delete="app.showModalConfirm"
      />
      <div v-show="!app.documents.length">
        <div class="flex flex-col items-center mt-20">
          <folder-not-found-svg />
          <p class="text-lg sm:text-xl opacity-70 mt-6">
            Aun no tiene documentación.
          </p>
        </div>
      </div>
      <button-base
        v-show="app.userRoles.includes('document-store')"
        class="sm:max-w-sm mx-auto mt-8"
        :label="!!app.documents.length ? 'Agregar más documentación' : 'Agregar documentación'"
        :loading="app.loading"
        @click="app.goToUploadDocuments"
        :disabled="false"
      />
    </div>

    <loading v-show="app.loading" />

    <modal-confirm
      :show="app.modal"
      :closed="app.closeModal"
      :action="app.destroyDocument"
      message="¿Desea elimiar el documento?"
    />
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle } from './../../../api/vehicles'
import { deleteDocument } from './../../../api/documents'
import { getDocuments } from './../../../api/documents'
import HeaderBase from './../../../components/HeaderBase.vue'
import ButtonBase from './../../../components/ButtonBase.vue'
import ImageUploader from './../../../components/ImageUploader.vue'
import ImageViewer from './../../../components/ImageViewer.vue'
import RedirectToBack from './../../../components/RedirectToBack.vue'
import TitleBar from './../../../components/TitleBar.vue'
import ModalSuccess from './../../../components/ModalSuccess.vue'
import ModalConfirm from './../../../components/ModalConfirm.vue'
import Loading from './../../../components/LoadingBalls.vue'
import { userRoles as roles } from './../../../helpers/LocalStorage'
import FolderNotFoundSvg from '../../../svg/FolderNotFound.vue'

export default {
  components: {
    HeaderBase,
    ImageUploader,
    ButtonBase,
    RedirectToBack,
    TitleBar,
    ModalSuccess,
    ImageViewer,
    ModalConfirm,
    Loading,
    FolderNotFoundSvg,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const app = reactive({
      loading: false,
      modal: false,
      documents: [],
      vehicle: {},
      userRoles: roles(),
      documentIdToDelete: null,
      closeModal: () => (app.modal = false),
      goToUploadDocuments: () => router.push({ name: 'VehicleUploadDocuments', params: { vehicle: route.params.vehicle }}),
      goToVehicleShow: () => router.push({ name: 'VehicleShow', params: { vehicle: route.params.vehicle }}),
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      fetchDocuments: async () => {
        const { data } =  await getDocuments(route.params.vehicle)
        app.documents = data.map((document) => ({
          id: document.id,
          type: document.document_type.name,
          description: document.description,
          url: document.url,
        }))
      },
      destroyDocument: async () => {
        app.modal = false
        app.loading = true
        await deleteDocument(app.documentIdToDelete)
        app.documents = []
        await app.fetchDocuments()
        app.loading = false
      },
      showModalConfirm: (documentId) => {
        app.documentIdToDelete = documentId
        app.modal = true
      },
      fetchData: async () => {
        app.loading = true
        await app.fetchVehicle()
        await app.fetchDocuments()
        app.loading = false
      },
    })

    app.fetchData()

    return { app }
  },

}
</script>
