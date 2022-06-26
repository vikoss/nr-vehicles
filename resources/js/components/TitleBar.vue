<template>
  <h1 class="mt-5 text-wine text-3xl font-bold">
    {{ title }}
  </h1>
  <span class="h-0.5 w-16 block bg-wine mt-4 mb-5" />
  <h2 class="text-base text-black mb-12">
    <slot name="subtitle" v-if="subtitle === ''" />
    <template v-if="subtitle !== ''">
      {{ subtitle }}
    </template>
  </h2>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  }
}
</script>
