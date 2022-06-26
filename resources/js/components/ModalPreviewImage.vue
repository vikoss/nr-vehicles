<template>
  <modal-base :show="show" @closed="closed">
    <div class="max-w-xl lg:max-w-4xl flex justify-center">
      <img style="max-height: 85vh;" :src="img" alt="Documento">
    </div>
  </modal-base>
</template>

<script>
import ModalBase from './ModalBase.vue'

export default {
  name: 'ModalPreviewImage',
  components: { ModalBase },
  props: {
    img: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closed'],
  setup(props, { emit }) {

    const closed = () => {
      emit('closed')
    }

    return { closed }
  },
}
</script>
