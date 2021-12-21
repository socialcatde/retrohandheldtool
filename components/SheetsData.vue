<template>
  <div>
    <h1>Handhelds</h1>
    <div v-if="allHandhelds < 1">
      <div>loading ...</div>
    </div>
    <div v-else>
      <HandheldSingleFull
        v-for="(value, index) in allHandhelds"
        :key="index"
        :value="value"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters(["allHandhelds"]),
    formFactor() {
      return this.allHandhelds.map((a) => a["Form Factor"]);
    },
    handheldBrand() {
      return this.allHandhelds.map((a) => a["Brand"]);
    },
  },

  created() {
    this.fetchAllHandhelds();
  },

  methods: {
    ...mapActions(["fetchAllHandhelds"]),
  },
};
</script>

<style scoped></style>
