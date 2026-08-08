const express = require("express");
const request = require("supertest");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/", router);

jest.mock("../data/database", () => ({
  getDatabase: () => ({
    collection: () => ({
      find: () => ({
        toArray: jest.fn().mockResolvedValue([]),
      }),
    }),
  }),
}));

describe("GET Endpoints Unit Tests for All Collections", () => {
  test("1. GET /users should return status 200 and array", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("2. GET /posts should return status 200 and array", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("3. GET /categories should return status 200 and array", async () => {
    const res = await request(app).get("/categories");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("4. GET /comments should return status 200 and array", async () => {
    const res = await request(app).get("/comments");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
