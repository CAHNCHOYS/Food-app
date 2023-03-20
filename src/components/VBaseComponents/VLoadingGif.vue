<template>
  <div class="loading-comp">
    <div class="loading-comp__gif _ibg" v-if="bgColor === 'gray'">
      <img src="@/assets/Images/spinner.gif" alt="LoadingGif">
    </div>
    <div class="loading-comp__gif _ibg" v-else>
      <img src="@/assets/Images/Loading2.gif" alt="LoadingGif">
    </div>


  </div>
</template>

<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: 'gray',
  }
})



</script>

<style lang="scss" scoped>
.loading-comp {

  // .loading-comp__gif

  &__gif {
    padding: 0px 0px 30% 0px;

    img {
      object-fit: contain;
    }
  }
}
</style>