const express = require("express");
const reservationsErrorHandler = require("./src/middleware/reservationsErrorHandler");
const reservationsRouter = require("./src/routes/reservationsRoutes");
const staysSummaryRouter = require("./src/routes/staysSummaryRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRouter = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/stays/summary", staysSummaryRouter);
app.use(reservationsErrorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {app};