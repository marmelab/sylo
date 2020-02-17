import { useEffect } from "react";

import useSylo from "./useSylo";

export default (resource, ids = []) => {
  const { actions } = useSylo();
  const { fetch, data } = actions.many({ resource, ids });

  useEffect(() => {
    const { release } = fetch();
    return release;
  }, [resource, ids]);

  return data();
};
