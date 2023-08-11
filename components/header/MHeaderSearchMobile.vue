<template>
  <form
    class="w-full absolute p-3 left-0 w-full bg-second z-50"
    @submit.prevent="submitSearch"
  >
    <div class="relative">
      <m-input
        v-model="searchQuery"
        class="p-2 w-full"
        placeholder="поиск товара или сайт"
        type="search"
      />

      <m-header-search v-if="searchShops.length" :shops="searchShops" />
    </div>
  </form>
</template>

<script>
import _ from 'lodash'
import MInput from '~/components/_core/MInput.vue'
import MHeaderSearch from '~/components/header/MHeaderSearch.vue'
export default {
  components: {
    MInput,
    MHeaderSearch,
  },
  data() {
    return {
      searchQuery: '',
      searchShops: [],
    }
  },
  methods: {
    submitSearch() {
      this.$router.push(`/search?q=${this.searchQuery}`)
      this.searchShops = []
      this.searchQuery = ''
      this.$emit('close')
    },
    blurInput() {
      setTimeout(() => {
        this.searchShops = []
      }, 500)
    },
  },
  watch: {
    searchQuery: _.debounce(async function () {
      if (this.searchQuery.length > 2) {
        const response = await this.$api.get(
          `/search?q=${encodeURI(this.searchQuery.toLowerCase())}`
        )

        this.searchShops = response.data
      }
    }, 1000),
  },
}
</script>
