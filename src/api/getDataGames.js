const api_url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const filter_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/filter";
const gameSpecific_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/game";
const Headers = {
  "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  "x-rapidapi-key": `${process.env.VUE_APP_API_KEY}`,
};

const recentAdd = {
  method: "GET",
  url: api_url,
  params: { "sort-by": "release-date" },
  headers: Headers,
};

const mostPlay = {
  method: "GET",
  url: api_url,
  params: { "sort-by": "popularity" },
  headers: Headers,
};

const mostPlayOnPC = {
  method: "GET",
  url: api_url,
  params: { platform: "pc", "sort-by": "popularity" },
  headers: Headers,
};

const mostPlayOnBrowser = {
  method: "GET",
  url: api_url,
  params: { platform: "browser", "sort-by": "popularity" },
  headers: Headers,
};

const allGames = {
  method: "GET",
  url: api_url,
  headers: Headers,
};

export {
  recentAdd,
  mostPlay,
  mostPlayOnPC,
  mostPlayOnBrowser,
  allGames,
  api_url,
  filter_URL,
  gameSpecific_URL,
  Headers,
};
