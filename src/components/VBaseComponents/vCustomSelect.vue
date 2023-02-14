<template>

   <div class="custom-select">
      <div class="custom-select__header icon-arrow-down" :style="{ 'background-color': props.backgroundColor }"
         :class="{ rotate: isToggled, border: props.border }" @click="isToggled = !isToggled">

         <p class="custom-select__label"> {{ defaultTitle }} </p>
         <p> {{ selectedItem }}</p>
      </div>


      <div class="custom-select__options" :style="{ 'background-color': props.backgroundColor }"
         :class="{ abs: props.absolute, border: props.border }">
         <slide-up-down v-model="isToggled" :duration="500">
            <div class="custom-select__option" v-for="option in options" :key="option" @click="changeValue(option)">
               <p :class="{ selected: option === selectedItem }"> {{ option }}</p>
            </div>
         </slide-up-down>
      </div>







   </div>



</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
   options: Array,
   defaultTitle: String,
   border: {
      type: Boolean,
      default: false,
   },
   backgroundColor: {
      type: String,
      default: 'white',
   },
   absolute: {
      type: Boolean,
      default: false,
   }
});

const emit = defineEmits(["updateValue"]);


const isToggled = ref(false);


const selectedItem = ref(props.options[0] || "Не переданы options");
const changeValue = option => {
   selectedItem.value = option;
   emit('updateValue', selectedItem.value);
}




</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.custom-select {

   position: relative;

   // .custom-select__header
   &__header {
      font-size: rem(18);
      flex-direction: column;
      line-height: 1.2;
      min-height: rem(55);
      cursor: pointer;
      display: flex;
    
      justify-content: center;

      color: black;
      padding: rem(5) rem(28) rem(5) rem(16);
      position: relative;

      &::before {
         position: absolute;
         display: block;
         top: 50%;
         transition: all 0.5s ease 0s;
         right: rem(5);
         transform: translate(0, -50%);
         font-size: rem(18);
         color: black;
      }

      &.rotate {
         &::before {
            transform: translate(0, -50%) rotate(-180deg);
         }

         &.border {
            border-bottom: 1px solid lightgrey;
         }
      }


      &.border {
         border-top-left-radius: rem(7);
         border-top-right-radius: rem(7);

      }
   }



   &__label {
      color: rgb(128, 127, 127);
   }

   // .custom-select__options
   &__options {


      max-height: 300px;
      overflow: auto;

      &.border {
         border-bottom-left-radius: rem(7);
         border-bottom-right-radius: rem(7);
      }



      &.abs {
         position: absolute;
         width: 100%;
         height: auto;
         z-index: 10;
         top: 100%;
         left: 0;
      }
   }

   // .custom-select__option

   &__option {

      padding: rem(12) rem(20) rem(12) rem(20);
      cursor: pointer;


      font-size: rem(16);

      p.selected {
         color: cornflowerblue;
      }

      transition: all 0.5s ease 0s;
      line-height: 1.3;

      &:hover {
         color: cornflowerblue !important;

      }

      &:not(:last-child) {
         border-bottom: rem(1) solid lightgrey;
      }
   }
}
</style>