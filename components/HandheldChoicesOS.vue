<template>
  <div class="border rounded-md p-2 m-1">
    <div>OS:</div>
    <div class="flex flex-col">
      <div class="" v-for="value in choices" :key="value" :value="value">
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
  data: () => ({
    choices: [
      "Linux",
      "Android",
      "Windows",
      "Batocera",
      "EmuELEC",
      "Lineage",
      "RecalBox",
      "351ELEC",
      "ArkOS",
      "SteamOS",
      "µC/OS-II",
      "Ubuntu",
    ],
  }),

  computed: {
    ...mapGetters(["allHandhelds"]),
    uniqueFeatures: function () {
      const allOfFeature = this.allHandhelds.map((a) => a["OS"]);
      console.log(allOfFeature);
      let result = [...new Set(allOfFeature)];
      result = result.filter(Boolean); //Löscht alle falsy values
      return result.sort();
    },
  },

  methods: {
    updateFeatures(e) {
      this.$store.commit("updateSingleChoice", false);
      this.$store.commit("updateWhichComponent", "OS");
      this.$store.commit(
        "updateFeatureArrays",
        e.target.value
      ); /* Updates Features für Liste */
    },
  },
};
</script>
