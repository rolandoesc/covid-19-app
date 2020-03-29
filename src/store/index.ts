import Vue from 'vue'
import Vuex from 'vuex'
import {
  FETCH_INITIAL_DETAILS
} from './actions.type'
import {
  SET_INITIAL_DETAILS
} from './mutations.type'
import ApiService from '@/common/api.service'
import { CountryInterface } from '@/models/CountryInterface'
import { WorldStatsInterface } from '@/models/WorldStatsInterface'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worldStats: {},
    countries: []
  },
  actions: {
    async [FETCH_INITIAL_DETAILS](context) {
      try {
        const { data } = await ApiService.get('');
        context.commit(SET_INITIAL_DETAILS, data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    [SET_INITIAL_DETAILS](state, {data, worldStats}) {
      state.countries = data;
      state.worldStats = worldStats;
    }
  },
  modules: {
  }
})
