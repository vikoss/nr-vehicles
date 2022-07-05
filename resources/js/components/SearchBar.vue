<template>
  <div class="bg-gray-100 h-16 py-2 px-9 flex flex-col justify-center" style="box-shadow: 0px 3px 6px #00000029;">
    <div class="bg-white flex rounded-md justify-center items-center">
      <input
        :id="id"
        class="h-10 py-3 px-3.5 rounded-md outline-none text-black text-sm sm:text-base font-medium w-full focus:shadow"
        :class="{'uppercase': isUpperCase, [classInput]: true}"
        :type="type"
        :placeholder="placeholder"
        :value="value ? value : modelValue"
        :autocomplete="autocomplete"
        :maxlength="maxLength"
        :disabled="disabled"
        @input="(event) => $emit('update:modelValue', event.target.value)"
        @keyup.enter="onClick"
      >
      <search-svg class="mr-2 cursor-pointer" @click="onClick" />
    </div>
  </div>
</template>

<script>
import SearchSvg from '../svg/Search.vue'

export default {
  name: 'InputBase',
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    maxLength: {
      type: String,
      default: '100',
    },
    isUpperCase: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    classInput: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'search'],
  components: { SearchSvg },
  setup (ctx, { emit }) {
    const onClick = () => emit('search')

    return { onClick }
  },
}
</script>
