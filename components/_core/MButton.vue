<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="getColor"
    class="rounded text-second block p-2"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
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
  data() {
    return {
      primary: '',
    }
  },
  computed: {
    getColor(): string {
      // @ts-ignore
      if (this.color === 'primary') {
        // @ts-ignore
        if (!this.disabled) {
          return 'bg-primary hover:bg-primary-300 focus:bg-primary-700'
        } else {
          return 'bg-primary-200'
        }
      } else {
        return 'bg-primary'
      }
    },
  },
}
</script>
