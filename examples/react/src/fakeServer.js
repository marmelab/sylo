import fetchMock from "fetch-mock";
import FakeRest from "fakerest";

const data = {
  todos: [
    {
      id: 0,
      completed: false,
      name: "Bring the water to a full, rolling boil"
    },
    {
      id: 1,
      completed: false,
      name: "Add salt to the boiling water"
    },
    {
      id: 2,
      completed: false,
      name: "Cook your pasta at a rapid boil"
    },
    {
      id: 3,
      completed: false,
      name: "Drain the pasta in a colander"
    },
    {
      id: 4,
      completed: false,
      name: "Serve pasta immediately in warm bowls"
    }
  ]
};

const restServer = new FakeRest.FetchServer("http://localhost:1234");
restServer.init(data);
restServer.toggleLogging();

fetchMock.mock("begin:http://localhost:1234", restServer.getHandler());
