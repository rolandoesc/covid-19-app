<template>
  <div>
    <country-table />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import CountryTable from '@/components/country/CountryTable.vue'
  export default Vue.extend({
    components: {
      CountryTable: CountryTable
    }
  })
</script>

<style scoped>

</style>