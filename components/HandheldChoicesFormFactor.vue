<template>
  <div class="border rounded-md p-2 m-1">
    <div>Form Factor:</div>
    <div class="flex flex-col">
      <div class="">
        <input
          type="radio"
          id="portrait"
          value="form_factor_portrait"
          v-model="picked"
          @change="updateList"
        />
        <label for="portrait">Portrait</label>
      </div>

      <div class="">
        <input
          type="radio"
          id="landscape"
          value="form_factor_landscape"
          v-model="picked"
          @change="updateList"
        />
        <label for="landscape">Landscape</label>
      </div>
      <div class="">
        <input
          type="radio"
          id="all"
          value="form_factor_all"
          v-model="picked"
          @change="updateList"
        />
        <label for="all">All Form Factors</label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    picked: "form_factor_all",
  }),

  computed: {
    ...mapState(["current_sort"]),
  },

  methods: {
    updateList(e) {
      this.$store.commit(
        "updateList",
        e.target.value
      ); /* Updates Filter für Liste */
    },
  },
};
</script>
