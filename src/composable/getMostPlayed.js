const API_mostPlayed = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {'sort-by': 'popularity'},
  headers: {
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.VUE_APP_API_KEY}`
  }
};

export { API_mostPlayed };