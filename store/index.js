export const state = () => ({
  current_sort: "form_factor_all",
  allHandhelds: [],
  features_collection: {
    aspect_ratio_object: {
      features: [],
      value: "Aspect Ratio",
    },
    performance_rating_object: {
      features: [],
      value: "Performance Rating",
    },
  },
  features_collection2: [
    {
      features: [],
      value: "Aspect Ratio",
    },
    {
      features: [],
      value: "Performance Rating",
    },
  ],
});

export const mutations = {
  setHandhelds(state, allHandhelds) {
    state.allHandhelds = allHandhelds;
  },

  updateList(state, value) {
    state.current_sort = value;
  } /* Updates Liste mit Value aus jeweiligen HandheldChoices component */,

  updateAspectRatio(state, value) {
    if (state.features_collection2[0].features.includes(value) === false) {
      state.features_collection2[0].features.push(value);
      console.log(state.features_collection2[0].features);
    } else {
      const removedFeature = state.features_collection2[0].features.filter(
        (val) => val !== value
      );
      state.features_collection2[0].features = removedFeature;
      console.log(state.features_collection2[0].features);
    }
  } /* Updates Features mit Value aus jeweiligen HandheldChoices component und entfernt sie beim Checkbox unclick */,

  updatePerformanceRating(state, value) {
    if (state.features_collection2[1].features.includes(value) === false) {
      state.features_collection2[1].features.push(value);
      console.log(state.features_collection2[1].features);
    } else {
      const removedFeature = state.features_collection2[1].features.filter(
        (val) => val !== value
      );
      state.features_collection2[1].features = removedFeature;
      console.log(state.features_collection2[1].features);
    }
  } /* Updates Features mit Value aus jeweiligen HandheldChoices component und entfernt sie beim Checkbox unclick */,
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

    await createdHandhelds.splice(0, 1); /* Removes the handheld description */

    context.commit("setHandhelds", createdHandhelds);
  },
};

export const getters = {
  allHandhelds(state) {
    return state.allHandhelds;
  },

  /* Filtert die Liste mit den gewünschten Kategorien */

  filtered_items(state) {
    const filteredArray = [...state.allHandhelds].filter(
      filter_functions[state.current_sort]
    );

    return filteredArray.filter((obj) => {
      return state.features_collection2.every((filter) => {
        if (filter.features.length === 0) {
          return true;
        }

        return filter.features.includes(obj[filter.value]);
      });
    });

    if (
      state.features_collection.aspect_ratio_object.features.length &&
      state.features_collection.performance_rating_object.features.length
    ) {
      return filteredArray.filter(
        (obj) =>
          state.features_collection.aspect_ratio_object.features.includes(
            obj[state.features_collection.aspect_ratio_object.value]
          ) &&
          state.features_collection.performance_rating_object.features.includes(
            obj[state.features_collection.performance_rating_object.value]
          )
      );
    } else if (
      state.features_collection.aspect_ratio_object.features.length ||
      state.features_collection.performance_rating_object.features.length
    ) {
      return filteredArray.filter(
        (obj) =>
          state.features_collection.aspect_ratio_object.features.includes(
            obj[state.features_collection.aspect_ratio_object.value]
          ) ||
          state.features_collection.performance_rating_object.features.includes(
            obj[state.features_collection.performance_rating_object.value]
          )
      );
    } else {
      return filteredArray;
    }
  },
};

/* Filterfunktionen in einem Objekt für Form Factor */
export const filter_functions = {
  form_factor_landscape: (obj) => {
    return obj["Form Factor"] === "Landscape";
  },
  form_factor_portrait: (obj) => {
    return obj["Form Factor"] === "Portrait";
  },
  form_factor_all: (obj) => {
    return obj["Form Factor"] !== "blaaa"; // Hier ggf. noch verbesseren
  },
};
