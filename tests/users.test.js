const express = require("express");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/", router);

const sampleId = new ObjectId().toString();

const mockSampleUser = {
    _id: new ObjectId(sampleId),
    username: "alex_dev",
    email: "alex.dev@example.com",
    displayName: "Alex Morgan",
};

const mockFindOne = jest.fn();

jest.mock("../data/database", () => ({
    getDatabase: () => ({
        collection: () => ({
            find: () => ({
                toArray: jest.fn().mockResolvedValue([mockSampleUser]),
            }),
            findOne: (...args) => mockFindOne(...args),
        }),
    }),
}));

beforeEach(() => {
    mockFindOne.mockReset();
});

describe("Users Collection - GET Endpoints", () => {
    test("GET /users should return status 200 and an array", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("GET /users/:id should return status 200 and the user when found", async () => {
        mockFindOne.mockResolvedValueOnce(mockSampleUser);
        const res = await request(app).get(`/users/${sampleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual("alex_dev");
    });

    test("GET /users/:id should return status 400 for an invalid ID", async () => {
        const res = await request(app).get("/users/not-a-valid-id");
        expect(res.statusCode).toEqual(400);
    });

    test("GET /users/:id should return status 404 when the user is not found", async () => {
        mockFindOne.mockResolvedValueOnce(null);
        const res = await request(app).get(`/users/${new ObjectId().toString()}`);
        expect(res.statusCode).toEqual(404);
    });
});