<template>
  <label :for="id" class="text-wine text-base font-medium block">
    {{ label }}
    <select
      :id="id"
      :name="id"
      class="border rounded h-11 pl-3.5 pr-8 w-full mt-1 border-wine border-solid outline-none
        text-base text-black appearance-none bg-no-repeat bg-white cursor-pointer
        disabled:font-medium focus:border-2 focus:shadow disabled:bg-gray-300 disabled:cursor-default
        disabled:border-gray-100 disabled:text-gray disabled:opacity-100
      "
      :style="{ 'background-image': `url(${app.svg})` }"
      style="background-position-x: 95%; background-position-y: 15px;"
      :value="modelValue"
      @change="app.onChange"
      :disabled="disabled"
    >
      <option
        v-if="modelValue === 0"
        value="0"
        disabled
        selected
      >
        Selecciona una opción
      </option>
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<script>
import { reactive } from 'vue'
import ArrowBottom from './../assets/svg/arrowBottom.svg'

export default {
  name: 'SelectBase',
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup (ctx, { emit }) {
    const app = reactive({
      svg: ArrowBottom,
      onChange: ({ target }) => emit('update:modelValue', parseInt(target.value)),
    })

    return { app }
  }
}
</script>
