export const fetchData = async (link, settings={}) => {
   
  const fetchLink = "https://sushi-backend-henna.vercel.app";
    // https://sushi-backend-henna.vercel.app
  //http://localhost:3000;

  try {
    let res = await fetch(fetchLink + link, settings);

    let json = await res.json();

    return json;
  } catch (err) {
    console.log(err);
    return { err };
  }
};
