import useSylo from "./useSylo";

export default resource => {
  const { actions } = useSylo();
  return actions.mutation({ resource });
};
