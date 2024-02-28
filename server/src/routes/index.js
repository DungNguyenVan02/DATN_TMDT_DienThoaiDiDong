const userRouter = require("./user");
const routes = (app) => {
	app.use("/api/user", userRouter);
};

module.exports = routes;
