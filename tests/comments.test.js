const express = require("express");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/", router);

const sampleId = new ObjectId().toString();

const mockSampleComment = {
    _id: new ObjectId(sampleId),
    postId: new ObjectId(),
    content: "Great article on REST API standards!",
};

const mockFindOne = jest.fn();

jest.mock("../data/database", () => ({
    getDatabase: () => ({
        collection: () => ({
            find: () => ({
                toArray: jest.fn().mockResolvedValue([mockSampleComment]),
            }),
            findOne: (...args) => mockFindOne(...args),
        }),
    }),
}));

beforeEach(() => {
    mockFindOne.mockReset();
});

describe("Comments Collection - GET Endpoints", () => {
    test("GET /comments should return status 200 and an array", async () => {
        const res = await request(app).get("/comments");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("GET /comments/:id should return status 200 and the comment when found", async () => {
        mockFindOne.mockResolvedValueOnce(mockSampleComment);
        const res = await request(app).get(`/comments/${sampleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.content).toEqual(mockSampleComment.content);
    });

    test("GET /comments/:id should return status 400 for an invalid ID", async () => {
        const res = await request(app).get("/comments/not-a-valid-id");
        expect(res.statusCode).toEqual(400);
    });

    test("GET /comments/:id should return status 404 when the comment is not found", async () => {
        mockFindOne.mockResolvedValueOnce(null);
        const res = await request(app).get(`/comments/${new ObjectId().toString()}`);
        expect(res.statusCode).toEqual(404);
    });
});