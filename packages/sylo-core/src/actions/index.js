import one from "./one";
import list from "./list";
import many from "./many";
import mutation from "./mutation";
import runLense from "./lenses/runLense";
import registerLense from "./lenses/registerLense";
import unregisterLense from "./lenses/unregisterLense";
import dispatch from "./dispatch";

export default {
  one,
  list,
  many,
  mutation,
  _internal: {
    dispatch,
    runLense,
    registerLense,
    unregisterLense
  }
};
