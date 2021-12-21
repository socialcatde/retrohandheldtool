export const state = () => ({
  allHandhelds: [],
});

export const mutations = {
  setHandhelds(state, allHandhelds) {
    state.allHandhelds = allHandhelds;
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

  /* indexFinder: (state) => (merkmal) => {
    return state.allHandhelds[0].findIndex((el) => el === merkmal);
  }, */
};
