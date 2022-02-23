const connectToDataBase = require("./database");
const serverUp = require("./server/serverUp");

(async () => {
  await serverUp();
  await connectToDataBase();
})();
