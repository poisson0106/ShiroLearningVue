import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lastTouch: '',
    history: [],
    token: []
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
    }
  }
})

export default store
