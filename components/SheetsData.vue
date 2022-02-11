<template>
  <div class="flex justify-center">
    <div v-if="allHandhelds < 1">
      <div>loading ...</div>
    </div>
    <div class="md:w-full lg:w-2/3 2xl:w-1/2 flex flex-col" v-else>
      <div class="flex flex-col items-center">
        <div class="flex flex-row">
          <div class="w-16 flex justify-center">
            <button v-if="pageNumber > 0" @click="previous()">
              <span>Previous</span>
            </button>
          </div>
          <div class="w-16 flex justify-center">
            <button v-if="pageNumber < pageMax" @click="next()">
              <span>Next</span>
            </button>
          </div>
        </div>
        <div>Page {{ pageNumber + 1 }} of {{ pageMax + 1 }}</div>
      </div>

      <div
        class="flex flex-col justify-center sm:flex-row items-start items-center sm:items-start"
      >
        <HandheldChoices />

        <div class="flex flex-col w-2/3">
          <HandheldSingleList
            v-for="(value, index) in currentPageItems"
            :key="index"
            :value="value"
          />
        </div>
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
    ...mapGetters(["allHandhelds", "filtered_items"]),

    /* Sliced den Handheld-Array auf 10 pro Seite */
    currentPageItems() {
      return this.filtered_items.slice(
        this.pageNumber * this.perpage,
        this.pageNumber * this.perpage + this.perpage
      );
    },
    pageMax() {
      return Math.round(this.filtered_items.length / 10) - 1;
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
