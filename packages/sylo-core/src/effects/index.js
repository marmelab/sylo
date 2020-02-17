const createEffect = type => resourceResolver => {
  if (!resourceResolver[type]) {
    throw new Error(`DataProvider error: "${type}" effect is not defined`);
  }

  if (typeof resourceResolver[type] !== "function") {
    throw new Error(`DataProvider error: "${type}" effect is not a function`);
  }

  // Convert back Proxy objects to plain object with parse / stringify
  return (resource, params = {}) =>
    resourceResolver[type](resource, JSON.parse(JSON.stringify(params)));
};

export default [
  "getMany",
  "getList",
  "getOne",
  "delete",
  "update",
  "create"
].reduce((effects, key) => {
  effects[key] = createEffect(key);
  return effects;
}, {});
