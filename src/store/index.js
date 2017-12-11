import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lastTouch: '',
    history: []
  },
  mutations: {
    updateTouchTime (state) {
      state.lastTouch = new Date()
    },
    updateHistory (state, payload) {
      state.history = payload.history
    }
  }
})

export default store
