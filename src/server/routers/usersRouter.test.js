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

describe("Given /login/ endpoint", () => {
  describe("When it receives a POST request and a wrong user", () => {
    test("then it should response with a error and the status code 404 ", async () => {
      const { body } = await request(app).get("/login").expect(404);

      expect(body).toHaveProperty("error");
    });
  });
});
