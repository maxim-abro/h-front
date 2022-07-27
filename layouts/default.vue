<template>
  <div>
    <m-header />

    <div class="container flex flex-col lg:flex-row mt-3 sm:mt-10">
      <main class="w-full lg:w-9/12 mr-0 lg:mr-4 mb-10 lg:mb-0">
        <horizontal-ad
          url="/shop/23c470a9-aeae-4d38-a526-ba3f3a9a243c"
          img="https://za-halyavoi.ru/api/static/1c798e24-569f-497b-87ff-20ad5433a611.jpg"
        />
        <Nuxt/>
      </main>

      <aside class="w-full lg:w-3/12 mr-0 lg:ml-3">
        <m-aside class="mb-10"/>
        <m-popular-aside :popular="$store.state.aside.popular"  class="mb-10"/>
        <m-popular-categories-aside :popularCategories="$store.state.aside.popularCategories"/>

        <aside-ad
          img="https://za-halyavoi.ru/api/static/aside.png"
          url="/shop/22a4cc24-f0b1-4334-8181-c206a4180c96"
        />
      </aside>
    </div>

    <m-footer />
    <m-popup-coupon />
  </div>
</template>

<script lang="ts">
import MPopupCoupon from "~/components/popups/MPopupCoupon.vue";
import MPopularAside from "~/components/aside/MPopularAside.vue";

export default {
  components:{MPopularAside, MPopupCoupon},
  async created() {
    //@ts-ignore
    // await this.$store.dispatch('aside/getPopularPosts')
  }
}
</script>
