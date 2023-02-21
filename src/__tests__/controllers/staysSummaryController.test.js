const ReservationModel = require("../../models/reservationModel");
const User = require("../../models/userModel");
const {testapp} = require("../../../serverUtil.mock");
const supertest = require("supertest");
const {mockReservations} = require("../__mocks__/reservationsMockHelper");

 
describe("GET /stays/summary/:guestmemberid", () => {  
    describe("given the id is not valid or no member exists with given id", () => {
        it("should return an error", async () => {
            const guestId = "12345";
            const getStaySummaryMock = jest.spyOn(ReservationModel, 'find').mockReturnValueOnce([]);
            const {body, statusCode} = await supertest(testapp).get(`/api/stays/summary/${guestId}`);
            expect(statusCode).toBe(404);
            expect(getStaySummaryMock).toHaveBeenCalled();
         });
    });
    describe("given the id is not valid or no member exists with given id", () => {
        it("should return the guest stay summary", async () => {
            mockReservations.map(reservation => {
                reservation.arrivalDate = new Date(reservation.arrivalDate);
                reservation.departureDate = new Date(reservation.departureDate);
            });
            const getStaySummaryMock = jest.spyOn(ReservationModel, 'find').mockReturnValueOnce(mockReservations);
            const {body, statusCode} = await supertest(testapp).get(`/api/stays/summary/10000`);  
            expect(statusCode).toBe(200);
            expect(getStaySummaryMock).toHaveBeenCalled();
        });
    });
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });  
});

describe("POST /api/stays/summary/search", () => {
    describe("given the start date greater than end date", () => {
        it("should return an error", async () => {
            const searchPayLoad = {
                startDate: "2023-02-20",
                endDate: "2023-01-10"
            };
            const {body, statusCode} = await supertest(testapp).post("/api/stays/summary/search").send(searchPayLoad);
            expect(statusCode).toBe(400);
        });
    });
    describe("given proper dates", () => {
        it("should return all the stays between given dates", async () => {
            const searchPayLoad = {
                startDate: "2023-01-20",
                endDate: "2023-02-20"
            };
            const searchStaysMock = await jest.spyOn(ReservationModel, 'find').mockReturnValueOnce(mockReservations);
            const {body, statusCode} = await supertest(testapp).post("/api/stays/summary/search").send(searchPayLoad);
            expect(statusCode).toBe(200);
            expect(searchStaysMock).toHaveBeenCalled();
        });
    });
});

