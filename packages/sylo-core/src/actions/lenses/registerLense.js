import hash from "hash-sum";

function registerLense({ state }, { customSeed, ...payload }) {
  const lenseId = hash(customSeed || payload);

  if (!state.lenses[lenseId]) {
    state.lenses[lenseId] = {
      ...payload,
      loading: undefined, // idle loading state
      locks: []
    };
  }

  return lenseId;
}

export default registerLense;
