const express = require("express");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/", router);

const sampleId = new ObjectId().toString();

const mockSamplePost = {
    _id: new ObjectId(sampleId),
    title: "Building Scalable RESTful APIs with Node.js and Express",
    content: "Creating scalable backends with Node.js is simple once you master middleware architecture.",
};

const mockFindOne = jest.fn();

jest.mock("../data/database", () => ({
    getDatabase: () => ({
        collection: () => ({
            find: () => ({
                toArray: jest.fn().mockResolvedValue([mockSamplePost]),
            }),
            findOne: (...args) => mockFindOne(...args),
        }),
    }),
}));

beforeEach(() => {
    mockFindOne.mockReset();
});

describe("Posts Collection - GET Endpoints", () => {
    test("GET /posts should return status 200 and an array", async () => {
        const res = await request(app).get("/posts");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("GET /posts/:id should return status 200 and the post when found", async () => {
        mockFindOne.mockResolvedValueOnce(mockSamplePost);
        const res = await request(app).get(`/posts/${sampleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(mockSamplePost.title);
    });

    test("GET /posts/:id should return status 400 for an invalid ID", async () => {
        const res = await request(app).get("/posts/not-a-valid-id");
        expect(res.statusCode).toEqual(400);
    });

    test("GET /posts/:id should return status 404 when the post is not found", async () => {
        mockFindOne.mockResolvedValueOnce(null);
        const res = await request(app).get(`/posts/${new ObjectId().toString()}`);
        expect(res.statusCode).toEqual(404);
    });
});