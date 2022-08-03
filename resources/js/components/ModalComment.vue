<template>
  <modal-base :show="show" @closed="closed">
    <div class="py-12 pb-8">
      <div class="flex flex-col items-center md:px-10 lg:px-40">
        <img
          src="./../assets/svg/success.svg"
          alt="Carpeta"
          style="width: 152px;"
        >
        <h5 class="text-base my-4 font-semibold">
          {{ message }}
        </h5>
        <text-area-base
          id="comment-textarea"
          v-model="app.comment"
          label="Comentario:"
          placeholder="Ingresa un comentario"
          maxlength="150"
          rows="3"
          cols="40"
        />
      </div>
      <button-base
        class="max-w-xs mx-auto mt-6"
        label="Agregar"
        :disabled="app.disabled"
        @click="app.send"
      />
    </div>
  </modal-base>
</template>

<script>
import ModalBase from './ModalBase.vue'
import ButtonBase from './ButtonBase.vue'
import TextAreaBase from './TextAreaBase.vue'
import { computed, reactive } from 'vue'

export default {
  components: {
    ModalBase,
    ButtonBase,
    TextAreaBase,
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
    comment: {
      type: String,
      default: '',
    },
    closed: {
      type: Function,
      default: () => {},
    },
  },
  emits: ['handleComment'],
  setup(props, { emit }) {

    const app = reactive({
      comment: props.comment,
      send: () => {
        emit('handleComment', app.comment)
        props.closed()
      },
      disabled: computed(() => !(app.comment.length > 3)),
    })

    return { app }
  },

}
</script>
