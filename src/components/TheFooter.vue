<template>
  <footer class="footer">
    <div class="footer__body">
      <div class="footer__row">
        <div class="footer__column" v-if="windowSizeStore.getSize > 767.98">
          <ul class="footer__list">
            <li>
              <router-link to="/" class="footer__link">О компании</router-link>
            </li>
            <li>
              <router-link to="/" class="footer__link"
                >Доставка и оплата</router-link
              >
            </li>
            <li>
              <router-link to="/" class="footer__link"
                >Лента материалов</router-link
              >
            </li>
            <li>
              <router-link to="/" class="footer__link"
                >Политика возврата</router-link
              >
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <div class="footer__title">
            <span v-if="windowSizeStore.getSize > 767.98">Мы в соц сетях </span>
            <span class="message" v-else>
              Выберите удобный мессенджер для общения
            </span>
          </div>

          <ul class="footer__social-list">
            <li>
              <a href="" class="footer__social-link">
                <img src="@/assets/Images/Footer/WhatsUp.svg" alt="WhatsUp" />
              </a>
            </li>
            <li>
              <a href="" class="footer__social-link">
                <img src="@/assets/Images/Footer/telegram.svg" alt="WhatsUp" />
              </a>
            </li>
            <li>
              <a href="" class="footer__social-link"
                ><img src="@/assets/Images/Footer/inst.svg" alt="inst"
              /></a>
            </li>
          </ul>
        </div>
        <div class="footer__column">
          <div class="footer__info">
            <p>
              <span>Тел:</span
              ><a href="tel:+79493816513" class="footer__mobile-phone">
                +777 777 777 77
              </a>
            </p>
            <p>
              <span>Тел:</span
              ><a href="tet:+79493522310" class="footer__mobile-phone">
                +999 99 999 99</a
              >
            </p>
            <p>Адрес: адрес 12</p>
          </div>
        </div>
      </div>
      <div class="footer__info-author">
        <div class="footer__git">
          <a href="https://github.com/CAHNCHOYS/Food-app">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useWindowSizeStore } from "../stores/windowSize";

const windowSizeStore = useWindowSizeStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.footer {
  // .footer__body
  &__body {
    padding: 0px 110px 0px 110px;

    @media (max-width: 1700px) {
      padding: 0px 50px 0px 50px;
    }

    @media (max-width: #{$container+px}) {
      padding: 0px 15px 15px 15px;
    }
    @media (max-width: #{$mobile+px}) {
      padding: 0px 15px rem(80) 15px;
    }
  }

  // .footer__row
  &__row {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #a4acad;
    column-gap: 10px;
    > *:not(:last-child) {
      border-right: rem(1) solid #a4acad;
    }
    @media (max-width: #{$mobile+px}) {

      padding: 10px 0px 0px 0px;
      flex-direction: column;
      > *:not(:last-child) {
        border-right: none;
      }
      row-gap: rem(30);
    }
  }

  // .footer__column

  &__column {
    padding: rem(30) 0px rem(30) 0px;
    flex: 1 1 calc(33.333% - 10px);

    > *:last-child {
      margin-bottom: 0px;
    }

    @media (max-width: #{$mobile+px}) {
      flex: 0 1 auto;
      text-align: center;
      padding: 0px 0px 0px 0px;
    }

    @media (max-width: #{$mobileSmall+px}) {
      flex: 1 1 100%;
     
      text-align: center;
    }
  }

  // .footer__list

  &__list {
    > li:not(:last-child) {
      margin-bottom: rem(10);
    }
  }

  // .footer__link

  &__link {
    transition: color 0.5s ease 0s;

    color: inherit;

    @media (any-hover: hover) {
      &:hover {
        color: coral;
      }
    }
  }

  // .footer__title

  &__title {
    text-align: center;
    font-size: rem(22);
    margin-bottom: rem(30);
    font-weight: 500;
    line-height: calc(28 / 24);

    @media (max-width: #{$tablet+px}) {
      margin-bottom: rem(10);
    }
    span.message {
      font-size: rem(18);
      line-height: calc(22/18 * 100%);
      color: #a4acad;
      display: block;
      margin: 0px 0px rem(15) 0px;
    }
  }

  // .footer__social-list

  &__social-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 10px;
    justify-content: center;

    @media (max-width: 1600px) {
      column-gap: 15px;
    }
  }

  // .footer__social-link
  &__social-link {
    transition: all 0.5s ease 0s;
    opacity: 0.24;

    img {
      max-width: 100%;
    }

    @media (any-hover: hover) {
      &:hover {
        opacity: 1;
      }
    }

    @media (max-width: #{$tablet+px}) {
      opacity: 1;
    }
  }

  // .footer__info-author

  &__info {
    color: #a4acad;
    @media(min-width: #{$tablet+px}){ 
      padding: 0px 0px 0px rem(30);
    }
    
 
  }

  // .footer__mobile-phone

  &__mobile-phone {
    color: inherit;
    line-height: calc(22 / 18);
    text-decoration: underline;
    transition: color 0.5s ease 0s;

    @media (any-hover: hover) {
      &:hover {
        color: indianred;
      }
    }
  }

  // .footer__info-author

  &__info-author {
    text-align: center;
    padding: 5px 0px 5px 0px;
    @media(max-width: #{$mobile+px}){
        
  
    }
  }

  // .footer__author

  &__author {
    color: black;
  }

  // .footer__git

  &__git {
    a {
      font-size: rem(18);
      font-weight: 500;
      color: indianred;
      transition: all 0.5s ease 0s;

      @media (any-hover: hover) {
        &:hover {
          color: rgb(252, 29, 29);
        }
      }
    }
  }
}
</style>
