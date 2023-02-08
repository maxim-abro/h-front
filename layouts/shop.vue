<template>
<div class="bg-zinc-900">
  <m-header />
  <Nuxt />
  <m-footer />
</div>
</template>

<script lang="ts">

export default {
  components: {
    MHeader: () => import('~/components/header/MHeader.vue'),
    MFooter: () => import('~/components/MFooter.vue'),
  }
}
</script>
