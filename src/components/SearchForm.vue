<template>
    <vForm @submit="formSubmit" :validation-schema="formSchema" action="" class="search-form">
        <div class="search-form__header">
            <vField placeholder="Название товара: " type="text" name="search" class="search-form__input"></vField>
            <ErrorMessage as="div" name="search" class="search-form__wrong-data"></ErrorMessage>
        </div>

        <div class="search-form__bottom">
            <div class="search-form__title">
                Искать по категориям:
            </div>
            <div class="search-form__radio-columns">
                <div class="search-form__radio-column">
                    <div class="search-form__all-labels">
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Напитки"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Напитки</div>

                        </label>
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Пиццы"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Пиццы</div>
                        </label>
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="WOK"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Wok</div>

                        </label>


                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Корн доги"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Корн доги</div>

                        </label>







                    </div>


                </div>

                <div class="search-form__radio-column">
                    <div class="search-form__all-labels">
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Суши"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Роллы</div>

                        </label>
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Роллы"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Суши</div>
                        </label>
                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Салаты"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Салаты</div>

                        </label>

                        <label class="search-form__label">
                            <vField name="categories" type="checkbox" value="Супы"> </vField>
                            <div class="search-form__checkbox-emulator"></div>
                            <div class="search-form__elem-text">Супы</div>

                        </label>






                    </div>


                </div>
            </div>
            <ErrorMessage as="div" style="margin-bottom:15px" name="categories" class="search-form__wrong-data">
            </ErrorMessage>


            <button type="submit" class="search-form__submit">
                Искать !
            </button>


        </div>


    </vForm>
</template>

<script setup>
import * as yup from "yup";
import { Form as vForm, Field as vField, ErrorMessage } from "vee-validate";

import { useRoute, useRouter } from 'vue-router';
const emit = defineEmits(['closeForm']);

const router = useRouter();
const route = useRoute();



const formSchema = yup.object({
    search: yup
        .string()
        .required("Поле обязательное для ввода")
        .min(1, "Поле должно содержать больше символов"),
    categories: yup.array().required("Выберете хотя бы одну категорию").min(1, "Выберете хотя бы одну категорию"),
});





const formSubmit = (values) => {
    console.log(values);


    router.push({
        name: 'category-page', params: {
            category:  "Поиск по товарам",
        }, query: {
            searchProduct: values.search,
            searchCategories: values.categories.join(','),
        }
    });

    emit('closeForm');




}
</script>









<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";


.search-form {
    color: white;

    // .search-form__header
    &__header {
        margin: 0px 0px rem(10) 0px;
    }

    // .search-form__input

    &__input {
        height: rem(40);
        padding: 0px rem(15);
        font-size: rem(20);

        &::placeholder {
            color: gray;
            font-size: rem(18);
        }

        &:focus {
            border: rem(1) solid lightgreen;
        }

        width: 100%;
    }

    // .search-form__wrong-data

    &__wrong-data {
        font-size: rem(20);
        line-height: 1.1;
        margin: rem(5) 0px 0px 0px;
        font-weight: 500;
        color: rgb(243, 95, 124);

        @media(max-width: #{$mobile+px}) {
            color: yellow;
        }

    }

    // .search-form__bottom

    &__bottom {}

    // .search-form__title

    &__title {
        text-align: center;
        font-size: rem(24);
        margin: 0px 0px rem(15) 0px;
    }

    // .search-form__radio-columns

    &__radio-columns {
        display: flex;
        column-gap: 10px;
        margin: 0px 0px rem(15) 0px;

    }

    // .search-form__radio-column

    &__radio-column {
        flex: 1 1 50%;
    }

    // .search-form__all-labels

    &__all-labels {
        display: flex;
        flex-direction: column;
        row-gap: rem(10);
    }

    // .search-form__label

    &__label {
        cursor: pointer;
        display: flex;
        column-gap: 8px;
        align-items: center;

        input[type='checkbox'] {
            appearance: none;

            &:checked+.search-form__checkbox-emulator {
                &::before {
                    opacity: 1;
                    visibility: visible;

                }
            }
        }
    }

    // .search-form__checkbox-emulator

    &__checkbox-emulator {
        flex: 0 0 rem(15);
        height: rem(15);
        background-color: white;

        position: relative;

        &::before {
            content: '';
            position: absolute;
            width: rem(9);

            height: rem(9);
            top: rem(3);
            left: rem(3);
            opacity: 0;
            visibility: hidden;

            display: block;

            background-color: coral;

        }

    }

    // .search-form__elem-text

    &__elem-text {
        font-size: rem(16);
    }

    // .search-form__submit

    &__submit {
        display: inline-flex;
        margin: 0 auto;
        min-height: rem(45);
        align-items: center;
        justify-content: center;
        padding: 0px rem(15);
        font-size: rem(20);
        background-color: cornflowerblue;
        transition: all 0.5s ease 0s;
        color: white;


        @media (any-hover:hover) {
            &:hover {
                background-color: rgb(52, 118, 240);
            }
        }

        @media(max-width: #{$mobile+px}) {
            background-color: coral;

            @media (any-hover:hover) {
                &:hover {
                    background-color: rgb(250, 89, 30);
                }
            }
        }
    }
}
</style>
