<template>
  <button
    @click="$emit('click', $event)"
    :type="type"
    :disabled="disabled"
    :class="getColor"
    class="rounded text-second block p-2"
  >
    <slot/>
  </button>
</template>

<script lang="ts">

export default {
  data() {
    return {
      primary: ''
    }
  },
  props: {
    color: {
      default: 'primary',
      type: String,
    },
    type: {
      default: 'button',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    getColor():string {
      //@ts-ignore
      if (this.color === 'primary') {
        //@ts-ignore
        if (!this.disabled) {
          return 'bg-primary hover:bg-primary-300 focus:bg-primary-700'
        } else {
          return 'bg-primary-200'
        }
      } else {
        return 'bg-primary'
      }
    }
  }
}
</script>
