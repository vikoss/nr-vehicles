<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back />

    <title-bar title="Anexo de documentación">
      <template v-slot:subtitle>
        Agregar documentacion al vehículo
        <strong class="lowercase">
          {{ app.vehicle.name }}
        </strong>.
      </template>
    </title-bar>

    <div class="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:px-20">
      <image-uploader
        v-for="(document, index) in app.documents"
        :key="index"
        :document-index="index"
        :document-name="document.name"
        :documents="document?.tempFiles"
        @change="app.loadImages"
      />
    </div>

    <button-base
      class="sm:max-w-sm mx-auto mt-20"
      label="Agregar documentación"
      :loading="app.loading"
      @click="app.saveDocuments"
      :disabled="app.disabled"
    />

    <modal-success
      :show="app.modal"
      :closed="app.closeModal"
      message="La documentación se ha enviado exitosamente."
    />

    <loading v-show="app.loading" />
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicle } from '../../api/vehicles'
import { storeDocument } from '../../api/documents'
import { uploadFile } from '../../api/utils'
import { getDocumentTypes } from '../../api/documentTypes'
import HeaderBase from './../../components/HeaderBase.vue'
import ButtonBase from './../../components/ButtonBase.vue'
import ImageUploader from '../../components/ImageUploader.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import TitleBar from '../../components/TitleBar.vue'
import ModalSuccess from '../../components/ModalSuccess.vue'
import Loading from './../../components/LoadingBalls.vue'
import { userRoles as roles } from './../../helpers/LocalStorage'

export default {
  components: {
    HeaderBase,
    ImageUploader,
    ButtonBase,
    RedirectToBack,
    TitleBar,
    ModalSuccess,
    Loading,
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
      disabled: computed(() => !app.documents.some(document => document?.tempFiles?.length)),
      closeModal: () => router.push({ name: 'VehicleDocuments', params: { vehicle: route.params.vehicle }}),
      fetchVehicle: async () => {
        app.vehicle = await getVehicle(route.params.vehicle)
      },
      fetchDocumentTypes: async () => {
        app.documents = await getDocumentTypes()
      },
      loadImages: ({ images, documentIndex }) => {
        app.documents[documentIndex].tempFiles = images
      },
      saveDocuments: async () => {
        app.loading = true
        const documents = await app.mapDocumentsWithPublicUrl(app.mapDocumentsForGetPublicUrl())
        console.log(documents)
        await Promise.all(documents.map(async (document, index) => {
            let data = await storeDocument({ vehicleId: route.params.vehicle, document })
            console.log(data)
          }))
        app.loading = false
        app.modal = true
      },
      mapDocumentsWithPublicUrl: async (docs) => {
        const documents = []
        await Promise.all(docs.map(async (document, index) => {
          let { publicUrl } = await uploadFile({ path: `vehicles/${route.params.vehicle}/documents/${document.typeId}`, file: document.file })
          console.log(publicUrl)
          documents.push({ url: publicUrl, description: document.description, document_type_id: document.typeId })
        }))
        console.log(documents)

        return documents
      },
      mapDocumentsForGetPublicUrl: () => {
        const documents = []
        console.log(app.documents)
        app.documents.forEach((document, index) => {
          document?.tempFiles?.forEach((image, index) => {
            documents.push({ typeId: document.id, file: image.file, description: (image.comment || '') })
          })
        })

        return documents
      },
    })

    if (!app.userRoles.includes('document-store')) {
      router.go(-1)
    }
    app.fetchDocumentTypes()
    app.fetchVehicle()

    return { app }
  },

}
</script>
