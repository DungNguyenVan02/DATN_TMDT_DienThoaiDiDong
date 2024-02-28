const { notFound, errHandler } = require("../middlewares/errHandler");
const userRouter = require("./user");

const routes = (app) => {
	app.use("/api/user", userRouter);

	// handle error
	app.use(notFound);
	app.use(errHandler);
};

module.exports = routes;
