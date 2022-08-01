<template>
  <h1 class="5xl">Скоро здесь будет блог</h1>
</template>

<script lang="ts">

export default {
  head():any {
    return {
      // @ts-ignore
      title: `Блог про шоппинг, промокоды, акции, купоны на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // @ts-ignore
          content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${this.$store.state.seo.month} ${this.$store.state.seo.year} год, а также эксклюзивные купоны. го za халявой!`,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'блог, новости, промокоды, скидки, акции, магазины, акция, промокод, скидка'
        }
      ]
    }
  }
}
</script>
