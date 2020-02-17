import { setResource } from "./dispatch";

const refs = {};

function mutation({ state, actions, effects }, { resource }) {
  const { dispatch } = actions._internal;

  return {
    create: async data => {
      return effects.create(resource, { data }).then(data => {
        dispatch(setResource(resource, data.id, data));
        return state.resources[resource][data.id];
      });
    },
    delete: async id => {
      const beforeDeleteData = state.resources[resource][id];

      dispatch(setResource(resource, id, undefined));

      effects.delete(resource, { id }).catch(() => {
        dispatch(setResource(resource, id, beforeDeleteData));
      });
    },
    update: async (id, data) => {
      const beforeUpdateData = state.resources[resource][id];

      dispatch(setResource(resource, id, data, false));

      const key = `update_${resource}_${id}`;

      const update = effects.update(resource, { id, data });
      refs[key] = update;

      return update
        .then(data => {
          if (update === refs[key]) {
            dispatch(setResource(resource, id, data, false));
            delete refs[key];
          }

          return state.resources[resource][id];
        })
        .catch(() => {
          dispatch(setResource(resource, id, beforeUpdateData));
        });
    }
  };
}

export default mutation;
