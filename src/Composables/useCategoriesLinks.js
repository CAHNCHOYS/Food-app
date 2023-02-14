import { ref } from "vue";

export const useCategories = () => {
  //Меню категорий
  const pcCategories = ref([
    {
      categoryText: "Чикен",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Losos.jpg",
      isBigColumn: true,
      categoryLink: "Курица",
    },
    {
      categoryText: "С угрем",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Ygr.jpg",
      isBigColumn: false,
      categoryLink: "Корн доги",
    },
    {
      categoryText: "Корн дог",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/CornDogs.jpg",
      isBigColumn: false,
      categoryLink: "Корн доги",
    },
    {
      categoryText: "Пицца",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Pizza.jpg",
      isBigColumn: true,
      categoryLink: "Пиццы",
    },
    {
      categoryText: "Акции",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Sales.jpg",
      isBigColumn: true,
      categoryLink: "Sales",
    },
    
  ]);

  //На телефонах меню слева перходит в иконки на главной странице
  const mobileCategoires = ref([
    {
      categoryText: "Супы",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Soups.jpg",

      categoryLink: "Супы",
    },
    {
      categoryText: "Напитки",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Drinks.jpg",

      categoryLink: "Напитки",
    },
    {
      categoryText: "Роллы",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Rolls.jpeg",

      categoryLink: "Роллы",
    },
    {
      categoryText: "Салаты",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Salads.jpg",

      categoryLink: "Салаты",
    },
    {
      categoryText: "Суши",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Sushi.jpg",

      categoryLink: "Суши",
    },
    {
      categoryText: "WOK",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Wok.jpg",

      categoryLink: "Wok",
    },
    {
      categoryText: "Сеты",
      picture:
        "https://sushi-backend-henna.vercel.app/CategoriesPreview/Sets.jpg",

      categoryLink: "Сеты",
    },
  ]);

  return {mobileCategoires, pcCategories}
};
