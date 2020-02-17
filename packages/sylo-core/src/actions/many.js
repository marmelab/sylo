function list({ state, actions }, { resource, ids = [] }) {
  const lenseId = actions._internal.registerLense({
    resource,
    effect: "getMany",
    params: { ids },
    unique: false
  });

  return {
    fetch: () => actions._internal.runLense(lenseId),
    data: () => state.getLense(lenseId)
  };
}

export default list;
