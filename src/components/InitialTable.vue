<template>
  <div class="px-8">
    <div class="w-full justify-end flex">
      <div class="flex items-center border-b border-b-2 border-green-500 py-2 w-1/3">
        <input
          type="text"
          v-model="typedCountry"
          placeholder="Filtrar por un país"
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          @click="typedCountry = ''"
        >Limpiar</button>
      </div>
    </div>
    <template v-if="filteredCountries.length > 0">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th
              v-for="(header, headerIndex) in tableHeaders"
              :key="headerIndex"
              class="px-4 py-2 cursor-pointer"
              @click="sortBy(header)"
            >{{header.text}}</th>
          </tr>
        </thead>
        <tbody class="overflow-y-scroll w-full" >
          <tr
            v-for="(country, countryIndex) in filteredCountries"
            :key="countryIndex"
            class="font-medium"
            :class="[countryIndex % 2 === 0 ? 'bg-gray-100' : '']"
          >
            <td class="border px-4 py-2 items-center text-left">
              <img
                :src="`https://www.countryflags.io/${country.symbol}/flat/24.png`"
                :alt="`Bandera de `"
                class="inline-block"
              />
              {{country.nameEs}}
            </td>
            <td class="border px-4 py-2">{{country.totalCases}}</td>
            <td class="border px-4 py-2 text-red-700">{{country.totalDeaths}}</td>
            <td class="border px-4 py-2 text-green-700">{{country.totalRecovered}}</td>
            <td class="border px-4 py-2 text-orange-600">{{country.seriousCases}}</td>
            <td class="border px-4 py-2 text-orange-400">{{country.currentInfected}}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <div
      class="w-full text-center pt-4"
      v-else
    >¡Lo sentimos! No logramos ubicar el país que escribió</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FETCH_INITIAL_DETAILS } from "@/store/actions.type";
import { CountryInterface } from "../models/CountryInterface";
type TableHeader = {
  text: string;
  isFilterable: boolean;
  isFiltered: boolean;
  property: string;
};
export default Vue.extend({
  data() {
    return {
      tableHeaders: [
        {
          text: "País",
          isFilterable: true,
          isFiltered: false,
          property: "nameEs"
        },
        {
          text: "Total confirmados",
          isFilterable: true,
          isFiltered: false,
          property: "totalCases"
        },
        {
          text: "Total de muertos",
          isFilterable: true,
          isFiltered: false,
          property: "totalDeaths"
        },
        {
          text: "Recuperados",
          isFilterable: true,
          isFiltered: false,
          property: "totalRecovered"
        },
        {
          text: "En condición crítica",
          isFilterable: true,
          isFiltered: false,
          property: "seriousCases"
        },
        {
          text: "Actualmente contagiados",
          isFilterable: true,
          isFiltered: false,
          property: "currentInfected"
        }
      ],
      countriesList: [] as Array<CountryInterface>,
      typedCountry: ""
    };
  },
  methods: {
    async fetchInitialData() {
      const status = await this.$store.dispatch(FETCH_INITIAL_DETAILS);
      if (status < 400) this.countriesList = this.countries;
    },
    sortBy(type: TableHeader): void {
      if (type.isFilterable) {
        const prop: keyof CountryInterface = type.property as keyof CountryInterface;
        this.countriesList = this.countriesList.sort(
          (first: CountryInterface, second: CountryInterface) => {
            return type.isFiltered
              ? first[prop] < second[prop]
                ? -1
                : second[prop] < first[prop]
                ? 1
                : 0
              : first[prop] > second[prop]
              ? -1
              : second[prop] > first[prop]
              ? 1
              : 0;
          }
        );
        type.isFiltered = !type.isFiltered;
      }
    }
  },
  computed: {
    countries(): Array<CountryInterface> {
      return this.$store.state.countries;
    },
    filteredCountries(): Array<CountryInterface> {
      const newFilteredCountries = this.typedCountry
        ? this.countries.filter(
            country =>
              country.nameEs.includes(this.typedCountry) ||
              country.name.includes(this.typedCountry)
          )
        : this.countries;
      return newFilteredCountries;
    }
  },
  mounted() {
    this.fetchInitialData();
  }
});
</script>

<style scoped>
</style>