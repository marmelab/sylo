import React from "react";
import { Provider } from "overmind-react";
import createSylo from "@sylo/core/src/createSylo";

const SyloProvider = ({ dataResolver, onInitialize, children }) => {
  if (!dataResolver) {
    throw new Error(
      'You must provide an "dataResolver" as <SyloProvider /> prop.'
    );
  }

  const value = createSylo(dataResolver, onInitialize);
  return React.createElement(Provider, { value }, children);
};

export default SyloProvider;
