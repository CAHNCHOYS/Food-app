<template>
  <div class="not-found">
    <div class="not-found__body">
      <div class="not-found__decor not-found__decor_1">
        <img src="../assets/Images/404/decor1.svg" alt="circle decor" />
      </div>

      <div class="not-found__decor not-found__decor_2">
        <img src="../assets/Images/404/decor1.svg" alt="circle decor" />
      </div>
      <div class="not-found__decor back not-found__decor_3">
        <img src="../assets/Images/404/decor1.svg" alt="circle decor" />
      </div>
      <div class="not-found__decor not-found__decor_4">
        <img src="../assets/Images/404/decor2.svg" alt="circle big decor" />
      </div>
      <div class="not-found__decor not-found__decor_5">
        <img src="../assets/Images/404/decor2.svg" alt="circle big decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_6"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor not-found__decor_combined not-found__decor_7"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor not-found__decor_combined not-found__decor_8"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_9"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_10"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor not-found__decor_combined not-found__decor_11"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_12"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor not-found__decor_combined not-found__decor_13"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_14"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div
        class="not-found__decor back not-found__decor_combined not-found__decor_15"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>
      <div
        class="not-found__decor not-found__decor_combined not-found__decor_16"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>
      <div
        class="not-found__decor not-found__decor_combined not-found__decor_17"
      >
        <img src="../assets/Images/404/decor3.svg" alt="crest" />
        <img src="../assets/Images/404/decor4.svg" alt="star decor" />
      </div>

      <div class="not-found__decor back not-found__decor_18">
        <img src="@/assets/Images/404/planetDecor.svg" alt="decor planet" />
      </div>

      <div class="not-found__decor not-found__decor_19">
        <img src="@/assets/Images/404/smallPlanet.svg" alt="decor planet" />
      </div>

      <div class="not-found__content">
        <div class="not-found__row">
          <div class="not-found__number">4</div>
          <div class="not-found__picture-col">
            <div class="not-found__astronaut">
              <img
                src="@/assets/Images/404/Astronaut.svg"
                alt="Astronaut Picture"
              />
            </div>
            <div class="not-found__spaceship">
              <img src="@/assets/Images/404/Spaceship.svg" alt="Spaceship" />
            </div>

            <div class="not-found__planet _ibg">
              <img src="@/assets/Images/404/planet.svg" alt="PlanetPicture" />
            </div>
          </div>

          <div class="not-found__number">4</div>
        </div>

        <div class="not-found__text">
          Упс, произошла ошибка. Не удалось найти страницу (
        </div>
        <div class="not-found__button">
          <RouterLink to="/">На главную</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

onMounted(() => {
  let elem = document.querySelector(".not-found");
  let bg = document.querySelectorAll(".not-found__decor");
  for (let i = 0; i < bg.length; i++) {
    elem.addEventListener("mousemove", function (e) {
      console.log("MOVING");
      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;
      if (bg[i].classList.contains("back")) {
        bg[i].style.transform = "translate(" + x * 10 + "px, " + y * 10 + "px)";
      } else {
        bg[i].style.transform =
          "translate(-" + x * 10 + "px, -" + y * 10 + "px)";
      }
    });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap");

.not-found {
  font-family: "Rubik", sans-serif;
  min-height: 100vh;
  display: flex;

  overflow: hidden;

  // .not-found__body
  &__body {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  // .not-found__decor

  &__decor {
    position: absolute;
    z-index: 1;

    // .not-found__decor_combined

    &_combined {
      height: 40px;
      width: 40px;

      img {
        position: absolute;
      }

      img:first-child {
        top: 50%;
        display: inline-block;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    // .not-found__decor_1
    &_1 {
      top: percent(575, 1024);
      left: percent(227, 1440);
    }

    // .not-found__decor_2

    &_2 {
      top: percent(674, 1024);
      left: percent(676, 1440);
    }

    // .not-found__decor_3

    &_3 {
      top: percent(98, 1024);
      left: percent(1006, 1440);
    }

    &_4 {
      top: percent(932, 1024);
      left: percent(767, 1440);
    }

    &_5 {
      top: percent(408, 1024);
      left: percent(1173, 1440);
    }

    &_6 {
      top: percent(641, 1024);
      left: percent(895, 1440);
    }

    &_7 {
      top: percent(850, 1024);
      left: percent(252, 1440);
    }

    &_8 {
      top: percent(340, 1024);
      left: percent(501, 1440);
    }

    &_9 {
      top: percent(0, 1024);
      left: percent(601, 1440);
      transform: translate(0, -30%);
    }

    &_10 {
      top: percent(207, 1024);
      left: percent(222, 1440);
    }

    &_11 {
      top: percent(275, 1024);
      left: percent(848, 1440);
    }

    &_12 {
      top: percent(902, 1024);
      left: percent(698, 1440);
    }

    &_13 {
      top: percent(656, 1024);
      left: percent(408, 1440);
    }

    &_14 {
      top: percent(15, 1024);
      left: percent(316, 1440);
    }

    &_15 {
      top: percent(304, 1024);
      left: percent(1272, 1440);
    }

    &_16 {
      top: percent(579, 1024);
      left: percent(1126, 1440);
    }

    &_17 {
      top: percent(569, 1024);
      left: percent(131, 1440);
    }

    &_18 {
      top: percent(109, 1024);
      left: percent(134, 1440);
    }

    &_19 {
      right: 0;
      top: percent(580, 1440);
    }
  }

  // .not-found__content
  &__content {
    flex: 1 1 auto;
    max-width: rem(536);
    position: relative;
    z-index: 3;
    padding: 0px 10px 0px 10px;
  }

  // .not-found__row

  &__row {
    display: flex;
    align-items: center;
    margin: 0px 0px rem(30) 0px;
    column-gap: 5px;
    justify-content: center;

    @media (max-width: #{$tablet+px}) {
      margin: 0px 0px rem(10) 0px;
    }
  }

  // .not-found__number

  &__number {
    font-weight: 900;
    font-size: rem(200);
    line-height: calc(237 / 200);
    color: #263238;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(120);
    }
  }

  // .not-found__picture-col

  &__picture-col {
    flex: 0 1 269px;
    position: relative;
  }

  // .not-found__spaceship

  &__spaceship {
    position: absolute;
    z-index: 2;
    right: 0px;
    top: 15%;
  }

  // .not-found__astronaut

  &__astronaut {
    position: absolute;
    width: 142.59px;
    height: 157.76px;

    z-index: 4;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    top: 0%;
    right: 0px;
    transform: translate(-20%, -92%) rotate(-11.92deg);

    @media (max-width: #{$mobileSmall+px}) {
      transform: translate(5%, -92%) rotate(-11.92deg);
    }
  }

  // .not-found__planet

  &__planet {
    padding: 0px 0px calc(266 / 255 * 100%) 0px;
    border-radius: 50%;

    overflow: hidden;
    z-index: 3;
    animation: 5s linear 0s normal none infinite running round;
  }

  // .not-found__text

  &__text {
    font-weight: 500;
    font-size: rem(24);
    line-height: calc(28 / 24);
    text-align: center;

    color: #263238;
    @include adaptive-value("margin-bottom", 130, 30);
  }

  // .not-found__button

  &__button {
    text-align: center;

    a {
      min-height: rem(58);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      background-color: #e66070;
      border-radius: rem(10);
      transition: all 0.5s ease 0s;

      @media (any-hover: hover) {
        &:hover {
          background-color: #f8223b;
        }
      }

      padding: 0px rem(50) 0px rem(50);

      color: white;
      font-weight: 700;

      @media (max-width: #{$tablet+px}) {
        padding: 0px rem(20) 0px rem(20);
      }
    }
  }
}

@keyframes round {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
