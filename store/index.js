export const state = () => ({
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
    {
      features: [],
      featureName: "OS",
    },
  ],
  whichComponentUpdates: "",
  isSingleChoiceFeature: false,
});

export const mutations = {
  setHandhelds(state, allHandhelds) {
    state.allHandhelds = allHandhelds;
  },

  /* Component übermittelt seinen eigenen Namen für Zuordnung */
  updateWhichComponent(state, compName) {
    state.whichComponentUpdates = compName;
  },

  /* Component übermittelt ob Featuremehrauswahl möglich ist */
  updateSingleChoice(state, possible) {
    state.isSingleChoiceFeature = possible;
  },

  /* Updates Features mit Value aus jeweiligen HandheldChoices component und entfernt sie beim Checkbox unclick */
  /* Component gibt whichComponentUpdates durch. Das wird mit featureName verglichen und dann Feature hinzugefügt oder entfernt */

  updateFeatureArrays(state, value) {
    /* console.log(state.whichComponentUpdates); */
    return state.features_collection2.forEach((filter) => {
      if (
        filter.featureName == state.whichComponentUpdates &&
        filter.features.includes(value) === false
      ) {
        if (state.isSingleChoiceFeature) {
          filter.features.splice(0, filter.features.length); //leert das Array, da single Choice Feature
          filter.features.push(value);
          /* console.log(filter.features); */
        } else {
          filter.features.push(value);
        }
      } else {
        const removedFeature = filter.features.filter((val) => val !== value);
        filter.features = removedFeature;
      }
    });
  },
};

/* Fetched die Google-Tabelle.*/

export const actions = {
  async fetchAllHandhelds(context) {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/values/Handhelds!A1:BX1000?key=${this.$config.googleSheetsApiKey}`
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
  /* 1. .every Method stellt sicher, dass jedes Array Element gecheckt wird und gibt boolean Wert zurück */
  /* 2. Erstes if checkt ob alle Arrays aus features_collection leer sind. Wenn ja, return true = einfach filteredArray ohne Änderungen */
  /* 3. Zweites if checkt ob der userChoice-Wert beim jeweiligen Handheld nicht undefined ist und checkt ob der Handheld den userChoice-Wert vollständig oder als substring beinhaltet  */

  filtered_items(state) {
    return state.allHandhelds.filter((handheld) => {
      return state.features_collection2.every((userChoice) => {
        if (
          userChoice.features.length === 0 ||
          userChoice.features == "All Handhelds"
        ) {
          return true;
        }

        if (handheld[userChoice.featureName]) {
          /* DIESER TEIL FUNKTIONIERT NOCH NICHT MIT DEN ANDEREN AUSWAHLEN  */
          if (state.whichComponentUpdates == "Performance Rating") {
            return userChoice.features.includes(
              handheld[userChoice.featureName]
            );
          } else
            return handheld[userChoice.featureName].includes(
              userChoice.features.toString()
            );
        }
      });
    });
  },
};
