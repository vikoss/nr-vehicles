<template>
  <header-base />
  <main>
    <search-bar
      id="search-bar"
      v-model="app.inventoryNumber"
      @search="app.fetchVehicles"
      placeholder="Buscar por número de inventario"
    />
    <div class="px-6 sm:px-16 py-12">
      <redirect-to-back :route="app.goToHome" />
      <title-bar
        title="Vehículos"
        subtitle="Consulta la información del vehiculo."
        style="margin-bottom: 1.2rem;"
      />
      <div v-show="!!app.vehicles.data.length && !app.loading">
        <table-base
          :headers="[{ name: 'economic_number', label: 'Economico' }, { name: 'name', label: 'Nombre' }, { name: 'inventory_number', label: 'Inventario' } ]"
          :data="app.vehicles.data"
          :action="app.goToVehicleDetails"
        />
        <pagination-base
          :currentPage="app.vehicles.current_page"
          :offset="4"
          :lastPage="app.vehicles.last_page"
          @pageChanged="app.fetchVehicles"
          class="float-right mt-5"
        />
      </div>
      <loading v-show="app.loading" class="mx-auto mt-10" />
    </div>
  </main>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { searchVehicles } from '../api/vehicles'
import HeaderBase from './../components/HeaderBase.vue'
import SearchBar from '../components/SearchBar.vue'
import TableBase from './../components/TableBase.vue'
import Loading from '../components/LoadingBalls.vue'
import PaginationBase from '../components/PaginationBase.vue'
import RedirectToBack from './../components/RedirectToBack.vue'
import TitleBar from './../components/TitleBar.vue'

export default {
  components: {
    HeaderBase,
    SearchBar,
    TableBase,
    Loading,
    PaginationBase,
    RedirectToBack,
    TitleBar,
  },
  setup() {
    const router = useRouter()

    const app = reactive({
      inventoryNumber: '',
      vehicles: {
        data: [],
        current_page: 1,
        last_page: 1,
      },
      loading: false,
      fetchVehicles: async (page = 1) => {
        app.loading = true
        app.vehicles = await searchVehicles({ inventoryNumber: app.inventoryNumber, page })
        app.loading = false
      },
      goToVehicleDetails: (vehicle) => router.push({ name: 'VehicleDetail', params: { vehicle }}),
      goToHome: () => router.push({ name: 'Home' }),
    })

    app.fetchVehicles()

    return { app }
  },

}
</script>
