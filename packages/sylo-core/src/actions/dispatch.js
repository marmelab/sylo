// Dispatch Types

export const LOAD_LENSE_START = "LOAD_LENSE_START";
export const LOAD_LENSE_END = "LOAD_LENSE_END";
export const LOAD_LENSE_SUCCESS = "LOAD_LENSE_SUCCESS";
export const LOAD_LENSE_ERROR = "LOAD_LENSE_ERROR";
export const UNREGISTER_LENSE = "UNREGISTER_LENSE";
export const SET_RESOURCE = "SET_RESOURCE";

// Dispatch Action Creators

export const loadLenseStart = lenseId => ({
  type: LOAD_LENSE_START,
  payload: { lenseId }
});

export const loadLenseEnd = lenseId => ({
  type: LOAD_LENSE_END,
  payload: { lenseId }
});

export const loadLenseSuccess = (lenseId, data) => ({
  type: LOAD_LENSE_SUCCESS,
  payload: { lenseId, data }
});

export const loadLenseError = (lenseId, error) => ({
  type: LOAD_LENSE_ERROR,
  payload: { lenseId, error }
});

export const unregisterLense = lenseId => ({
  type: UNREGISTER_LENSE,
  payload: { lenseId }
});

export const setResource = (resource, id, payload, replace = true) => ({
  type: SET_RESOURCE,
  payload: { resource, id, payload, replace }
});

// Dispatch Reducer

const dispatch = ({ actions, state }, { type, payload }) => {
  console.log({ type, payload });

  switch (type) {
    case LOAD_LENSE_START: {
      state.lenses[payload.lenseId].loading = true;
      break;
    }
    case LOAD_LENSE_END:
      state.lenses[payload.lenseId] = {
        ...state.lenses[payload.lenseId],
        loading: false
      };
      break;
    case LOAD_LENSE_SUCCESS: {
      const { resource } = state.lenses[payload.lenseId];

      state.lenses[payload.lenseId] = {
        ...state.lenses[payload.lenseId],
        loading: false,
        locks: Array.isArray(payload.data)
          ? payload.data.map(item => item.id)
          : [payload.data.id]
      };

      if (Array.isArray(payload.data)) {
        payload.data.forEach(data => {
          actions._internal.dispatch(setResource(resource, data.id, data));
        });
      } else {
        actions._internal.dispatch(
          setResource(resource, payload.data.id, payload.data)
        );
      }
      break;
    }
    case UNREGISTER_LENSE:
      actions._internal.unregisterLense(payload.lenseId);
      break;
    case SET_RESOURCE:
      if (typeof payload.payload === "undefined") {
        delete state.resources[payload.resource][payload.id];
      } else {
        const resources = state.resources[payload.resource] || {};
        state.resources[payload.resource] = {
          ...resources,
          [payload.id]: payload.replace
            ? payload.payload
            : {
                ...(resources[payload.id] || {}),
                ...payload.payload
              }
        };
      }

      break;
    case LOAD_LENSE_ERROR:
      state.lenses[payload.lenseId] = {
        ...state.lenses[payload.lenseId],
        loading: false,
        error: payload.error
      };
      break;
  }
};

export default dispatch;
