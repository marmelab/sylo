function one({ state, actions }, { resource, id }) {
  const lenseId = actions._internal.registerLense({
    resource,
    effect: "getOne",
    params: { id },
    unique: true
  });

  return {
    fetch: () => actions._internal.runLense(lenseId),
    data: () => state.getLense(lenseId)
  };
}

export default one;
