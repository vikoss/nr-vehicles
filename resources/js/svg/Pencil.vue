<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="34.796" height="34.796" viewBox="0 0 34.796 34.796">
    <path fill="none" d="M0,0H34.8V34.8H0Z"/>
    <path :fill="hexColor" d="M19.035,11.728l1.334,1.334L7.233,26.2H5.9V24.863L19.035,11.728M24.254,3a1.451,1.451,0,0,0-1.015.42L20.586,6.074l5.437,5.437,2.653-2.653a1.444,1.444,0,0,0,0-2.044L25.284,3.42A1.424,1.424,0,0,0,24.254,3ZM19.035,7.625,3,23.66V29.1H8.437L24.472,13.062,19.035,7.625Z" transform="translate(1.349 1.349)"/>
  </svg>
</template>

<script>
export default {
  name: 'DocumentSVG',
  props: {
    hexColor: {
      type: String,
      default: '#54191b',
    },
  },
}
</script>
