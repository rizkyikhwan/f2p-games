const API_Newcomers = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {'sort-by': 'release-date'},
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

const API_MostPlayed = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {'sort-by': 'popularity'},
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

const API_MostPlayedPC = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {platform: 'pc', 'sort-by': 'popularity'},
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

const API_MostPlayedBrowser = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {platform: 'browser', 'sort-by': 'popularity'},
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

export { API_Newcomers, API_MostPlayed, API_MostPlayedPC, API_MostPlayedBrowser };