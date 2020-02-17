// import React from "react";
// import { GET_ONE } from "@sylo/core/src/effects/types";
// import { renderHook } from "@testing-library/react-hooks";

// import useOne from "./useOne";
// import SyloProvider from "../SyloProvider";

// const createActionsContextWrapper = dataResolver => ({ children }) => (
//   <SyloProvider dataResolver={dataResolver}>{children}</SyloProvider>
// );

// const delay = t => new Promise(r => setTimeout(r, t));

// describe("useOne", () => {
//   it("should throw an error if app is not wrapped using SyloProvider", () => {
//     const { result } = renderHook(() => useOne("foo", 42));

//     expect(result.error.message).toBe(
//       "You must wrap your app with <SyloProvider />"
//     );
//   });

//   it("should return an empty data object at first render", async () => {
//     const dataResolver = jest.fn(() => Promise.resolve({ id: "42" }));

//     const { result, waitForNextUpdate } = renderHook(() => useOne("foo", 42), {
//       wrapper: createActionsContextWrapper(dataResolver)
//     });

//     expect(result.current).toBe(null);

//     await waitForNextUpdate(); // clear warnings ¯\_(ツ)_/¯
//   });

//   it("should return call getOne effect and return data from it", async () => {
//     const dataResolver = jest.fn(() =>
//       delay(100).then(() => ({ id: 42, name: "foo" }))
//     );

//     const { result, waitForNextUpdate } = renderHook(() => useOne("foo", 42), {
//       wrapper: createActionsContextWrapper(dataResolver)
//     });

//     await waitForNextUpdate();

//     expect(dataResolver).toHaveBeenCalledWith(GET_ONE, "foo", { id: 42 });

//     expect(result.current).toEqual({ id: 42, name: "foo" });
//   });
// });
