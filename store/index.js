export const state = () => ({
  current_sort: "form_factor_landscape",
  allHandhelds: [],
});

export const mutations = {
  setHandhelds(state, allHandhelds) {
    state.allHandhelds = allHandhelds;
  },

  updateList(state, value) {
    state.current_sort = value;
  },
};

export const actions = {
  async fetchAllHandhelds(context) {
    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/values/Handhelds!A1:BX1000?key=AIzaSyABFpPUDmnr8BJ78OrDRowurWvtwqufkVw"
    );
    const handheldInfo = await response.json();
    const handheldSingles = await handheldInfo.values;

    const createdHandhelds = await handheldSingles.map((arr) =>
      Object.fromEntries(arr.map((v, i) => [handheldSingles[0][i], v]))
    );

    context.commit("setHandhelds", createdHandhelds);
  },
};

export const getters = {
  allHandhelds(state) {
    return state.allHandhelds;
  },
  filtered_items(state) {
    if (state.current_sort !== "all_handhelds") {
      return [...state.allHandhelds].filter(
        filter_functions[state.current_sort]
      );
    } else {
      return state.allHandhelds;
    }
  },
};

export const filter_functions = {
  form_factor_landscape: (obj) => {
    return obj["Form Factor"] === "Landscape";
  },
  form_factor_portrait: (obj) => {
    return obj["Form Factor"] === "Portrait";
  },
};
