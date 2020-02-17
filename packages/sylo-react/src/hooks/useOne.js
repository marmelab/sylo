import { useEffect } from "react";

import useSylo from "./useSylo";

export default (resource, id) => {
  const { actions } = useSylo();
  const { fetch, data } = actions.one({ resource, id });

  useEffect(() => {
    const { release } = fetch();
    return release;
  }, [resource, id]);

  return data();
};
