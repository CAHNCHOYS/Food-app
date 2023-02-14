import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "Main",
      },
    },
    {
      path: "/register",
      name: "register",

      component: () => import("../views/RegisterView.vue"),
      meta: {
        layout: "Login",
      },
    },
    {
      path: "/login",
      name: "login",

      component: () => import("../views/LoginView.vue"),
      meta: {
        layout: "Login",
      },

      beforeEnter(to, from) {
        if (localStorage.getItem("token")) {
          return {
            name: "home",
          };
        }
      },
    },
    {
      path: "/account",
      name: "account",

      component: () => import("../views/AccountView.vue"),
      meta: {
        layout: "Main",
      },
      beforeEnter(to, from) {
        if (!localStorage.getItem("token")) {
          return {
            name: "login",
            query: {
              isLoginRequired: true,
              redirect: to.fullPath,
            },
          };
        }
      },
    },
    {
      path: "/cart",
      name: "cart-page",

      component: () => import("../views/CartView.vue"),

      meta: {
        layout: "Main",
      },

      beforeEnter(to, from) {
        if (!localStorage.getItem("token")) {
          return {
            name: "login",
            query: {
              isLoginRequired: true,
              redirect: to.fullPath,
            },
          };
        }
        
        if (document.documentElement.clientWidth > 1312) {
          return false;
        }
      },
    },

    {
      path: "/Products/:name/:id",
      name: "ProductPage",
      component: () => import("../views/ProductView.vue"),
      meta: {
        layout: "Main",
      },
      props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    },

    {
      path: "/Categories/:category",
      name: "category-page",
      component: () => import("../views/CategoryProductsView.vue"),
      meta: {
        layout: "Main",
      },
      props: (route) => ({ category: route.params.category }),
    },

  
    {
      path: "/Reviews",
      name: "reviews-page",
      component: () => import("../views/ReviewsView.vue"),
      meta: {
        layout: "Main",
      },
    },

    {
      path: "/checkout",
      name: "checkout",

      component: () => import("../views/CheckoutView.vue"),

      meta: {
        layout: "Checkout",
      },

      beforeEnter(to, from) {
        if (!localStorage.getItem("token")) {
          return {
            name: "login",
            query: {
              isLoginRequired: true,
              redirect: to.fullPath,
            },
          };
        }
      },
    },

    
    //404 page
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",

      component: () => import("../views/NotFoundPageView.vue"),
      meta: {
        layout: "Login",
      },
    },
  
  ],
  scrollBehavior(to, from, savedPosition) {},
});

// router.beforeEach((to, from)=>{
//   console.log(to);
//   console.log(from);
// })

export default router;
