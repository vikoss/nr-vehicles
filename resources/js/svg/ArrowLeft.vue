<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g id="Grupo_18500" data-name="Grupo 18500" transform="translate(-980 -696)">
      <rect id="Bounds" width="24" height="24" transform="translate(980 696)" fill="none"/>
      <path id="Icon" d="M15.4,7.4,14,6,8,12l6,6,1.4-1.4L10.8,12Z" transform="translate(980 696)" :fill="hexColor"/>
    </g>
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
