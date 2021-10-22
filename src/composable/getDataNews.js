const API_News = {
  method: 'GET',
  url: 'https://mmo-games.p.rapidapi.com/latestnews',
  headers: {
    'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

export { API_News };