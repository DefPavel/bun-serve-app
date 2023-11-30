import { Hono } from "hono";
import pgPromise from "pg-promise";

type messageResponse<T> = {
  status: number;
  data: T;
};

const pgp = pgPromise();

const db = pgp({
  host: "postgres",
  port: 5432,
  database: "testdb",
  user: "root",
  password: "root",
});

const app = new Hono();

// get
app.get("/", async (c) => {
  const users: { id: number; name: string }[] = await db.any(
    "SELECT * FROM public.users"
  );

  const data: messageResponse<{ id: number; name: string }[]> = {
    status: 200,
    data: users,
  };
  return c.json(data);
});

// not found
app.notFound((c) => {
  const data: messageResponse<string> = {
    status: 404,
    data: "Not Found",
  };
  return c.json(data);
});

export default {
  port: 3000,
  fetch: app.fetch,
};
