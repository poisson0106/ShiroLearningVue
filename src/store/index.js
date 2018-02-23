import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lastTouch: '',
    history: [],
    token: '',
    username: '',
    showReLogin: false,
    interuptedUrl: ''
  },
  mutations: {
    updateTouchTime (state) {
      state.lastTouch = new Date()
    },
    updateHistory (state, payload) {
      state.history = payload.history
    },
    updateToken (state, payload) {
      state.token = payload.token
    },
    updateUsername (state, payload) {
      state.username = payload.username
    },
    updateShowReLogin (state, payload) {
      state.showReLogin = payload.showReLogin
    },
    updateInteruptedUrl (state, payload) {
      state.interuptedUrl = payload.interuptedUrl
    }
  }
})

export default store
