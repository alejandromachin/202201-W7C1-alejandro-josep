require("dotenv").config();

const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");

const Serie = require("../../database/models/Serie");
const connectToDataBase = require("../../database");
const User = require("../../database/models/User");

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
  await User.create({
    name: "alejandro",
    username: "machinazo",
    password: "$2b$10$tqqi/uVD3T0TSHf7op08ie.e5uwaLqw9BsOUJpiAjh58l141M/44W",
    admin: true,
  });

  const user = { username: "machinazo", password: "contrasena1234" };

  const { body } = await request(app).post("/users/login").send(user);

  token = body.token;
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
      const { body } = await request(app)
        .get("/series")
        .set("authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toHaveProperty("series");
      expect(body.series).toHaveLength(2);
      expect(body.series[0].name).toBe("Twin Peaks");
    });
  });
});

describe("given a endpoint /series/", () => {
  describe("when it receives a request POST", () => {
    test("then it should response with status 200 and have 3 series", async () => {
      const newSerie = { name: "Loki", platform: "Netflix" };

      const { body } = await request(app)
        .post("/series")
        .set("authorization", `Bearer ${token}`)
        .send(newSerie)
        .expect(201);

      expect(body).toHaveLength(3);
      expect(body[2].name).toBe("Loki");
    });
  });
});
