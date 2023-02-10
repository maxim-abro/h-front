<template>
<div class="dark:bg-zinc-900">
  <m-header />
  <Nuxt />
  <m-footer />
</div>
</template>

<script lang="ts">
import MHeader from '~/components/header/MHeader.vue';
import MFooter from '~/components/MFooter.vue';

export default {
  components: {
    MHeader,
    MFooter,
  }
}
</script>
