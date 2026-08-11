const express = require("express");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/", router);

const sampleId = new ObjectId().toString();

const mockSampleCategory = {
    _id: new ObjectId(sampleId),
    name: "Web Development",
    description: "Articles related to backend and frontend web technologies.",
    slug: "web-development",
};

const mockFindOne = jest.fn();

jest.mock("../data/database", () => ({
    getDatabase: () => ({
        collection: () => ({
            find: () => ({
                toArray: jest.fn().mockResolvedValue([mockSampleCategory]),
            }),
            findOne: (...args) => mockFindOne(...args),
        }),
    }),
}));

beforeEach(() => {
    mockFindOne.mockReset();
});

describe("Categories Collection - GET Endpoints", () => {
    test("GET /categories should return status 200 and an array", async () => {
        const res = await request(app).get("/categories");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("GET /categories/:id should return status 200 and the category when found", async () => {
        mockFindOne.mockResolvedValueOnce(mockSampleCategory);
        const res = await request(app).get(`/categories/${sampleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.slug).toEqual("web-development");
    });

    test("GET /categories/:id should return status 400 for an invalid ID", async () => {
        const res = await request(app).get("/categories/not-a-valid-id");
        expect(res.statusCode).toEqual(400);
    });

    test("GET /categories/:id should return status 404 when the category is not found", async () => {
        mockFindOne.mockResolvedValueOnce(null);
        const res = await request(app).get(`/categories/${new ObjectId().toString()}`);
        expect(res.statusCode).toEqual(404);
    });
});