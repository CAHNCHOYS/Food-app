import { ref } from "vue";

export const useFormActions = () => {

    
  const isInvalidFormSubmit = ref(false);

  //Контроль только цифр пробела и Backspace в поле номер телефона
  const phoneControl = (event) => {
    console.log(event.key);
    if (
      !(
        (event.key >= "0" && event.key <= "9") ||
        event.key == "+" ||
        event.key == "Backspace" ||
        event.key == "(" ||
        event.key == ")" ||
        event.key == "-" ||
        event.key == "ArrowLeft" ||
        event.key == "ArrowRight" ||
        event.key == "Delete" ||
        event.key == "Tab" ||
        event.key == " "
      )
    ) {
      event.preventDefault();
    }
  };

  const toggleFocus = ($event) => {
    $event.target.closest(".action-form__input-body").classList.add("focused");
  };

  const toggleBlur = ($event) => {
    $event.target
      .closest(".action-form__input-body")
      .classList.remove("focused");
  };


  const invalidSubmit = ({ values, errors, results }) => {
    isInvalidFormSubmit.value = true;
    setTimeout(() => {
      isInvalidFormSubmit.value = false;
    }, 800);
  };

  return { phoneControl, toggleBlur, toggleFocus, invalidSubmit, isInvalidFormSubmit };
};
