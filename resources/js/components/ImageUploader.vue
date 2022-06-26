<template>
  <div>
    <div class="flex w-full">
      <div class="w-full lg:w-1/2">
        <p class="text-blue-second font-bold text-base">
          {{ documentName }}
        </p>
        <p v-if="required" class="text-xs text-black opacity-50">
          * Campo obligatorio
        </p>
      </div>
      <div class="hidden lg:w-1/2 lg:block">
        <button-base
          class="max-w-xs mx-auto bg-blue-second"
          label="Cargar archivos"
          :disabled="disabledMainButton"
          @click="onClickButton"
        />
      </div>
    </div>
    <!-- <div v-if="showCheckBox" class="flex justify-end items-end mt-1">
      <check-box-base
        :id="`checkbox_${documentTechnicalName}`"
        v-model="checkBox"
        label="Volver a solicitar documento"
        small
        @update:model-value="onReapplyDocument"
      />
    </div> -->
    <input
      :id="documentTechnicalName"
      type="file"
      accept="image/*"
      multiple
      hidden
      @change="onChange"
    >
    <div class="flex flex-wrap gap-5">
      <preview-image
        v-for="(document, index) in documents"
        :key="index"
        class="mt-6"
        :img="document"
        :document-index="index"
        :hide-trash-icon="hideTrashIcon"
        @delete-image="deleteImage"
      />
    </div>
    <div class="mt-3 lg:hidden">
      <button-base
        class="max-w-xs ml-0 mx-auto bg-blue-second"
        label="Cargar archivos"
        :disabled="disabledMainButton"
        @click="onClickButton"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import ButtonBase from './ButtonBase.vue'
import PreviewImage from './PreviewImage.vue'
/* import CheckBoxBase from './CheckBoxBase.vue' */

export default {
  components: { ButtonBase, PreviewImage, /* CheckBoxBase */ },
  props: {
    documentName: {
      type: String,
      default: '',
    },
    documentTechnicalName: {
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
    required: {
      type: Boolean,
      default: true,
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
    reapplyDocument: {
      type: Boolean,
      default: false,
    },
    disabledMainButton: {
      type: Boolean,
      default: false,
    },
    hideTrashIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'reapply'],
  setup(props, { emit }) {

    const images = reactive([...props.documents.map((document) => ({ url: document, file: null }))])

    const checkBox = ref(props.reapplyDocument)

    const onClickButton = () => document.getElementById(props.documentTechnicalName).click()

    const onChange = ({ target }) => {
      for (let i = 0; i < target.files.length; i++) {
        let file = target.files[i]
        images.push({
          url: URL.createObjectURL(file),
          file,
        })
      }
      emit('change', { images, documentIndex: props.documentIndex })
    }

    const deleteImage = (index) => {
      images.splice(index, 1)
      emit('change', { images, documentIndex: props.documentIndex })
    }

    const onReapplyDocument = (value) => {
      emit('reapply', { value, documentIndex: props.documentIndex })
    }

    return { onClickButton, onChange, deleteImage, onReapplyDocument, checkBox }
  },
}
</script>
