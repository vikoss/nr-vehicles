<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="62.21" height="100.75" viewBox="0 0 6.221 10.075">
    <path :style="`fill: ${hexColor}`" d="M14.891,8.59l-3.854,3.845L7.184,8.59,6,9.774l5.038,5.038,5.038-5.038Z" transform="translate(-8.59 16.075) rotate(-90)" />
  </svg>
</template>

<script>
export default {
  name: 'ArrowLeft',
  props: {
    hexColor: {
      type: String,
      default: '#54191b',
    },
  },
}
</script>
