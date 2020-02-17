const locks = state =>
  Object.keys(state.resources).reduce((locks, resource) => {
    locks[resource] = Object.values(state.lenses)
      .filter(lense => lense.resource === resource)
      .reduce((lenseLocks, lense) => {
        return [...new Set([...lenseLocks, ...(lense.locks || [])])];
      }, []);

    return locks;
  }, {});

export default locks;
