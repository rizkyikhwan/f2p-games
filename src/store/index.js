import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    news: {}
  },
  mutations: {
    setNews(state, data) {
      state.news = data
    }
  }
})