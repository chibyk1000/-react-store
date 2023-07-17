import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { User } from "../../types/User";
import { toast } from "react-toastify";

interface UserDetails {
  isLoggedin: boolean;
  user: User;
  users: User[];
  token: {
    access_token: string;
    refresh_token: string;
  };
}
const initialState: UserDetails = {
  isLoggedin: false,
  user: { name: "", avatar: "", email: "", password: "", role: "", id: 0 },
  users: [],
  token: {
    access_token: "",
    refresh_token: "",
  },
};

export const createUser = createAsyncThunk("createUser", async (data: User) => {
  try {
    const result = await axios.post<User>(
      "https://api.escuelajs.co/api/v1/users",
      data
    );

    if (result.status === 201) {
      toast.success("signup successfull");
    }

    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    if (error.request) {
      console.log("error", error);

      // toast.error(error.response?.data?.message);
      // console.log("error in request: ", error.request);
    } else {
      console.log(error.response);
    }
  }
});

export const userAuth = createAsyncThunk("userAuth", async (data: any) => {
  try {
    const result = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      data
    );
    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    console.log(e);

    if (error.request) {
      toast.error(error.response?.data?.message);
      console.log("error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
});

export const getUser = createAsyncThunk("getUser", async () => {
  const token = localStorage.getItem("tokens") as string;
  try {
    const result = await axios.get<User>(
      "https://api.escuelajs.co/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).access_token}`,
        },
      }
    );
    if (result.status === 201) {
      toast.success("signup successfull");
    }
    console.log(result);

    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    if (error.request) {
      toast.error(error.response?.data?.message);
      console.log("error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
});
export const getUsers = createAsyncThunk("getUsers", async () => {
  const token = localStorage.getItem("tokens") as string;
  try {
    const result = await axios.get<User>(
      "https://api.escuelajs.co/api/v1/users",
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).access_token}`,
        },
      }
    );
    if (result.status === 201) {
      toast.success("signup successfull");
    }

    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    if (error.request) {
      toast.error(error.response?.data?.message);
      console.log("error in request: ", error.request);
    } else {
      console.log(error.response?.data);
    }
  }
});

export const updateUser = createAsyncThunk("updateUser", async (data: any) => {
  try {
    const result = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${data.id}`,
      data
    );
    return result.data; // returned result would be inside action.payload
  } catch (e) {
    const error = e as AxiosError | any;
    console.log(e);

    if (error.request) {
      toast.error(error.response?.data?.message);
      console.log("error in request: ", error.response);
    } else {
      console.log(error.response?.data);
    }
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("user created");
          state.user = action.payload;
          state.users.push(action.payload);
        }
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        if (action.payload) {
          toast.success("login success");
          state.isLoggedin = true;
          state.token = action.payload;
          localStorage.setItem("tokens", JSON.stringify(action.payload));
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload as any;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          const user = state.users.find((u) => u.id === action.payload.id);
          if (user) {
            user.email = action.payload.email;
            user.name = action.payload.name;
            user.role = action.payload.role;
          }
          toast.success("profile update");
        }
      });
  },
});

const userReducers = userSlice.reducer;
export const { emptyUsers } = userSlice.actions;
export default userReducers;
