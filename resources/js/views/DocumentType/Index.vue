<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <redirect-to-back />
    <title-bar
      title="Tipos de documentos"
      subtitle="Consulta la información del vehiculo. De ser necesario puedes cargar documentación."
    />
    <table-base
      v-show="!!app.documentTypes.length && !app.loading"
      :headers="[{ name: 'name', label: 'Nombre' }, { name: 'created_at', label: 'Fecha creación' }, { name: 'updated_at', label: 'Fecha actualización' } ]"
      :data="app.documentTypes"
      :action="app.goDocumentTypeDetails"
    />
    <loading v-show="app.loading" class="mx-auto mt-10" />
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getDocumentTypes } from './../../api/documentTypes'
import HeaderBase from './../../components/HeaderBase.vue'
import TableBase from './../../components/TableBase.vue'
import Loading from './../../components/LoadingBalls.vue'
import RedirectToBack from '../../components/RedirectToBack.vue'
import TitleBar from '../../components/TitleBar.vue'

export default {
  components: {
    HeaderBase,
    TableBase,
    Loading,
    RedirectToBack,
    TitleBar,
  },
  setup() {
    const app = reactive({
      router: useRouter(),
      documentTypes: [],
      loading: false,
      fetchDocumentTypes: async () => {
        app.loading = true
        app.documentTypes = await getDocumentTypes()
        app.loading = false
      },
      goDocumentTypeDetails: (vehicle) => ({}), //router.push({ name: 'VehicleDetail', params: { vehicle }})
    })

    app.fetchDocumentTypes()

    return { app }
  },
}
</script>
