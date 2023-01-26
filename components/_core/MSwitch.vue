<template>
  <div class="flex justify-between items-center" @click="checked = !checked">
    <div class="w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer" :class="{ 'bg-primary-500': checked}">
      <div class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out flex justify-center items-center" :class="{ 'translate-x-6': checked}">
        <fa v-if='checked' icon='moon' class='text-primary'/>
        <fa v-if='!checked' icon='sun' class='text-primary'/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checked: false
    }
  },
  props: {
    checkedProps: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    this.checked = this.checkedProps
  }
}
</script>
