const user = require("./user/user");
const auth = require ("./auth/authRouter")
const episode = require("./episode/episodeRouter")

const registerRoutes = (app) => {
  app.use("/api", user);
  app.use("/api", auth);
  app.use("/api", episode);
};

module.exports = registerRoutes;
