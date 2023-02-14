

<template>





  <SiteLoad v-if="isLoading"> </SiteLoad>
  <component :is="getLayout" v-else>

    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>


    </router-view>


  </component>

</template>




<script setup>
import { useRoute } from 'vue-router';
import { useLayouts } from '@/Composables/useLayouts.js';
import { useWindowSizeStore } from './stores/windowSize';
import { useUserAuthStore } from './stores/userAuth.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { useUserCartStore } from './stores/userCart';
import SiteLoad from './components/SiteLoad.vue';

const route = useRoute();
const isLoading = ref(true);





const userAuthStore = useUserAuthStore();
const userCartStore = useUserCartStore();









//Смена layout в зависимости от routa
const { getLayout } = useLayouts(route);



//Отслеживание изменения ширины экрана ========================================
const windowSizeStore = useWindowSizeStore();
const checkSize = () => {
  windowSizeStore.updateWindowSize(document.documentElement.clientWidth);
}
onMounted(async () => {
  windowSizeStore.updateWindowSize(document.documentElement.clientWidth);
  window.addEventListener('resize', checkSize);



  await userAuthStore.verifyTokenStore();
//Получение товаров в корзине
  if (userAuthStore.checkIfUserLogged) {

    await userCartStore.fetchUserCartProducts();

  }


  isLoading.value = false;

});


onUnmounted(() => {

  window.removeEventListener('resize', checkSize);
})
//================================================================================










</script>
 


<style  lang="scss">
@import "@/assets/adaptive-value.scss";
//Global styles -------------------------------------------------------
@import "@/assets/nullstyle.scss";

//fonts
@import "@/assets/fonts.scss";


@import "@/assets/Ui.scss";

.test {
  font-weight: 200;
  font-size: 24px;
}




html {


  scrollbar-width: thin;
  scrollbar-color: rgb(163, 163, 163) transparent;

  /* для Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    height: 9px;
    width: 9px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;

  }

  &::-webkit-scrollbar-thumb {

    background-color: rgb(163, 163, 163);
    border-radius: 8px;


  }
}

body {
  height: 100%;
  min-height: 100%;
  //Главный шрифт
  font-family: 'Conv_dinpro';

  min-width: 320px;



  &._isLocked {
    overflow: hidden;
  }



  font-size: rem(18);
  color: #000000;
  font-weight: 400;

}

.container {
  //Если верстка с исп относительных единиц

  //Если нет
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 15px;
}

#app {
  display: flex;
  max-width: 100%;
  min-height: 100%;
  flex-direction: column;

  @media(max-width: #{$mobile+px}) {
    overflow: hidden;
  }

}

//---------------------------------------------




//Адаптивные изображения-------------------
._ibg {
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  &_c {
    img {
      object-fit: contain;
    }
  }
}



img[lazy=loading] {

  width: 70%;
  height: 70%;
  object-fit: cover;
  left: 50%;
  display: block;
  top: 50%;
  transform: translate(-50%, -50%);

}

.bg-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

//-------------------------------------

//Фикс свайпера во влексах
* {
  min-width: 0;
}
</style>
