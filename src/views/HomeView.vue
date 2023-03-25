<template>
  <div class="homepage">
    <HomeSlider />
    <HomeCategories />
    <HomeTabsSliders />
    <HomeInfo />
  </div>
</template>

<script setup>
import HomeCategories from "../components/Home/HomeCategories.vue";
import HomeSlider from "../components/Home/HomeSlider.vue";
import HomeTabsSliders from "../components/Home/HomeTabsSliders.vue";
import HomeInfo from "../components/Home/HomeInfo.vue";
</script>

<style lang="scss">
@import "@/assets/scss/adaptive-value";

.homepage {
  > * {
    padding: 0px 0px rem(70) 0px;

    @media (max-width: #{$mobile+px}) {
      padding: 0px 0px rem(50) 0px;
    }
  }
}
</style>
