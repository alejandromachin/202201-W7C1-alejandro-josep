const Serie = require("../../database/models/Serie");
const { getAllSeries, postSerie } = require("./seriesControllers");

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
