import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { user1, user2, user3, user4, users } from '../data/users'
import { User } from '../../types/User';

const userServer = setupServer(
  // Describe the requests to mock.
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    /* 
        req: to access params and wuiries of the request
        res: method to send data back
        ctx: method to construct the content of returned data */
    return res(ctx.json(users));
  }),

  rest.post("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    const newUser = (await req.json()) as User;
    const error: string[] = [];
    console.log('new User: '  + newUser);
    users.push(newUser);
    if (error.length > 0) {
      return res(
        ctx.status(500),
        ctx.json({
          statusCode: 500,
          // message: error,
          error: "Internal Server Error",
        })
      );
    }
    return res(ctx.status(201), ctx.json(newUser));
  }),

  rest.post(
    " https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const request = await req.json();
console.log(res.networkError, req.headers)
    }
  )
);

export default userServer