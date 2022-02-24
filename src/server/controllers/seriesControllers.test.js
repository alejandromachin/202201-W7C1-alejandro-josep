const Serie = require("../../database/models/Serie");
const { getAllSeries, postSerie, deleteSerie } = require("./seriesControllers");

jest.mock("../../database/models/Serie");

describe("Given a getAllSeries controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a GET request", () => {
    test("Then it should call method json with a list of series in the response", async () => {
      const res = { json: jest.fn() };

      const series = {
        id: 1,
        name: "Death Note",
        admin: true,
      };
      Serie.find = jest.fn().mockResolvedValue(series);

      await getAllSeries(null, res);
      expect(Serie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenLastCalledWith({ series });
    });
  });
});

describe("Given a postSerie controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
    test("Then it should call method json with a serie in the response", async () => {
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const req = {
        body: {
          id: 1,
          name: "Death Note",
          platform: "Netflix",
        },
      };

      Serie.create = jest.fn().mockResolvedValue(req.body);

      await postSerie(req, res);

      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });
});

describe("given a deleteSerie middleware", () => {
  describe("When it receives a response with an id of a serie", () => {
    test("then it should call its json method with the serie deleted ", async () => {
      const req = {
        params: { idSerie: "6217cafa97bfd9cf7ce3f91d" },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const serie = {
        _id: "6217cafa97bfd9cf7ce3f91d",
        name: "The Witcher",
        platform: "621657191f3703803c5de54c",
        __v: 0,
      };

      Serie.findByIdAndDelete = jest.fn().mockResolvedValue(serie);

      await deleteSerie(req, res, null);

      expect(res.json).toHaveBeenCalledWith(serie);
    });
  });
  describe("When it receives a response with an id of a serie that doesnt exist", () => {
    test("then it should call its next method with the serie deleted ", async () => {
      const req = {
        params: { idSerie: undefined },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      const next = jest.fn();
      const error = new Error(
        "Sorry, couldn't find the serie you want to delete"
      );

      Serie.findByIdAndDelete = jest.fn().mockResolvedValue(undefined);

      await deleteSerie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
