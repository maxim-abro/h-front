<template>
<div class="dark:bg-zinc-900">
  <m-header :holiday="$store.state.header.holiday"/>
  <Nuxt />
  <m-footer />
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MWZ6V8X"
            height="0" width="0" style="display:none;visibility:hidden">
    </iframe>
  </noscript>
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
