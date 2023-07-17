import { User } from "../../types/User";

const user1 = {
  id: 1,
  email: "john@gmail.com",
  name: "john",
  password: "john",
  avatar: "https://api.escuelajs.co/api/v1/files/116f.jpg",
  role: "admin",
};

const user2 = {
  id: 2,
  email: "sabrina@gmail.com",
  name: "sabrina",
  password: "sabrina",
  avatar: "https://api.escuelajs.co/api/v1/files/116f.jpg",
  role: "customer",
};

const user3 = {
  id: 3,
  email: "cina@gmail.com",
  name: "cina",
  password: "cina",
  avatar: "https://api.escuelajs.co/api/v1/files/116f.jpg",
  role: "admin",
};

const user4 = {
  id: 4,
  email: "alina@gmail.com",
  name: "alina",
  password: "alina",
  avatar: "https://api.escuelajs.co/api/v1/files/116f.jpg",
  role: "customer",
};

const newUser = {
  id: 5,
  name: "admin milles",
  email: "admin@gmail.com",
  password: "password",
  role: "admin",
  avatar: "https://api.escuelajs.co/api/v1/files/116f.jpg",
};

const users: User[] = [];

export { user1, user2, user3, user4, newUser, users };
