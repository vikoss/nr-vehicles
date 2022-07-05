<template>
  <div>
    <div style="width: 230px; height: 150px; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content:space-between;" class="mx-auto">
      <div class="bg-wine ball"></div>
      <div class="bg-wine ball"></div>
      <div class="bg-wine ball"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: bounce .5s alternate infinite;
}

.ball:nth-child(2) {
  animation-delay: .16s;
}

.ball:nth-child(3) {
  animation-delay: .32s;
}
@keyframes bounce {
  from {
    transform: scaleX(1.25);
  }
  to {
    transform: translateY(-100px) scale(1);
  }
}

</style>