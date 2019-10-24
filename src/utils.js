export const generateMutations = function (module) {
  if (module.mutations === undefined) {
    module.mutations = {};
  }

  Object.keys(module.state).forEach((key) => {
    if (module.mutations[key] === undefined) {
      const nameArray = key.match(/([A-Z]?[^A-Z]*)/g);
      const mutationName = nameArray !== null ? nameArray.slice(0,-1).join("_") : key;

      module.mutations[`SET_${mutationName.toUpperCase()}`] = (state, value) => {
        state[key] = value;
      };
    }
  });

  return module;
};
