<template>
  <div :class="`${ className } ${showContent ? '' : 'collapsed'}`">
    <component :is="triggerTag" :class="triggerClass" @click="showContent = !showContent">
      <slot name="trigger" />
    </component>

    <transition v-if="animation"
                enter-active-class="duration-500 ease"
                enter-class="overflow-hidden max-h-0"
                enter-to-class="max-h-[500px] overflow-hidden"
                leave-active-class="duration-500 ease-[cubic-bezier(0, 1, 0.5, 1)]"
                leave-class="max-h-[500px] overflow-hidden"
                leave-to-class="overflow-hidden max-h-0"
    >
      <slot name="content" v-if="showContent"/>
    </transition>
    <template v-else>
      <slot name="content" v-if="showContent"/>
    </template>
  </div>

</template>


<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'collapse flex flex-col'
    },
    triggerTag: {
      type: String,
      default: 'div'
    },
    triggerClass: {
      type: String,
      default: ''
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showContent: this.isVisible
    }
  },
  watch: {
    showContent() {
      this.$emit('trigger', this.showContent)
    }
  },
  methods: {
    close() {
      this.showContent = false
    }
  }
}
</script>

<style scoped>
.collapsed .arrow {
  transform: rotate(-180deg)
}
</style>
