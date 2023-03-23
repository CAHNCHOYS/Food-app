//Уменьшить кот в main.js
import SlideUpDown from "vue3-slide-up-down";
import VueAwesomePaginate from "vue-awesome-paginate";
import VueLazyLoad from "vue3-lazyload";

import SingleProduct from "./components/SingleProduct.vue";
import VSiteInfo from "./components/VBaseComponents/VSiteInfo.vue";
import vCustomSelect from "./components/VBaseComponents/vCustomSelect.vue";
import VLoadingGif from "./components/VBaseComponents/VLoadingGif.vue";
import VErrorMessage from "./components/VBaseComponents/VErrorMessage.vue";
import VAlert from './components/VBaseComponents/VAlert.vue';

import VGoBackButton from "./components/VBaseComponents/VGoBackButton.vue";



export const global = {
    SlideUpDown,
    SingleProduct,
    VueLazyLoad,
    VSiteInfo,
    VAlert,
    VErrorMessage,
    VGoBackButton,
    VLoadingGif,
    vCustomSelect,
    VueAwesomePaginate,
    VueLazyLoad,
}
