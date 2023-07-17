import usersReducer, {
  emptyUsers,
  createUser,
  getUser,
  updateUser,
  userAuth,
} from "../../redux/reducers/userReducer";
import { newUser, user1, user2, user3 } from "../data/users";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import store from "../shared/store";
import userServer from "../servers/userServer";

// Create a new instance of Axios Mock Adapter
const mock = new MockAdapter(axios);
const access_token = "12232334";
const refresh_token = "11823737";
beforeEach(() => {
  mock.reset(); // Reset the mock adapter before each test
  store.dispatch(emptyUsers);
});

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});
beforeEach(() => {
  store.dispatch(emptyUsers);
});

describe("Testing userReducer", () => {
  test("Check initial state", () => {
    const state = usersReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      isLoggedin: false,
      user: {
        name: "",
        avatar: "",
        email: "",
        password: "",
        role: "",
        id: 0,
      },
      token: { access_token: "", refresh_token: "" },
      users: [],
    });
  });

  test("it should add users", async () => {
    // Mock the API response
    mock.onPost("https://api.escuelajs.co/api/v1/users").reply(201, newUser);

    await store.dispatch(createUser(newUser as any));
    // await store.dispatch(createUser(user1 as any));
    // await store.dispatch(createUser(user2 as any));
    // await store.dispatch(createUser(user3 as any));

    // console.log(store.getState().userReducers.users);

    // Expectations for the test
    expect(store.getState().userReducers.users.length).toBe(1);
  });

  test(" it should log user in ", async () => {
    mock.onPost("https://api.escuelajs.co/api/v1/auth/login").reply(200, {
      access_token,
      refresh_token,
    });
    await store.dispatch(
      userAuth({ email: newUser.email, password: newUser.password })
    );

    expect(store.getState().userReducers.token.access_token).toBe("12232334");
    expect(store.getState().userReducers.token.refresh_token).toBe("11823737");
    expect(store.getState().userReducers.isLoggedin).toBe(true);
  });

  test("it should retrieve user profile", async () => {
    mock
      .onGet("https://api.escuelajs.co/api/v1/auth/profile")
      .reply((config) => {
        let authorizationHeader;
        if (config.headers?.Authorization) {
          authorizationHeader = config.headers?.Authorization;
        }

        if (authorizationHeader === `Bearer ${access_token}`) {
          return [
            200,
            {
              ...newUser,
            },
          ];
        }

        return [
          401,
          {
            error: "Unauthorized",
          },
        ];
      });

    await store.dispatch(getUser());

    // console.log(store.getState().userReducers);
  });

  test("it should update user profile details", async () => {
    mock
      .onPut(`https://api.escuelajs.co/api/v1/users/${newUser.id}`)
      .reply(200, {
        ...newUser,
        email: "upadatedemail@email.com",
        name: "newman jones",
      });

    await store.dispatch(
      updateUser({
        id: newUser.id,
        email: "upadatedemail@email.com",
        name: "newman jones",
        role: newUser.role,
      })
    );
    const state = store.getState().userReducers;
    expect(state.user.email).toBe("upadatedemail@email.com");
  });
});
