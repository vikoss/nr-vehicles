<template>
  <div>
    <div>
      <div class="h-20 w-20 flex justify-center items-center" style="background-color: #F1F1F1;">
        <img
          v-show="documentType.includes('image')"
          class="max-h-20"
          :src="img === 'default' ? PreviewDefaultImage : img"
          alt="landscape"
        >
        <div v-show="documentType.includes('pdf')" class="w-11/12">
          <div
            class="h-20"
            style="position: relative; overflow: hidden; width: 100%;"
          >
            <iframe
              style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"
              :src="img"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-3">
        <img
          class="cursor-pointer"
          title="Zoom"
          src="./../assets/svg/expandImage.svg"
          alt="expand image"
          @click="app.toggleModal(true)"
        >
        <img
          v-show="!hideTrashIcon"
          class="cursor-pointer"
          title="Eliminar"
          src="./../assets/svg/deleteItem.svg"
          alt="delete item"
          @click="app.deleteImage"
        >
      </div>
    </div>
    <modal-preview-image
      :show="app.modal"
      :url-file="img"
      :document-type="documentType"
      @closed="app.toggleModal(false)"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import PreviewDefaultImage from './../assets/svg/previewImage.svg'
import ModalPreviewImage from './ModalPreviewImage.vue'

export default {
  name: 'PreviewImage',
  components: { ModalPreviewImage },
  props: {
    img: {
      type: String,
      default: 'default',
    },
    documentIndex: {
      type: Number,
      default: 0,
    },
    hideTrashIcon: {
      type: Boolean,
      default: false,
    },
    documentType: {
      type: String,
      default: 'image/png',
    },
  },
  emits: ['deleteImage'],
  setup(props, { emit }) {
    const app = reactive({
      modal: false,
      toggleModal: (status) => (app.modal = status),
      deleteImage: () => emit('deleteImage', props.documentIndex),
      /* showPreview: () => {
        if (props.documentType === 'pdf') {
          wind
          return
        }
        app.toggleModal(true)
      }, */
    })

    return { app, PreviewDefaultImage }
  }

}
</script>
