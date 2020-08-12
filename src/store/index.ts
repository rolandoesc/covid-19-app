import Vue from 'vue'
import Vuex from 'vuex'
import {
  FETCH_INITIAL_DETAILS,
  ADD_NEW_FIELDS,
  CHECK_SELECTED_COUNTRY
} from './actions.type'
import {
  SET_INITIAL_DETAILS,
  SET_SELECTED_COUNTRY
} from './mutations.type'
import ApiService from '@/common/api.service'
import { CountryInterface } from '@/models/CountryInterface'
import router from '@/router'
// import { WorldStatsInterface} from '@/models/WorldStatsInterface'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    worldStats: {},
    countries: [],
    selectedCountry: {}
  },
  actions: {
    async [FETCH_INITIAL_DETAILS](context) {
      try {
        const { data, status } = await ApiService.get('');
        console.log(data, status)
        const worldStats = data.filter((el: any): any => el.slug === 'total')
        const countriesList = data.filter((el: any) => el.slug !== 'total')
        context.dispatch(ADD_NEW_FIELDS, { countriesList, worldStats })
        return status
        // context.commit(SET_INITIAL_DETAILS, data)
      } catch (error) {
        console.log(error)
        return error.response.status
      }
    },
    [ADD_NEW_FIELDS](context, data) {
      data.data = data.countriesList.map((country: CountryInterface) => {
        const deadAndRecovered = country.totalDeaths + country.totalRecovered;
        country.currentInfected = country.totalCases - deadAndRecovered;
        // const initialCases = country.totalCases - country.totalCases24h;
        // console.log('totalCase', country.totalCases)
        // console.log('totalCase24h', country.totalCases24h)
        // console.log('initialCases', initialCases)
        // console.log('totalCase24h * 100', country.totalCases24h * 100)
        // country.growthPercentage = ((country.totalCases24h * 100) / initialCases).toFixed(2);
        return country;
      })
      context.commit(SET_INITIAL_DETAILS, data)
    },
    [CHECK_SELECTED_COUNTRY](context, country) {
      context.commit(SET_SELECTED_COUNTRY, country)
      router.push({
        path: country.slug+'/stats'
      })
    }
  },
  mutations: {
    [SET_INITIAL_DETAILS](state, { countriesList, worldStats }) {
      state.countries = countriesList;
      state.worldStats = worldStats[0];
    },
    [SET_SELECTED_COUNTRY](state, country) {
      state.selectedCountry = country
    }
  },
  modules: {
  }
})
