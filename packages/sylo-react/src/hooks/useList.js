import { useEffect } from "react";

import useSylo from "./useSylo";

export default (resource, options) => {
  const { actions } = useSylo();
  const { fetch, data } = actions.list({ options: options || {}, resource });

  useEffect(() => {
    const { release } = fetch();
    return release;
  }, [resource, JSON.stringify(options)]);

  return data();
};
