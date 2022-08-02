<template>
  <header-base />
  <main class="px-6 sm:px-16 py-12">
    <div class="grid gap-3 grid-cols-1 sm:grid-cols-2">
      <div class="col-span-1">
        <card-base
          label="Vehiculos"
          description="Realizar busqueda."
          :redirect-to="{ name: 'VehicleIndex' }"
        />
      </div>
      <div class="col-span-1">
        <card-base
          label="Catálogo de documentos."
          description="Gestiona el catálogo de tipo de documentos para los vehiculos."
          :redirect-to="{ name: 'DocumentTypes' }"
        />
      </div>
    </div>
  </main>
</template>

<script>
import HeaderBase from './../components/HeaderBase.vue'
import CardBase from './../components/CardBase.vue'

export default {
  components: { HeaderBase, CardBase }
}
</script>
