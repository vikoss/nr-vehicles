<template>
  <modal-base :show="show" @closed="closed">
    <div class="py-12 pb-8">
      <div class="flex flex-col items-center">
        <success-svg />
        <h5 class="text-base mb-14 mt-12 text-center" :style="'max-width: 587px; min-width: ' + minWidth ">
          {{ message }}
        </h5>
      </div>
      <button-base
        class="max-w-xs mx-auto"
        label="Aceptar"
        @click="closed"
      />
    </div>
  </modal-base>
</template>

<script>
import ModalBase from './ModalBase.vue'
import ButtonBase from './ButtonBase.vue'
import SuccessSvg from '../svg/Success.vue'

export default {
  components: {
    ModalBase,
    ButtonBase,
    SuccessSvg,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '',
    },
    closed: {
      type: Function,
      default: () => {},
    },
    minWidth: {
      type: String,
      default: 'auto',
    },
  },
  emits: ['closed'],
  setup() {
    const close = () => this.$emit('closed')

    return { close }
  },

}
</script>
