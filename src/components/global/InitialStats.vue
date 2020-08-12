<template>
  <div class="px-8 flex justify-center">
    <div class="flex xs:flex-col">
        <div class="border p-4">
          <h2 class="font-medium">Casos Totales: {{worldStats.totalCases}}</h2>
        </div>
        <div class="border p-4 text-orange-500">
          <h2 class="font-medium">Casos Críticos: {{worldStats.seriousCases}}</h2>
        </div>

      
        <div class="border p-4 text-green-500">
          <h2 class="font-medium">Total de Recuperados: {{worldStats.totalRecovered}}</h2>
        </div>
        <div class="border p-4 text-red-500">
          <h2 class="font-medium">Total de Fallecidos: {{worldStats.totalDeaths}}</h2>
        </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    worldStats() {
      return this.$store.state.worldStats;
    }
  }
});
</script>

<style scoped>
</style>