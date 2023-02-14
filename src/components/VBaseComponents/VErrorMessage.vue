<template>

   <div class="error">
      <div class="error__image _ibg">
         <img src="@/assets/Images/Err.png" alt="error picture">
      </div>
      <div class="error__text">
         {{ errMessage }}
      </div>

   </div>
</template>

<script setup>
const props = defineProps({
   errMessage: {
      type: [String, Object],
      default: "Произошла ошибка при загрузке данных",
   }
})
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";


.error {



   // .error__image
   &__image {
      padding: 0px 0px 30% 0px;


      img {

         object-fit: contain;
      }

      margin: 0px 0px rem(10) 0px;
   }

   // .error__text

   &__text {
      text-align: center;
      font-size: rem(28);
      line-height: calc(22/20);
      color: crimson;

   }
}
</style>