import effects from '.';

const bindEffects = resourceResolver => Object.keys(effects)
    .reduce((agg, actionName) => {
        agg[actionName] = effects[actionName](resourceResolver);
        return agg;
    }, {});

export default bindEffects;