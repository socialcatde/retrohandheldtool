<template>
  <div class="w-2/3 lg:w-1/3 border-2 p-4 m-2 rounded-md shadow-xl">
    <div>Choose your settings:</div>
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
          value="all_handhelds"
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
    picked: "choose",
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
