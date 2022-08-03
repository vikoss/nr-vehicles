<template>
  <label
    :for="id"
    class="text-blue text-base font-medium block relative"
  >
    {{ label }}
    <textarea
      :id="id"
      :name="id"
      class="py-3 px-3.5 rounded-md border border-blue border-solid outline-none text-black text-base font-medium mt-1 w-full focus:border-2 focus:shadow"
      :placeholder="placeholder"
      :value="value ? value : modelValue"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      @input="(event) => $emit('update:modelValue', event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: 'TextareaBase',
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
    modelValue: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    maxlength: {
      type: String,
      default: '100',
    },
    rows: {
      type: String,
      default: '1',
    },
    cols: {
      type: String,
      default: '20',
    },
  },
  emits: ['update:modelValue'],
}
</script>
