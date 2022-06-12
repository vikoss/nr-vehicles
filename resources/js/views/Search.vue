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
      :headers="[{ name: 'economic_number', label: 'Economico' }, { name: 'name', label: 'Nombre' }, { name: 'inventory_number', label: 'Inventario' }, { name: 'serial_number', label: 'Número de serie' }, ]"
      :data="app.vehicles.data"
      :action="() => ({})"
    />
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { searchVehicles } from '../api/vechicles'
import HeaderBase from './../components/HeaderBase.vue'
import SearchBar from '../components/SearchBar.vue'
import TableBase from './../components/TableBase.vue'

export default {
  components: { HeaderBase, SearchBar, TableBase },
  setup() {
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
      }
    })

    return { app }
  },

}
</script>
