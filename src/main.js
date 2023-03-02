import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { global } from "./GlobalComponents.js";

import { configure } from "vee-validate";

//vee-validate
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const app = createApp(App);

app.use(createPinia());
app.use(global.VueAwesomePaginate);
app.use(router);
app.use(global.VueLazyLoad, {});

app.component("VSiteInfo", global.VSiteInfo);
app.component("VCustomSelect", global.vCustomSelect);
app.component("VErrorMessage", global.VErrorMessage);
app.component("VGoBackButton", global.VGoBackButton);
app.component("VAlert", global.VAlert);

app.component("LoadingGif", global.VLoadingGif);
app.component("slide-up-down", global.SlideUpDown);
app.component("SingleProduct", global.SingleProduct);
app.component("ProductsSlider", global.ProductsSlider);

app.mount("#app");
