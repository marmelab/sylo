function list({ state, actions }, { resource, options = {}, dynamic = true }) {
  const lenseId = actions._internal.registerLense({
    resource,
    effect: "getList",
    params: options,
    unique: false,
    dynamic
  });

  // console.log({ state, foo: state.lense(lenseId) });

  return {
    fetch: () => actions._internal.runLense(lenseId),
    data: () => state.getLense(lenseId)
  };
}

export default list;
