import useSylo from "./useSylo";

export default (resource, id) => {
  const { state } = useSylo();

  return state.resources[resource]
    ? state.resources[resource][id] || null
    : null;
};
