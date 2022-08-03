<template>
  <div>
    <div class="flex w-full">
      <div class="w-full lg:w-1/2">
        <p class="text-wine font-bold text-base">
          {{ documentName }}
        </p>
        <p class="text-xs" style="color: #999999;">
          * Campo no obligatorio
        </p>
      </div>
      <div class="hidden lg:w-1/2 lg:block">
        <button-base
          class="max-w-xs mx-auto text-wine border-solid border-wine"
          style="background-color: #ffffff;"
          label="Cargar archivos"
          @click="app.onClickButton"
        />
      </div>
    </div>
    <input
      :id="app.documentId"
      type="file"
      accept=".pdf,image/*"
      multiple
      hidden
      @change="app.onChange"
    >
    <div class="flex flex-wrap gap-5">
      <preview-image
        v-for="(document, index) in documents"
        :key="index"
        class="my-4"
        :img="document.url"
        :document-index="index"
        :document-type="document.file.type"
        :comment="app.images?.[index]?.comment"
        @delete-image="app.deleteImage"
        @handle-comment="(comment) => (app.images[index].comment = comment)"
      />
    </div>
    <div class="mt-2 lg:hidden">
      <button-base
        class="max-w-xs ml-0 mx-auto border-solid border-wine text-wine"
        style="background-color: #ffffff;"
        label="Cargar archivos"
        @click="app.onClickButton"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import ButtonBase from './ButtonBase.vue'
import PreviewImage from './PreviewImage.vue'

export default {
  components: { ButtonBase, PreviewImage },
  props: {
    documentName: {
      type: String,
      default: '',
    },
    documents: {
      type: Array,
      default: () => ([]),
    },
    documentIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {

    const app = reactive({
      images: [...props.documents.map((document) => ({ url: document, file: null }))],
      documentId: `document-${props.documentIndex}`,
      onClickButton: () => document.getElementById(app.documentId).click(),
      deleteImage: (index) => {
        app.images.splice(index, 1)
        emit('change', { images: app.images, documentIndex: props.documentIndex })
      },
      onChange: ({ target }) => {
        for (let i = 0; i < target.files.length; i++) {
          let file = target.files[i]
          app.images.push({
            url: URL.createObjectURL(file),
            file,
          })
        }
        emit('change', { images: app.images, documentIndex: props.documentIndex })
      },
      handleComment: (comment) => (app.images = comment)
    })

    return { app }
  },
}
</script>
