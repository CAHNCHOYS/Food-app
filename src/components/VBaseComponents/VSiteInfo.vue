<template>
   <div class="site-info">
      <div class="site-info__title">Наш телефон</div>
      <div class="site-info__mobile-phones">
         <p><a href="tel:+79493528425" class="site-info__mobile-phone">+7949 777 88 99</a></p>
         <p><a href="tel:+79493816596" class="site-info__mobile-phone">+7949 999 88 77</a></p>
      </div>
      <div class="site-info__work-time">
         <p class="icon-clock">работаем с 10:00 до 00:00</p>
      </div>



   </div>
</template>

<script setup>

</script>

<style lang="scss">
@import "@/assets/adaptive-value.scss";

.site-info {

   text-align: center;

   // .site-info__title
   &__title {
      margin: 0px 0px rem(0) 0px;
      font-weight: 500;
      line-height: calc(22/18);
   }


   // .site-info__mobile-phones

   &__mobile-phones {
      >*:not(:last-child) {
         margin-bottom: rem(0);
      }

      margin: 0px 0px rem(5) 0px;
   }

   // .site-info__mobile-phone

   &__mobile-phone {
      display: inline-flex;
      transition: color 0.6s ease 0s;
      line-height: 1;
      color: #FF9846;

      @media (any-hover:hover) {
         &:hover {
            color: cornflowerblue;
         }
      }

   }

   // .site-info__work-time

   &__work-time {
      p {
         color: #A4ACAD;
         font-size: rem(14);
         position: relative;
         padding: 0px 0px 0px rem(20);
         font-weight: 500;

         &::before {
            position: absolute;
            display: block;
            left: 0;
            top: 50%;
            color: #FF9846;
            font-size: rem(14);
            transform: translate(0, -50%);
         }
      }
   }
}
</style>