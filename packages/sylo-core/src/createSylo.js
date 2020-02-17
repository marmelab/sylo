import { createOvermind } from "overmind";

import bindEffects from "./effects/bindEffects";
import actions from "./actions";
import state from "./state";
import { bindStateChanges } from "./state/bindStateChanges";

const createSylo = (resourceResolvers, onInitialize) =>
  createOvermind({
    state,
    actions,
    effects: bindEffects(resourceResolvers),
    onInitialize: (...args) => {
      onInitialize && onInitialize(...args);
      bindStateChanges(...args);
    },
    devtools: true
  });

export default createSylo;
