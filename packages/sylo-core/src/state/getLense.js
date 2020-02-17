import pick from "lodash.pick";

const getLense = state => lenseId => {
  if (!state.lenses[lenseId]) {
    return { data: null, loading: false };
  }

  const { locks, resource, loading, unique, dynamic } = state.lenses[lenseId];

  const data = !state.resources[resource]
    ? null
    : locks && !dynamic
    ? Object.values(pick(state.resources[resource], locks || []))
    : Object.values(state.resources[resource]);

  return {
    data: unique ? (Array.isArray(data) ? data[0] : null) : data,
    // "loading" is undefined before runLense starts, so we emulate loading
    loading: typeof loading === "undefined" || loading
  };
};

export default getLense;
