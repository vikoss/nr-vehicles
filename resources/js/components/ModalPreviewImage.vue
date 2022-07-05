<template>
  <modal-base :show="show" @closed="app.closed">
    <div class="flex justify-center">
      <img
        v-show="app.isImage"
        style="max-height: 85vh;"
        :src="urlFile"
        alt="Documento"
      >
      <iframe
        v-show="app.isPDF"
        style="max-height: 85vh; height: 80vh; width: 100%;"
        :src="app.srcPDF"
      />
    </div>
  </modal-base>
</template>

<script>
import ModalBase from './ModalBase.vue'
import { computed, reactive } from 'vue'

export default {
  name: 'ModalPreviewImage',
  components: { ModalBase },
  props: {
    urlFile: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    documentType: {
      type: String,
      default: 'img',
    },
  },
  emits: ['closed'],
  setup(props, { emit }) {

    const app = reactive({
      closed: () => emit('closed'),
      isPDF: computed(() => props.documentType.includes('pdf')),
      isImage: computed(() => props.documentType.includes('image')),
      srcPDF: computed(() => `${props.urlFile}#toolbar=0`),
    })

    return { app }
  },
}
</script>
