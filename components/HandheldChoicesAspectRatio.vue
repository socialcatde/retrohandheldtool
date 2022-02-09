<template>
  <div class="border rounded-md p-2 m-1">
    <div>Aspect Ratio:</div>
    <div class="flex flex-col">
      <div
        class=""
        v-for="value in uniqueAspectRatios"
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
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({}),

  computed: {
    ...mapGetters(["allHandhelds"]),
    uniqueAspectRatios: function () {
      const allAspect = this.allHandhelds.map((a) => a["Aspect Ratio"]);
      const result = [...new Set(allAspect)];
      return result;
    },
    ...mapState(["whichComponentUpdates"]),
  },

  methods: {
    updateFeatures(e) {
      this.$store.commit("updateWhichComponent", "Aspect Ratio");
      this.$store.commit(
        "updateFeatureArrays",
        e.target.value
      ); /* Updates Features für Liste */
    },
  },
};
</script>
