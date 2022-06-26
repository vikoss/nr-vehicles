<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <search-bar
      v-model="app.value"
      @search="app.getVehicles"
      id="search-bar"
    />
    <table-base
      v-show="app.isEmpty"
      :headers="[{ name: 'economic_number', label: 'Economico' }, { name: 'name', label: 'Nombre' }, { name: 'inventory_number', label: 'Inventario' } ]"
      :data="app.vehicles.data"
      :action="app.goVehicleDetails"
    />
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { searchVehicles, getVehicles } from '../api/vehicles'
import HeaderBase from './../components/HeaderBase.vue'
import SearchBar from '../components/SearchBar.vue'
import TableBase from './../components/TableBase.vue'

export default {
  components: { HeaderBase, SearchBar, TableBase },
  setup() {
    const router = useRouter()

    const app = reactive({
      value: '',
      vehicles: [],
      isEmpty: computed(() => {
        if (app.vehicles.data) {
          return !!app.vehicles.data.length
        }
        return false
      }),
      getVehicles: async () => {
        app.vehicles = await searchVehicles(app.value)
      },
      getAllVehicles: async () => {
        app.vehicles = await getVehicles()
      },
      goVehicleDetails: (vehicle) => router.push({ name: 'VehicleDetail', params: { vehicle }})
    })

    app.getAllVehicles()

    return { app }
  },

}
</script>
