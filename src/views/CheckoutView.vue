<template>
    <div class="checkout-info">
        <div class="checkout-info__items" v-if="userCartStore.cartItems.length">
            <div class="checkout-info__body" v-if="!isSuccessfulOrder">
                <div class="checkout-info__title">Ваши данные</div>

                <vForm @submit="commitOrder" @invalid-submit="invalidSubmit" :validation-schema="getCurrentFormSchema"
                    class="checkout-info__form checkout-form">
                    <div class="checkout-form__row">
                        <div class="checkout-form__col">
                            <div class="checkout-form__elements">
                                <div class="checkout-form__element">
                                    <vField name="phone" type="text" placeholder="Телефон" class="checkout-form__input">
                                    </vField>
                                    <ErrorMessage name="phone" class="checkout-form__wrong-input"></ErrorMessage>
                                </div>
                                <div class="checkout-form__element">
                                    <div class="checkout-form__tabs form-tab">
                                        <ul class="form-tab__tab-menu">
                                            <li v-for="tab in paymentsTypeTabs">
                                                <span @click="currentPaymentTab = tab.tabNumber"
                                                    class="form-tab__button" :class="[
                                                        tab.icon,
                                                        tab.tabNumber === currentPaymentTab ? 'active' : '',
                                                    ]">{{ tab.text }}</span>
                                            </li>
                                        </ul>

                                        <div class="form-tab__all-tabs">
                                            <div class="form-tab__tab" v-if="currentPaymentTab === 1">
                                                <div class="checkout-form__elements">
                                                    <div class="checkout-form__elem-row">
                                                        <label class="checkout-form__checkbox">
                                                            <input type="checkbox" v-model="isChange" />
                                                            <div class="checkout-form__checkbox-emulator"></div>
                                                            <div class="checkout-form__checkbox-text">
                                                                Подготовить сдачу с
                                                            </div>
                                                        </label>

                                                        <div class="checkout-form__input-col">
                                                            <vField name="change" type="text" placeholder="Сумма"
                                                                :disabled="!isChange" class="checkout-form__input">
                                                            </vField>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-tab__tab" v-if="currentPaymentTab === 2">
                                                <div class="checkout-form__elements">
                                                    <div class="checkout-form__element">
                                                        <vField name="card" type="number" placeholder="Номер карты"
                                                            class="checkout-form__input">
                                                        </vField>
                                                        <ErrorMessage name="card" class="checkout-form__wrong-input">
                                                        </ErrorMessage>
                                                    </div>

                                                    <div class="checkout-form__elem-row">
                                                        <div class="checkout-form__elem-col">
                                                            <vField name="cvv" type="number" placeholder="cvv"
                                                                class="checkout-form__input">
                                                            </vField>
                                                            <ErrorMessage name="cvv" class="checkout-form__wrong-input">
                                                            </ErrorMessage>
                                                        </div>
                                                        <div class="checkout-form__elem-col">
                                                            <vField name="cv" type="number" placeholder="cv"
                                                                class="checkout-form__input">
                                                            </vField>
                                                            <ErrorMessage name="cv" class="checkout-form__wrong-input">
                                                            </ErrorMessage>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="checkout-form__element">
                                    <vField name="comment" type="text" as="textarea" placeholder="Комментарий к заказу"
                                        class="checkout-form__textarea">
                                    </vField>
                                </div>

                                <div class="checkout-form__element">
                                    <vField name="promo" type="text" placeholder="Промокод(если есть)"
                                        class="checkout-form__input">
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
                                        <span @click="currentMethodType = tab.tabNumber" class="form-tab__button"
                                            :class="[
                                                tab.tabNumber === currentMethodType ? 'active' : '',
                                            ]">{{ tab.text }}</span>
                                    </li>
                                </ul>

                                <div class="form-tab__all-tabs">
                                    <div class="form-tab__tab" v-if="currentMethodType === 1">
                                        <div class="checkout-form__elements">
                                            <div class="checkout-form__grid">
                                                <div class="checkout-form__grid-col checkout-form__grid-col_big">
                                                    <vField name="street" type="text" placeholder="Улица"
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="street" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                                <div class="checkout-form__grid-col">
                                                    <vField name="house" type="number" placeholder="Дом"
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="house" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                                <div class="checkout-form__grid-col">
                                                    <vField name="flat" type="number" placeholder="Кв."
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="flat" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                                <div class="checkout-form__grid-col">
                                                    <vField name="floor" type="number" placeholder="Этаж"
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="floor" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>

                                                <div class="checkout-form__grid-col">
                                                    <vField name="entrance" type="number" placeholder="Подъезд"
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="entrance" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                                <div class="checkout-form__grid-col">
                                                    <vField name="code" type="number" placeholder="Почт. код"
                                                        class="checkout-form__input"> </vField>
                                                    <ErrorMessage name="code" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-tab__tab" v-if="currentMethodType === 2">
                                        <div class="checkout-form__elements">
                                            <div class="checkout-form__elem-row">
                                                <div class="checkout-form__elem-col">
                                                    <vField name="date" type="text" placeholder="Дата прибытия"
                                                        class="checkout-form__input">
                                                    </vField>
                                                    <ErrorMessage name="date" class="checkout-form__wrong-input">
                                                    </ErrorMessage>
                                                </div>
                                                <div class="checkout-form__elem-col">
                                                    <vField name="time" type="text" placeholder="Время прибытия"
                                                        class="checkout-form__input">
                                                    </vField>
                                                    <ErrorMessage name="time" class="checkout-form__wrong-input">
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
                        <button class="btn" type="submit" :class="{ wiggle: isInvalidSubmit }">Оформить заказ</button>
                    </div>
                    <LoadingGif v-if="isFormSubmitting"> </LoadingGif>
                    <div class="checkout-form__rights">
                        Оформите заказ ! прямо сейчас

                    </div>
                </vForm>


                <CheckoutDetails class="checkout-info__details" v-if="windowSizeStore.getSize < 991.98">

                </CheckoutDetails>



            </div>
            <div class="checkout-info__order-done done-order" v-else>
                <div class="done-order__image _ibg">
                    <img src="@/assets/Images/PizzaOrder.png" alt="Pizza picture">
                </div>
                <div class="done-order__text">
                    Ваш заказ был успешно оформлен, готовьте деньги!
                </div>

            </div>
        </div>

        <div class="checkout-info__no-items no-items" v-else>
            <div class="no-items__title"> Невозможно оформить заказ с пустой козиной! </div>
            <div class="no-items__button">
                <RouterLink to="/">На главную</RouterLink>
            </div>


        </div>




    </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { Form as vForm, Field as vField, ErrorMessage } from "vee-validate";
import { configure } from "vee-validate";

import { ref } from "vue";
import { useFormSchemas } from "../Composables/useFormSchemas";

import { useUserCartStore } from '../stores/userCart';
import { useWindowSizeStore } from "../stores/windowSize";
import CheckoutDetails from '../components/UserCart/CheckoutDetails.vue';



const userCartStore = useUserCartStore();
const windowSizeStore = useWindowSizeStore();


// Default values
configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
    validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
    validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
    validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

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
    console.log(values);
    isFormSubmitting.value = true;

    if (values.promo) {
        userCartStore.updateUserPromo(values.promo);
    }

    const commitOrderResult = await userCartStore.commitOrder();


    if (commitOrderResult.length) {
        isSuccessfulOrder.value = true;
    }
    if (commitOrderResult.err) {
        isRequestError.value = true;
        setTimeout(() => isRequestError.value = false, 2500);
    }


    isFormSubmitting.value = false;
};




const invalidSubmit = ({ values, errors, results }) => {
    console.log(values); // current form values
    console.log(errors); // a map of field names and their first error message
    console.log(results); // a detailed map of field names and their validation results
    isInvalidSubmit.value = true;
    setTimeout(() => isInvalidSubmit.value = false, 500);
}




</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.checkout-info {





    // .checkout-info__body
    &__body {}

    // .checkout-info__title

    &__title {
        font-size: rem(24);
        line-height: calc(30 / 24);
        margin: 0px 0px rem(20) 0px;
        font-weight: 500;
    }

    // .checkout-info__form
    &__form {
        &:not(:last-child) {
            margin: 0px 0px rem(20) 0px;
        }

    }
}




.checkout-form {


    // .checkout-form__row
    &__row {

        column-gap: 40px;
        margin: 0px 0px rem(20) 0px;

        @media(max-width: #{$tablet+px}) {
            column-gap: 20px;
        }


        @media(min-width: 550px) {
            display: flex;
            margin: 0px 0px 0px 0px;
        }
    }

    // .checkout-form__col

    &__col {
        flex: 1 1 calc(50% - 40px);

        @media(max-width: #{$tablet+px}) {
            flex: 1 1 calc(50% - 20px);
        }
    }

    // .checkout-form__elements

    &__elements {
        display: flex;
        flex-direction: column;
        row-gap: rem(20);
    }

    &__wrong-input {
        color: crimson;
        margin: rem(5) 0px 0px 0px;
    }

    // .checkout-form__element

    &__element {}

    // .checkout-form__input

    &__input {
        height: rem(40);
        width: 100%;

        background: #ffffff;
        font-size: rem(18);
        color: black;
        border-radius: rem(5);
        padding: 0px rem(10);

        &::placeholder {
            color: #a4acad;
            font-size: rem(18);
        }

        &:disabled {
            opacity: 0.5;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &:focus {
            border: rem(1) solid lightgray;
        }
    }

    // .checkout-form__tabs

    &__tabs {}

    // .checkout-form__elem-row

    &__elem-row {
        display: flex;
        // align-items: center;
        column-gap: 20px;
    }

    // .checkout-form__checkbox

    &__checkbox {
        flex: 1 1 390px;
        display: flex;
        align-items: center;
        column-gap: 5px;
        cursor: pointer;

        input[type="checkbox"] {
            appearance: none;

            &:checked+.checkout-form__checkbox-emulator::before {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    // .checkout-form__checkbox-emulator

    &__checkbox-emulator {
        flex: 0 0 rem(20);
        height: rem(20);
        background-color: white;
        border-radius: 50%;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            transition: all 0.5s ease 0s;

            width: rem(10);
            background-color: coral;
            height: rem(10);
            opacity: 0;
            visibility: hidden;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
            border-radius: 50%;
        }
    }

    // .checkout-form__checkbox-text

    &__checkbox-text {}

    // .checkout-form__input-col

    &__input-col {}

    // .checkout-form__elem-col

    &__elem-col {
        flex: 1 1 calc(50% - 20px);
    }



    // .checkout-form__grid

    &__grid {
        display: grid;
        gap: rem(20);
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));

        @media(max-width: 550px) {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }



    }

    // .checkout-form__grid-col

    &__grid-col {


        // .checkout-form__grid-col_big
        &_big {
            grid-column-start: span 3;

            @media(max-width: 550px) {
                grid-column-start: span 1;
            }
        }
    }





    // .checkout-form__textarea
    &__textarea {
        @extend .checkout-form__input;

        resize: vertical;
        padding: rem(15);

        min-height: 100px;
        max-height: 500px;
    }

    // .checkout-form__submit

    &__submit {
        button {
            display: flex;
            width: 100%;
            transition: all 0.5s ease 0s;

            &.wiggle {
                animation: shake 0.5s infinite;
                background-color: crimson;
            }
        }

        margin: 0px 0px rem(10) 0px;
    }

    // .checkout-form__rights

    &__rights {
        font-size: rem(14);
        line-height: calc(17 / 14);
        text-align: center;

        a {
            color: inherit;
            text-decoration: underline;
            transition: all 0.5s ease 0s;

            @media (any-hover: hover) {
                &:hover {
                    color: coral;
                }
            }
        }
    }

    // .checkout-info__order-done

    &__order-done {}

    // .checkout-info__no-items

    &__no-items {}
}

.form-tab {
    // .form-tab__tab-menu

    &__tab-menu {
        display: flex;
        overflow: hidden;
        align-items: stretch;

        >li {
            flex: 1 1 50%;
        }

        margin: 0px 0px rem(20) 0px;
    }

    // .form-tab__button

    &__button {
        height: 100%;
        display: flex;

        cursor: pointer;
        min-height: rem(40);
        padding: rem(5) rem(30) rem(5) rem(30);

        @media(max-width: #{$tablet+px}) {}

        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        background: #ffffff;
        z-index: 3;
        position: relative;
        transition: all 0.5s ease 0s;

        &::before {
            transition: all 0.5s ease 0s;
            position: absolute;
            top: 50%;
            left: rem(10);
            transform: translate(0, -50%);
            display: block;
            font-size: rem(18);

            @media(max-width: #{$tablet+px}) {
                left: rem(8);
            }
        }

        @media (any-hover: hover) {
            &:hover {
                background-color: #ff9846;
                color: white;

                &::before {
                    color: white;
                }
            }
        }

        &.active {
            background-color: #ff9846;
            color: white;

            &::before {
                color: white;
            }
        }
    }

    // .form-tab__all-tabs

    &__all-tabs {}

    // .form-tab__tab

    &__tab {}
}




.no-items {

    // .no-items__title

    &__title {
        font-size: rem(42);
        color: crimson;
        margin: 0px 0px rem(20) 0px;
        text-align: center;
    }

    // .no-items__button

    &__button {
        a {
            min-height: rem(70);
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            border-radius: rem(7);
            background-color: indianred;
            color: white;
            font-size: rem(38);
            transition: all 0.5s ease 0s;

            @media (any-hover:hover) {
                &:hover {
                    background-color: rgb(245, 123, 123);
                }
            }

        }
    }
}





.done-order {

    // .done-order__image

    &__image {
        max-width: rem(500);

        padding: 0px 0px 70% 0px;
        margin: 0px auto rem(20) auto;
        transition: all 0.5s ease 0s;
        border-radius: 50%;
        overflow: hidden;
        animation: 2s linear 0s normal none infinite running rot;

    }

    // .done-order__text

    &__text {
        text-align: center;
        font-size: rem(32);
        color: violet;
        font-weight: 500;
        line-height: 1.3;
    }
}


@keyframes rot {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}




@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}
</style>
