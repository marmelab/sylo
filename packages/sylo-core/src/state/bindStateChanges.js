import mitt from "mitt";

const matchResourcePathPattern = /^(resources)\.([a-zA-Z0-9]+)$/;

export const bindStateChanges = ({ actions }, overmind) => {
  const resourceChangeEmitter = mitt();

  actions._internal.listenToResourceChange = () => (resource, callback) =>
    resourceChangeEmitter.on(resource, callback);

  overmind.addFlushListener((_, paths) => {
    const updatedResourcesSet = new Set([]);
    paths.forEach(path => {
      const match = path.match(matchResourcePathPattern);
      if (match) {
        updatedResourcesSet.add(match[2]);
      }
    });

    Array.from(updatedResourcesSet).forEach(resource =>
      resourceChangeEmitter.emit(resource, {})
    );
  });
};
