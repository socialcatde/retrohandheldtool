<template>
  <div class="border rounded-md p-2 m-1">
    <div>Performance Rating:</div>
    <div class="flex flex-col">
      <div
        class=""
        v-for="value in uniquePerformanceRatings"
        :key="value"
        :value="value"
      >
        <input
          type="checkbox"
          :id="value"
          :value="value"
          @change="updateFeatures"
        />
        <label :for="value">{{ value }}</label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),

  computed: {
    ...mapGetters(["allHandhelds"]),
    uniquePerformanceRatings: function () {
      const allPerformance = this.allHandhelds.map(
        (a) => a["Performance Rating"]
      );
      let result = [...new Set(allPerformance)];
      result = result.filter(Boolean); //Löscht alle falsy values
      return result;
    },
  },

  methods: {
    updateFeatures(e) {
      this.$store.commit("updateSingleChoice", false);
      this.$store.commit("updateWhichComponent", "Performance Rating");
      this.$store.commit(
        "updateFeatureArrays",
        e.target.value
      ); /* Updates Features für Liste */
    },
  },
};
</script>
