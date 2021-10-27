const URL = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const Headers = {
  'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
};

const API_Newcomers = {
  method: 'GET',
  url: URL,
  params: {'sort-by': 'release-date'},
  headers: Headers
};

const API_MostPlayed = {
  method: 'GET',
  url: URL,
  params: {'sort-by': 'popularity'},
  headers: Headers
};

const API_MostPlayedPC = {
  method: 'GET',
  url: URL,
  params: {platform: 'pc', 'sort-by': 'popularity'},
  headers: Headers
};

const API_MostPlayedBrowser = {
  method: 'GET',
  url: URL,
  params: {platform: 'browser', 'sort-by': 'popularity'},
  headers: Headers
};

export { API_Newcomers, API_MostPlayed, API_MostPlayedPC, API_MostPlayedBrowser };