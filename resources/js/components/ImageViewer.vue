<template>
  <div>

    <div class="mb-7 hidden sm:block">
      <div
        class="bg-gray-200 h-96 w-full justify-center items-center cursor-pointer md:flex"
        @click="app.toggleModal(true)"
      >
        <img
          v-show="app.mainDocumentMIMEType === 'image'"
          class="max-w-full h-auto max-h-full"
          :src="app.mainImage.url"
          :alt="app.mainImage.description"
        >
        <div v-show="app.mainDocumentMIMEType === 'pdf'" class="w-11/12">
          <div
            class="h-96"
            style="position: relative; overflow: hidden; width: 100%;"
          >
            <iframe
              style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"
              :src="app.srcPDF"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <p class="text-black font-medium text-base">
            Documento:
            <strong class="font-light text-sm cursor-pointer hover:font-medium" @click="app.toggleModal(true)">
              {{ app.mainImage.type }}
            </strong>
          </p>
          <p class="text-black font-medium text-base">
            Descripción:
            <strong class="font-normal text-sm">
              {{ app.mainImage.description }}
            </strong>
          </p>
        </div>
        <div class="pl-2 pt-1">
          <img
            src="./../assets/svg/deleteItem.svg"
            alt="Elimiar documento"
            class="h-11 w-11 max-w-none cursor-pointer"
            @click="app.deleteImage(app.mainImage.id)"
          >
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="hidden sm:flex items-center mr-5">
        <arrow-left class="cursor-pointer w-20 h-20" @click="app.scrollRigth"/>
      </div>
      <div id="galery-container" class="flex flex-col sm:overflow-hidden sm:flex-row">
        <div
          v-for="(document, index) in documents"
          :key="index"
          class="hidden md:block mr-12"
          @click="app.changeMainImage(index)"
        >
          <div class="bg-gray-200 w-full h-96 md:h-32 md:w-28 flex justify-center items-center cursor-pointer">
            <img
              v-show="!document.url.includes('pdf')"
              class="max-w-full h-auto max-h-full"
              :src="document.url"
              :alt="document.description"
            >
            <div v-show="document.url.includes('pdf')" class="w-11/12">
              <div
                class="h-32"
                style="position: relative; overflow: hidden; width: 100%;"
              >
                <iframe
                  style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"
                  :src="document.url"
                />
              </div>
            </div>
          </div>
          <p class="text-black font-light text-sm mt-1 text-justify w-full md:w-28 cursor-pointer hover:font-medium">
            {{ document.type }}
          </p>
        </div>

        <div
          v-for="(document, index) in documents"
          :key="index"
          class="md:hidden mb-6"
        >
          <div class="bg-gray-200 w-full h-72 md:h-32 md:w-28 flex justify-center items-center cursor-pointer" @click="app.changeMainImageAndOpenModal(index)">
            <img
              v-show="!document.url.includes('pdf')"
              class="max-w-full h-auto max-h-full"
              :src="document.url"
              :alt="document.description"
            >
            <div v-show="document.url.includes('pdf')" class="w-11/12">
              <div
                class="h-32"
                style="position: relative; overflow: hidden; width: 100%;"
              >
                <iframe
                  style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%;"
                  :src="document.url"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <p class="text-black font-medium text-base">
                Documento:
                <strong class="font-normal text-sm">
                  {{ document.type }}
                </strong>
              </p>
              <p class="text-black font-medium text-base">
                Descripción:
                <strong class="font-normal text-sm">
                  {{ document.description }}
                </strong>
              </p>
            </div>
            <div class="pl-2 pt-1">
              <img
                src="./../assets/svg/deleteItem.svg"
                alt="Elimiar documento"
                class="h-11 w-11 max-w-none cursor-pointer"
                @click="app.deleteImage(document.id)"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="hidden sm:flex items-center ml-5" @click="app.scrollLeft">
        <arrow-right class="cursor-pointer h-20 w-20" />
      </div>
    </div>
    <modal-preview-image
      :show="app.modal"
      :url-file="app.mainImage.url"
      :document-type="app.mainDocumentMIMEType"
      @closed="app.toggleModal(false)"
    />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import ArrowRight from './../svg/ArrowRight.vue'
import ArrowLeft from './../svg/ArrowLeft.vue'
import ModalPreviewImage from './ModalPreviewImage.vue'

export default {
  name: 'ImageViewer',
  emits: ['delete'],
  components: { ArrowRight, ModalPreviewImage, ArrowLeft },
  props: {
    documents: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props, { emit }) {
    const app = reactive({
      mainImage: props.documents[0],
      modal: false,
      mainDocumentMIMEType: computed(() => app.mainImage.url.includes('.pdf') ? 'pdf' : 'image'),
      srcPDF: computed(() => `${app.mainImage.url}#toolbar=0`),
      changeMainImage: (index) => {
        app.mainImage = props.documents[index]
      },
      toggleModal: (status) => {
        app.modal = status
      },
      changeMainImageAndOpenModal: (index) => {
        app.mainImage = props.documents[index]
        app.toggleModal(true)
      },
      deleteImage: (documentId) => emit('delete', documentId),
      scrollLeft: () => document.getElementById('galery-container').scrollLeft += 160,
      scrollRigth: () => document.getElementById('galery-container').scrollLeft -= 160,
    })

    return { app }
  },
}
</script>
