function unregisterLense({ state }, lenseId) {
  if (!state.lenses[lenseId]) {
    return;
  }

  const { resource } = state.lenses[lenseId];

  delete state.lenses[lenseId];

  const locks = state.locks[resource];

  Object.keys(state.resources[resource] || {})
    .map(id => parseInt(id, 10))
    .forEach(id => {
      if (locks.indexOf(id) === -1) {
        delete state.resources[resource][id];
      }
    });
}

export default unregisterLense;
