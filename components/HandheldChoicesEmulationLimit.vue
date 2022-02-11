<template>
  <div class="border rounded-md p-2 m-1">
    <div>Performance Rating:</div>
    <div class="flex flex-col">
      <div class="" v-for="value in uniqueFeatures" :key="value" :value="value">
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
    uniqueFeatures: function () {
      const allOfFeature = this.allHandhelds.map((a) => a["Emulation Limit"]);
      console.log(allOfFeature);
      let result = [...new Set(allOfFeature)];
      result = result.filter(Boolean); //Löscht alle falsy values
      return result;
    },
  },

  methods: {
    updateFeatures(e) {
      this.$store.commit("updateSingleChoice", false);
      this.$store.commit("updateWhichComponent", "Emulation Limit");
      this.$store.commit(
        "updateFeatureArrays",
        e.target.value
      ); /* Updates Features für Liste */
    },
  },
};
</script>
