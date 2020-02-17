import { createHook } from "overmind-react";

const useHook = createHook();

const useSylo = () => {
  try {
    return useHook();
  } catch (e) {
    console.log({ e });
    throw new Error("You must wrap your app with <SyloProvider />");
  }
};

export default useSylo;
