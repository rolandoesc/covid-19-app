<template>
  <div>
    <initial-stats />
    <initial-table />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InitialStats from "@/components/global/InitialStats.vue";
import InitialTable from "@/components/global/InitialTable.vue";

export default Vue.extend({
  components: {
    InitialStats: InitialStats,
    InitialTable: InitialTable
  }
});
</script>

<style scoped>
</style>