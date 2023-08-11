<template>
  <h1></h1>
</template>

<script lang="ts">
export default {
  async middleware({ $api, route, redirect }: any) {
    const res = await $api.get(`/post/${route.params.uin}`)
    redirect(res.data.url)
  },
}
</script>
