export const state = () => ({
  current_sort: "form_factor_all",
  allHandhelds: [],
  features_collection2: [
    {
      features: [],
      featureName: "Aspect Ratio",
    },
    {
      features: [],
      featureName: "Performance Rating",
    },
    {
      features: [],
      featureName: "Form Factor",
    },
  ],
  whichComponentUpdates: "",
  multipleChoiceFeatures: false,
});

export const mutations = {
  setHandhelds(state, allHandhelds) {
    state.allHandhelds = allHandhelds;
  },

  updateWhichComponent(state, compName) {
    state.whichComponentUpdates = compName;
  },

  /* Updates Form Factor mit Value aus jeweiligen HandheldChoices component */
  updateList(state, value) {
    state.current_sort = value;
  },

  /* Updates Features mit Value aus jeweiligen HandheldChoices component und entfernt sie beim Checkbox unclick */
  /* Component gibt whichComponentUpdates durch. Das wird mit featureName verglichen und dann Feature hinzugefügt oder entfernt */

  updateFeatureArrays(state, value) {
    console.log(state.whichComponentUpdates);
    return state.features_collection2.forEach((filter) => {
      if (
        filter.featureName == state.whichComponentUpdates &&
        filter.features.includes(value) === false
      ) {
        filter.features.push(value);
        console.log(filter.features);
      } else {
        const removedFeature = filter.features.filter((val) => val !== value);
        filter.features = removedFeature;
        console.log(filter.features);
      }
    });
  },
};

/* Fetched die Google-Tabelle. Nur wenn compiliert wird??? checken! */

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

  /* Filtert die Liste mit den gewünschten Features */
  /* .every Method stellt sicher, dass jedes Array Element gecheckt wird und gibt boolean Wert zurück */
  /* 1. Filter checkt Form Factor*/
  /* 2. Filter checkt ob alle Arrays aus features_collection leer sind. Wenn ja, return true = einfach filteredArray ohne Änderungen */
  /* 3. Filter checkt ob eines der features aus features_collection features array in den Werten des obj[filter.value] aus filteredArray vorkommt und returns it als filter  */

  filtered_items(state) {
    const filteredArray = [...state.allHandhelds].filter(
      filter_functions[state.current_sort]
    );

    return filteredArray.filter((obj) => {
      return state.features_collection2.every((filter) => {
        if (filter.features.length === 0) {
          return true;
        }

        return filter.features.includes(obj[filter.featureName]);
      });
    });
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
