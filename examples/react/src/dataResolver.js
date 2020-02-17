const delay = t => new Promise(r => setTimeout(r, t));

const fetcher = (url, options = {}) =>
  delay(200).then(() =>
    window.fetch(`http://localhost:1234${url}`, options).then(r => r.json())
  );

export default {
  getList: (collection, payload) => {
    console.log({ collection, payload });
    let url = `/${collection}`;
    if (payload.filter) {
      url += `?filter=${encodeURIComponent(JSON.stringify(payload.filter))}`;
    }

    return fetcher(url);
  },
  getMany: (collection, payload) => {
    let url = `/${collection}`;
    if (payload.ids) {
      url += `?filter=${encodeURIComponent(
        JSON.stringify({ id: payload.ids })
      )}`;
    }

    return fetcher(url);
  },
  getOne: (collection, payload) => fetcher(`/${collection}/${payload.id}`),
  update: (collection, payload) =>
    fetcher(`/${collection}/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload.data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }),
  create: (collection, payload) =>
    fetcher(`/${collection}`, {
      method: "POST",
      body: JSON.stringify(payload.data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }),
  delete: (collection, payload) =>
    fetcher(`/${collection}/${payload.id}`, {
      method: "DELETE"
    })
};
