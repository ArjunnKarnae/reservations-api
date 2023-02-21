const express = require("express");
const reservationsErrorHandler = require("./src/middleware/reservationsErrorHandler");
const userRouter = require("./src/routes/userRoutes");
const mockReservationRouter = require("./src/__tests__/__mocks__/routes/mockReservationRoutes");
const mockStaysSummaryRouter = require("./src/__tests__/__mocks__/routes/mockStaysSummaryRoutes");
const router = express.Router();
const { retrieveGuestsStaySummary, searchStays } = require("./src/controllers/staysSummaryController");
const { getAllReservations, 
    getReservation, 
    createReservation, 
    updateReservation, 
    cancelReservation } = require("./src/controllers/reservationsController");

const testapp = express();

testapp.use(express.json());

testapp.use("/api/users", userRouter);
testapp.use("/api/reservations", mockReservationRouter);
testapp.use("/api/stays/summary", mockStaysSummaryRouter);
testapp.use(reservationsErrorHandler);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {testapp};