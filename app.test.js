const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async() => {
    await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async() => {
    await mongoose.connection.close();
});

describe("GET /advances/advance", () => {
    it("should displays a specific advance data", async() => {
        const res = await request(app).get(
            "/advances/advance"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("displayed");
    });
});

describe("POST /advances/normal", () => {
    it("should create a normal advance", async() => {
        const res = await request(app).post("/advances/normal").send({
            Date: 21 - 9 - 2023,
            suggestionDate: 11 - 11 - 2023,
            status: "waiting",
            amount: 1000,
            type: "normal"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("created");
    });
});

describe("PUT /advances/normal", () => {
    it("should update a product", async() => {
        const res = await request(app)
            .put("/advances/normal")
            .send({
                Date: 21 - 9 - 2023,
                suggestionDate: 11 - 11 - 2023,
                status: "waiting",
                amount: 1000,
                type: "normal"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(104);
    });
});

describe("DELETE /advances/", () => {
    it("should delete a product", async() => {
        const res = await request(app).delete(
            "/advances/"
        );
        expect(res.statusCode).toBe(200);
    });
});