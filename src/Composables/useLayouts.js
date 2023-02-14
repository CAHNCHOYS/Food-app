import MainLayout from "@/Layouts/MainLayout.vue";
import LoginRegisterLayout from "@/Layouts/LoginRegisterLayout.vue";
import CheckoutLayout from "@/Layouts/CheckoutLayout.vue";
import { computed } from "@vue/reactivity";

export const useLayouts = (route) => {
  const layouts = {
    Main: MainLayout,
    Login: LoginRegisterLayout,
    Checkout: CheckoutLayout,
  };



  
  const getLayout = computed(() => {
    console.log("CHANGING" + route.meta.layout);
    return layouts[route.meta.layout || "Main"];
  });




  

  return { getLayout };
};
