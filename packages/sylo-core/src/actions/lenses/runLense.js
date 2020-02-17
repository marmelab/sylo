import {
  loadLenseStart,
  loadLenseError,
  loadLenseSuccess,
  loadLenseEnd,
  unregisterLense
} from "../dispatch";

function runLense({ state, actions, effects }, lenseId) {
  if (!state.lenses[lenseId]) {
    return;
  }

  const { resource, effect, params } = state.lenses[lenseId];
  const { dispatch } = actions._internal;

  let unlocked = false;
  let unlock;

  const runner = new Promise(async resolve => {
    if (!state.lenses[lenseId] || state.lenses[lenseId].loading) {
      return;
    }

    dispatch(loadLenseStart(lenseId));

    const task = effects[effect](resource, params);

    try {
      const data = await task;

      if (unlocked) {
        dispatch(loadLenseEnd(lenseId));
        resolve();
        return;
      }

      dispatch(loadLenseSuccess(lenseId, data));

      resolve();
      unlock = () => dispatch(unregisterLense(lenseId));
    } catch (error) {
      dispatch(loadLenseError(lenseId, error));
      resolve();
    }
  });

  const release = () => {
    unlocked = true;
    unlock && unlock();
  };

  const then = cb => runner.then(() => state.getLense(lenseId)).then(cb);

  return {
    release,
    then
  };
}

export default runLense;
