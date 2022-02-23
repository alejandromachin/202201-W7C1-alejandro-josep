const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");

const Serie = require("../../database/models/Serie");
const connectToDataBase = require("../../database");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Serie.create({ name: "Twin Peaks", platform: "Netflix" });
  await Serie.create({ name: "True detective", platform: "Netflix" });
});

afterEach(async () => {
  await Serie.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("given a endpoint /series/", () => {
  describe("when it receives a request GET", () => {
    test("then it should response with status 200 and have 2 series", async () => {
      const { body } = await request(app).get("/series").expect(200);

      expect(body).toHaveProperty("series");
      expect(body.series).toHaveLength(2);
      expect(body.series[0].name).toBe("Twin Peaks");
    });
  });
});
