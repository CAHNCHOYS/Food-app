import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import SlideUpDown from "vue3-slide-up-down";
import ProductsSlider from "./components/ProductsSlider.vue";
import SingleProduct from "./components/SingleProduct.vue";

import VueLazyLoad from "vue3-lazyload";
import VSiteInfo from "./components/VBaseComponents/VSiteInfo.vue";
import vCustomSelect from "./components/VBaseComponents/vCustomSelect.vue";
import VLoadingGif from "./components/VBaseComponents/VLoadingGif.vue";
import VErrorMessage from "./components/VBaseComponents/VErrorMessage.vue";

import VGoBackButton from "./components/VBaseComponents/VGoBackButton.vue";

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";
// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
app.use(createPinia());
app.use(VueAwesomePaginate);
app.use(router);
app.use(VueLazyLoad, {});

app.component("VSiteInfo", VSiteInfo);
app.component("VCustomSelect", vCustomSelect);
app.component("VErrorMessage", VErrorMessage);
app.component("VGoBackButton", VGoBackButton);


app.component("LoadingGif", VLoadingGif);
app.component("slide-up-down", SlideUpDown);
app.component("SingleProduct", SingleProduct);
app.component("ProductsSlider", ProductsSlider);

app.mount("#app");
