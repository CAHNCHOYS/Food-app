import * as yup from "yup";

export const useFormSchemas = () => {
  const userEditSchema = yup.object({
    email: yup
      .string()
      .required("Поле обязательное для ввода")
      .email("Введите правильный email!"),
    name: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(5, "В имени должно быть больше символов"),
    phone: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(6, "В телефоне должно быть больше цифр"),
  });

  const registerSchema = yup.object({
    name: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(4, "Поле должно иметь 4 символов минимум"),
    email: yup
      .string()
      .required("Поле обязательное для ввода")
      .email("Введите правильный email!"),
    phone: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(6, "Введите правильный номер телефона")
      .max(18, "Слишком большой номер телефона"),
    password: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(4, "Поле должно иметь 4 символов минимум"),
    passwordRepeat: yup
      .string()
      .required("Поле обязательное для ввода")
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  });

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Поле обязательное для ввода!")
      .email("Введите правильный email"),
    password: yup
      .string()
      .required("Поле обязательное для ввода!")
      .min(4, "Поле должно иметь 4 символов минимум"),
  });

  const searchSchema = yup.object({
    search: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(1, "Поле должно содержать больше символов"),
    categories: yup
      .array()
      .required("Выберете хотя бы одну категорию")
      .min(1, "Выберете хотя бы одну категорию"),
  });

  const orderSchemaCashByCourier = yup.object({
    phone: yup
      .string()
      .required("Обязательное поле для ввода")
      .min(8, "В номере телефона должно быть больше цифр")
      .max(18, "Слишком много символов!"),
    change: yup.string().optional(),
    comment: yup.string().optional(),
    promo: yup
      .string()
      .optional("КАКОГО")
      .min(2, "Промокод должен содеражать больше символов!"),
    street: yup
      .string()
      .required("Введите улицу")
      .min(4, "Введите улицу корректно"),
    house: yup
      .number("Введите число")
      .required("Номер дома")
      .positive("Введите пол. число"),
    floor: yup
      .number("Введите число")
      .required("Введите этаж")
      .positive("Введите пол. число"),
    code: yup
      .number("Введите число")
      .required("Введите почт. код")
      .positive("Введите пол. число"),

    entrance: yup
      .number("Введите число")
      .required("Номер подъезда")

      .positive("Введите пол. число"),
    flat: yup
      .number("Введите число")
      .required("Номер квартиры")
      .positive("Введите пол. число"),
  });

  const orderShemaCardByCourier = yup.object({
    phone: yup
      .string()
      .required("Обязательное поле для ввода")
      .min(8, "В номере телефона должно быть больше цифр")
      .max(18, "Слишком много символов!"),
    cvv: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),
    card: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),
    cv: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),
    comment: yup.string().optional(),
    promo: yup
      .string()
      .optional()
      .min(2, "Промокод должен содеражать больше символов!"),
    street: yup
      .string()
      .required("Введите улицу")
      .min(4, "Введите улицу корректно"),
    house: yup
      .number("Введите число")
      .required("Номер дома")

      .positive("Введите пол. число"),
    floor: yup.number().required("Введите этаж").positive("Введите пол. число"),
    code: yup
      .number("Введите число")
      .required("Введите почт. код")
      .positive("Введите пол. число"),

    entrance: yup
      .number("Введите число")
      .required("Номер подъезда")

      .positive("Введите пол. число"),
    flat: yup
      .number("Введите число")
      .required("Номер квартиры")
      .positive("Введите пол. число"),
  });

  const orderSchemaCashBySelf = yup.object({
    phone: yup
      .string()
      .required("Обязательное поле для ввода")
      .min(8, "В номере телефона должно быть больше цифр")
      .max(18, "Слишком много символов!"),
    comment: yup.string().optional(),
    promo: yup
      .string()
      .optional()
      .min(2, "Промокод должен содеражать больше символов!"),
    date: yup
      .date()
      .required("Поле обязательное для ввода!")
      .min(new Date(), "Введите корректную дату"),

    time: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(3, "Введите корректное время"),
  });

  const orderSchemaCardBySelf = yup.object({
    phone: yup
      .string()
      .required("Обязательное поле для ввода")
      .min(8, "В номере телефона должно быть больше цифр")
      .max(18, "Слишком много символов!"),

    cvv: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),
    card: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),
    cv: yup
      .number()
      .required("Поле обязательное для ввода!")
      .integer()
      .positive("Введите положительное число!"),

    comment: yup.string().optional(),
    promo: yup
      .string()
      .optional()
      .min(2, "Промокод должен содеражать больше символов!"),
    date: yup
      .date()
      .required("Поле обязательное для ввода!")
      .min(new Date(), "Введите корректную дату"),
    time: yup
      .string()
      .required("Поле обязательное для ввода")
      .min(3, "Введите корректное время"),
  });

  return {
    registerSchema,
    searchSchema,

    loginSchema,
    orderSchemaCashByCourier,
    orderSchemaCashBySelf,
    orderShemaCardByCourier,
    orderSchemaCardBySelf,
    userEditSchema,
  };
};
