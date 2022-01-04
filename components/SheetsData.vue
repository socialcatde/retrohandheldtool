<template>
  <div class="flex justify-center">
    <div v-if="allHandhelds < 1">
      <div>loading ...</div>
    </div>
    <div
      class="md:w-full lg:w-2/3 2xl:w-1/2 flex flex-col justify-center sm:flex-row items-start items-center sm:items-start"
      v-else
    >
      <HandheldChoices />
      <div class="flex flex-col w-2/3">
        <HandheldSingleList
          v-for="(value, index) in currentPageItems"
          :key="index"
          :value="value"
        />
      </div>
      <div class="pagination">
        <button v-if="pageNumber > 0" @click="previous()">
          <span>Previous</span>
        </button>
        <button v-if="pageNumber < pageMax" @click="next()">
          <span>Next</span>
        </button>
        <div>Current Page: {{ pageNumber + 1 }}</div>
        <div>Max Page: {{ pageMax + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    perpage: 10,
    pageNumber: 0,
  }),
  computed: {
    ...mapGetters(["allHandhelds"]),

    /* Sliced den Handheld-Array auf 10 pro Seite */
    currentPageItems() {
      return this.allHandhelds.slice(
        this.pageNumber * this.perpage,
        this.pageNumber * this.perpage + this.perpage
      );
    },
    pageMax() {
      return Math.round(this.allHandhelds.length / 10) - 1;
    },
  },

  created() {
    this.fetchAllHandhelds();
  },

  methods: {
    ...mapActions(["fetchAllHandhelds"]),
    next() {
      this.pageNumber++;
    },
    previous() {
      this.pageNumber--;
    },
  },
};
</script>

<style scoped></style>
