<template>
  <div class="checkout-info">
    <div class="checkout-info__items" v-if="userCartStore.cartItems.length">
      <div class="checkout-info__body" v-if="!isSuccessfulOrder">
        <div class="checkout-info__title">Ваши данные</div>

        <vForm
          @submit="commitOrder"
          @invalid-submit="invalidSubmit"
          :validation-schema="getCurrentFormSchema"
          class="checkout-info__form checkout-form"
        >
          <div class="checkout-form__row">
            <div class="checkout-form__col">
              <div class="checkout-form__elements">
                <div class="checkout-form__element">
                  <vField
                    name="phone"
                    type="text"
                    placeholder="Телефон"
                    class="checkout-form__input"
                  >
                  </vField>
                  <ErrorMessage
                    name="phone"
                    class="checkout-form__wrong-input"
                  ></ErrorMessage>
                </div>
                <div class="checkout-form__element">
                  <div class="checkout-form__tabs form-tab">
                    <ul class="form-tab__tab-menu">
                      <li v-for="tab in paymentsTypeTabs">
                        <span
                          @click="currentPaymentTab = tab.tabNumber"
                          class="form-tab__button"
                          :class="[
                            tab.icon,
                            tab.tabNumber === currentPaymentTab ? 'active' : '',
                          ]"
                          >{{ tab.text }}</span
                        >
                      </li>
                    </ul>

                    <div class="form-tab__all-tabs">
                      <div class="form-tab__tab" v-if="currentPaymentTab === 1">
                        <div class="checkout-form__elements">
                          <div class="checkout-form__elem-row">
                            <label class="checkout-form__checkbox">
                              <input type="checkbox" v-model="isChange" />
                              <div
                                class="checkout-form__checkbox-emulator"
                              ></div>
                              <div class="checkout-form__checkbox-text">
                                Подготовить сдачу с
                              </div>
                            </label>

                            <div class="checkout-form__input-col">
                              <vField
                                name="change"
                                type="text"
                                placeholder="Сумма"
                                :disabled="!isChange"
                                class="checkout-form__input"
                              >
                              </vField>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="form-tab__tab" v-if="currentPaymentTab === 2">
                        <div class="checkout-form__elements">
                          <div class="checkout-form__element">
                            <vField
                              name="card"
                              type="number"
                              placeholder="Номер карты"
                              class="checkout-form__input"
                            >
                            </vField>
                            <ErrorMessage
                              name="card"
                              class="checkout-form__wrong-input"
                            >
                            </ErrorMessage>
                          </div>

                          <div class="checkout-form__elem-row">
                            <div class="checkout-form__elem-col">
                              <vField
                                name="cvv"
                                type="number"
                                placeholder="cvv"
                                class="checkout-form__input"
                              >
                              </vField>
                              <ErrorMessage
                                name="cvv"
                                class="checkout-form__wrong-input"
                              >
                              </ErrorMessage>
                            </div>
                            <div class="checkout-form__elem-col">
                              <vField
                                name="cv"
                                type="number"
                                placeholder="cv"
                                class="checkout-form__input"
                              >
                              </vField>
                              <ErrorMessage
                                name="cv"
                                class="checkout-form__wrong-input"
                              >
                              </ErrorMessage>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="checkout-form__element">
                  <vField
                    name="comment"
                    type="text"
                    as="textarea"
                    placeholder="Комментарий к заказу"
                    class="checkout-form__textarea"
                  >
                  </vField>
                </div>

                <div class="checkout-form__element">
                  <vField
                    name="promo"
                    type="text"
                    placeholder="Промокод(если есть)"
                    class="checkout-form__input"
                  >
                  </vField>

                  <ErrorMessage name="promo" class="checkout-form__wrong-input">
                  </ErrorMessage>
                </div>

                <div class="checkout-form__element"></div>
              </div>
            </div>
            <div class="checkout-form__col">
              <div class="checkout-form__tabs form-tab">
                <ul class="form-tab__tab-menu">
                  <li v-for="tab in MethodsTabs">
                    <span
                      @click="currentMethodType = tab.tabNumber"
                      class="form-tab__button"
                      :class="[
                        tab.tabNumber === currentMethodType ? 'active' : '',
                      ]"
                      >{{ tab.text }}</span
                    >
                  </li>
                </ul>

                <div class="form-tab__all-tabs">
                  <div class="form-tab__tab" v-if="currentMethodType === 1">
                    <div class="checkout-form__elements">
                      <div class="checkout-form__grid">
                        <div
                          class="checkout-form__grid-col checkout-form__grid-col_big"
                        >
                          <vField
                            name="street"
                            type="text"
                            placeholder="Улица"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="street"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                        <div class="checkout-form__grid-col">
                          <vField
                            name="house"
                            type="number"
                            placeholder="Дом"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="house"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                        <div class="checkout-form__grid-col">
                          <vField
                            name="flat"
                            type="number"
                            placeholder="Кв."
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="flat"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                        <div class="checkout-form__grid-col">
                          <vField
                            name="floor"
                            type="number"
                            placeholder="Этаж"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="floor"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>

                        <div class="checkout-form__grid-col">
                          <vField
                            name="entrance"
                            type="number"
                            placeholder="Подъезд"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="entrance"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                        <div class="checkout-form__grid-col">
                          <vField
                            name="code"
                            type="number"
                            placeholder="Почт. код"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="code"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-tab__tab" v-if="currentMethodType === 2">
                    <div class="checkout-form__elements">
                      <div class="checkout-form__elem-row">
                        <div class="checkout-form__elem-col">
                          <vField
                            name="date"
                            type="text"
                            placeholder="Дата прибытия"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="date"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                        <div class="checkout-form__elem-col">
                          <vField
                            name="time"
                            type="text"
                            placeholder="Время прибытия"
                            class="checkout-form__input"
                          >
                          </vField>
                          <ErrorMessage
                            name="time"
                            class="checkout-form__wrong-input"
                          >
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="checkout-form__submit" v-if="!isFormSubmitting">
            <button
              class="btn"
              type="submit"
              :class="{ wiggle: isInvalidSubmit }"
            >
              Оформить заказ
            </button>
          </div>
          <LoadingGif v-if="isFormSubmitting"> </LoadingGif>
          <div class="checkout-form__rights">Оформите заказ ! прямо сейчас</div>
        </vForm>

        <CheckoutDetails
          class="checkout-info__details"
          v-if="windowSizeStore.getSize < 991.98"
        >
        </CheckoutDetails>
      </div>
      <div class="checkout-info__order-done done-order" v-else>
        <div class="done-order__image _ibg">
          <img src="@/assets/Images/PizzaOrder.png" alt="Pizza picture" />
        </div>
        <div class="done-order__text">
          Ваш заказ был успешно оформлен, готовьте деньги!
        </div>
      </div>
    </div>

    <div class="checkout-info__no-items no-items" v-else>
      <div class="no-items__title">
        Невозможно оформить заказ с пустой козиной!
      </div>
      <div class="no-items__button">
        <RouterLink to="/">На главную</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "@vue/reactivity";

import { Form as vForm, Field as vField, ErrorMessage } from "vee-validate";
import { useFormSchemas } from "../Composables/useFormSchemas";

import { useUserCartStore } from "../stores/userCart";
import { useUserAuthStore } from "../stores/userAuth";
import { useWindowSizeStore } from "../stores/windowSize";
import CheckoutDetails from "../components/UserCart/CheckoutDetails.vue";

const userCartStore = useUserCartStore();
const windowSizeStore = useWindowSizeStore();
const userAuthStore = useUserAuthStore();
//Схемы для валидации форм
const {
  orderSchemaCashByCourier,
  orderShemaCardByCourier,
  orderSchemaCashBySelf,
  orderSchemaCardBySelf,
} = useFormSchemas();

//Табы
const currentPaymentTab = ref(1);
const paymentsTypeTabs = ref([
  {
    text: "Наличка",
    icon: "icon-Frame-11",
    tabNumber: 1,
  },
  {
    text: "Карта",
    icon: "icon-credit-cart",
    tabNumber: 2,
  },
]);

const currentMethodType = ref(1);
const MethodsTabs = ref([
  {
    text: "Курьером",

    tabNumber: 1,
  },
  {
    text: "Самовывоз",

    tabNumber: 2,
  },
]);

//Получение разной схемы для валидации формы в зависимости от выбранных табов
const getCurrentFormSchema = computed(() => {
  if (currentMethodType.value === 1 && currentPaymentTab.value === 1) {
    console.log("y");
    return orderSchemaCashByCourier;
  }
  if (currentMethodType.value === 2 && currentPaymentTab.value === 1) {
    console.log("yy");
    return orderSchemaCashBySelf;
  }

  if (currentMethodType.value === 1 && currentPaymentTab.value === 2) {
    console.log("yyy");
    return orderShemaCardByCourier;
  }
  if (currentMethodType.value === 2 && currentPaymentTab.value === 2) {
    console.log("yyyy");
    return orderSchemaCardBySelf;
  }
});

const isChange = ref(false);
const isInvalidSubmit = ref(false);
const isRequestError = ref(false);
const isFormSubmitting = ref(false);
const isSuccessfulOrder = ref(false);

const commitOrder = async (values) => {
  isFormSubmitting.value = true;
  if (values.promo) {
    userCartStore.updateUserPromo(values.promo);
  }

  const commitOrderResult = await userCartStore.commitOrder(
    userAuthStore.currentUser.id
  );

  if (commitOrderResult.length) {
    isSuccessfulOrder.value = true;
  }
  if (commitOrderResult.err) {
    isRequestError.value = true;
    setTimeout(() => (isRequestError.value = false), 2500);
  }

  isFormSubmitting.value = false;
};

const invalidSubmit = ({ values, errors, results }) => {
  isInvalidSubmit.value = true;
  setTimeout(() => (isInvalidSubmit.value = false), 500);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/checkout";
</style>
