const URL = "https://mmo-games.p.rapidapi.com/latestnews";
const Headers =  {
  'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
  'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
}


const API_News = {
  method: 'GET',
  url: URL,
  headers: Headers
};

export { API_News };