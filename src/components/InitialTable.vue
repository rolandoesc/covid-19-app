<template>
  <div class="px-8">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Country Flag</th>
          <th class="px-4 py-2">Country</th>
          <th class="px-4 py-2">Today's Cases</th>
          <th class="px-4 py-2">Confirmed Cases</th>
          <th class="px-4 py-2">Today's Deaths</th>
          <th class="px-4 py-2">Total Deaths</th>
          <th class="px-4 py-2">Recovered</th>
          <th class="px-4 py-2">Critical</th>
          <th class="px-4 py-2">Current Infected</th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll w-full" style="height: 50vh;">
        <tr 
          v-for="(country, countryIndex) in countries" 
          :key="countryIndex"
          class="font-medium"
          :class="[countryIndex % 2 === 0 ? 'bg-gray-100' : '']"
        >
          <td class="border px-4 py-2 text-center justify-center">
            <img :src="country.countryInfo.flag" :alt="`${country.country}'s Flag`" width="30"></td>
          <td class="border px-4 py-2">{{country.country}}</td>
          <td class="border px-4 py-2 text-green-700">{{country.todayCases}}</td>
          <td class="border px-4 py-2 text-green-700">{{country.confirmed}}</td>
          <td class="border px-4 py-2 text-red-700">{{country.todayDeaths}}</td>
          <td class="border px-4 py-2 text-red-700">{{country.deaths}}</td>
          <td class="border px-4 py-2">{{country.recovered}}</td>
          <td class="border px-4 py-2 text-orange-600">{{country.critical}}</td>
          <td class="border px-4 py-2 text-orange-400">{{currentInfected(country)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FETCH_INITIAL_DETAILS } from "@/store/actions.type";
import { CountryInterface } from '../models/CountryInterface';
export default Vue.extend({
  methods: {
    fetchInitialData() {
      this.$store.dispatch(FETCH_INITIAL_DETAILS);
    },
    currentInfected(country: CountryInterface): number {
      const deadAndRecovered = country.deaths + country.recovered
      return country.confirmed - deadAndRecovered;
    }
  },
  computed: {
    countries(): Array<CountryInterface> {
      return this.$store.state.countries;
    }
  },
  mounted() {
    this.fetchInitialData();
  }
});
</script>

<style scoped>
</style>