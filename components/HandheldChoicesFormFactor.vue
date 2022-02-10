<template>
  <div class="border rounded-md p-2 m-1">
    <div>Form Factor:</div>
    <div class="flex flex-col">
      <div
        class=""
        v-for="value in uniqueFormFactor"
        :key="value"
        :value="value"
      >
        <input
          type="radio"
          :id="value"
          :value="value"
          v-model="picked"
          @change="updateList"
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
    picked: "All Handhelds",
  }),

  computed: {
    ...mapGetters(["allHandhelds"]),
    uniqueFormFactor: function () {
      const allFormFactor = this.allHandhelds.map((a) => a["Form Factor"]);
      let result = [...new Set(allFormFactor)];
      result = result.filter(Boolean); //Löscht alle falsy values
      result.unshift("All Handhelds"); //Fügt alle Handhelds hinzu
      return result;
    },
  },

  methods: {
    updateList(e) {
      this.$store.commit("updateSingleChoice", true);
      this.$store.commit("updateWhichComponent", "Form Factor");
      this.$store.commit(
        "updateFeatureArrays",
        e.target.value
      ); /* Updates Filter für Liste */
    },
  },
};
</script>
