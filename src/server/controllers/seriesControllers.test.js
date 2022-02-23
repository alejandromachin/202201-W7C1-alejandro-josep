const Serie = require("../../database/models/Serie");
const { getAllSeries } = require("./seriesControllers");

jest.mock("../../database/models/Serie");

describe("Given a getAllSeries controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
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
