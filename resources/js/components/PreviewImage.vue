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
            <pdf-svg
              class="w-full h-full max-h-full"
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
          @click="app.toggleModal({ modal: 'preview', value: true })"
        >
        <pencil-svg
          class="h-6 w-6 cursor-pointer"
          title="Agregar comentario"
          @click="app.toggleModal({ modal: 'comment', value: true })"
        />
        <img
          class="cursor-pointer"
          title="Eliminar"
          src="./../assets/svg/deleteItem.svg"
          alt="delete item"
          @click="app.deleteImage"
        >
      </div>
    </div>
    <modal-preview-image
      :show="app.modals.preview"
      :url-file="img"
      :document-type="documentType"
      @closed="app.toggleModal({ modal: 'preview', value: false })"
    />
    <modal-comment
      :show="app.modals.comment"
      message="Agrega un comentario o nota sobre el documento."
      :comment="comment"
      :closed="() => app.toggleModal({ modal: 'comment', value: false })"
      @handle-comment="app.handleComment"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import PreviewDefaultImage from './../assets/svg/previewImage.svg'
import ModalPreviewImage from './ModalPreviewImage.vue'
import PencilSvg from './../svg/Pencil.vue'
import ModalComment from './ModalComment.vue'
import PdfSvg from './../svg/PDF.vue'

export default {
  name: 'PreviewImage',
  components: { ModalPreviewImage, PencilSvg, ModalComment, PdfSvg },
  props: {
    img: {
      type: String,
      default: 'default',
    },
    documentIndex: {
      type: Number,
      default: 0,
    },
    documentType: {
      type: String,
      default: 'image/png',
    },
    comment: {
      type: String,
      default: '',
    },
  },
  emits: ['deleteImage', 'handleComment'],
  setup(props, { emit }) {

    const app = reactive({
      modal: false,
      modals: {
        comment: false,
        preview: false,
      },
      toggleModal: ({ modal, value }) => (app.modals[modal] = value),
      deleteImage: () => emit('deleteImage', props.documentIndex),
      handleComment: (comment) => emit('handleComment', comment),
    })

    return { app, PreviewDefaultImage }
  }

}
</script>
