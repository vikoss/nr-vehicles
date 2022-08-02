<template>
  <header-base />
  <main>
    <div class="px-6 sm:px-16 py-12">
      <redirect-to-back :route="app.goToHome" />
      <div class="flex items-center justify-between">
        <title-bar
          title="Vehículos"
          subtitle="Consulta la información del vehículo."
          style="margin-bottom: 1.2rem;"
        />
        <button-base
          id="button-add-vehicle"
          title="Agregar un vehículo"
          class="h-14 w-14 rounded-full text-2xl"
          label="➕️"
          @click="app.goToVehicleCreate"
        />
      </div>
      <search-bar
        id="search-bar"
        v-model="app.inventoryNumber"
        placeholder="Buscar por número de inventario"
        class="rounded-md"
        @search="app.fetchVehicles"
      />
      <div v-show="!!app.vehicles.data.length && !app.loading">
        <table-base
          :headers="[
            { name: 'economic_number', label: 'Economico' },
            { name: 'name', label: 'Nombre' },
            { name: 'inventory_number', label: 'Inventario' },
          ]"
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
import { searchVehicles } from './../../api/vehicles'
import HeaderBase from './../../components/HeaderBase.vue'
import SearchBar from './../../components/SearchBar.vue'
import TableBase from './../../components/TableBase.vue'
import Loading from './../../components/LoadingBalls.vue'
import PaginationBase from './../../components/PaginationBase.vue'
import RedirectToBack from './../../components/RedirectToBack.vue'
import TitleBar from './../../components/TitleBar.vue'
import ButtonBase from './../../components/ButtonBase.vue'

export default {
  components: {
    HeaderBase,
    SearchBar,
    TableBase,
    Loading,
    PaginationBase,
    RedirectToBack,
    TitleBar,
    ButtonBase,
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
      goToVehicleDetails: (vehicle) => router.push({ name: 'VehicleShow', params: { vehicle }}),
      goToHome: () => router.push({ name: 'Home' }),
      goToVehicleCreate: () => router.push({ name: 'VehicleCreate' }),
    })

    app.fetchVehicles()

    return { app }
  },

}
</script>

<style scoped>

#button-add-vehicle {
  background-color: white;
  border-color: white;
}
#button-add-vehicle:hover {
  background-color: #e0e2e0;
}
</style>