<template>
  <input
    v-model="inputData"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    class="focus:outline-0 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-200 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary"
    :class="
      dark
        ? 'bg-zinc-700 text-zinc-300'
        : 'placeholder-zinc-800 text-zinc-900 bg-gray-200'
    "
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
    @change="$emit('change', $event)"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    name: String,
    inputProp: String,
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputData: '',
    }
  },
  mounted() {
    this.inputData = this.inputProp
  },
}
</script>
