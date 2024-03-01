const { notFound, errHandler } = require("../middlewares/errHandler");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");

const routes = (app) => {
	app.use("/api/user", userRouter);
	app.use("/api/product", productRouter);
	app.use("/api/category", categoryRouter);

	// handle error
	app.use(notFound);
	app.use(errHandler);
};

module.exports = routes;
