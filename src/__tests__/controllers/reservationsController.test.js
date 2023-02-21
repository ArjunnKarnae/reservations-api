const ReservationModel = require("../../models/reservationModel");
const { reservationsController } = require("../../controllers/reservationsController");
const supertest = require("supertest");
const {testapp} = require("../../../serverUtil.mock");
const { mockReservations, mockReservationForPost } = require("../__mocks__/reservationsMockHelper");

jest.mock("../../models/reservationModel");


describe("GET /reservations/:id", () => {
    describe("given the reservation with the given id does not exist or if id is invalid", () => {
        it("should return 404", async () => {
            const reservationId = '123446';
            await supertest(testapp).get(`/api/reservations/${reservationId}`).expect(404);
        });     
    });
    describe("given the reservation with the id exists", ()=> {
        it("should return reservation", async () => {
            const reservationId = "63ee978ee1945b7aceb7ff99";
            const reservatonModelMock = jest.spyOn(ReservationModel, 'findById').mockReturnValueOnce(mockReservations[0]);
            const {body, statusCode} = await supertest(testapp).get(`/api/reservations/${reservationId}`);
            expect(statusCode).toBe(200);
            expect(reservatonModelMock).toHaveBeenCalledTimes(1);
        });
    });
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });  
});

describe("GET /reservations", () => {  
    it("should return reservations", async () => {
        const reservatonModelMock = jest.spyOn(ReservationModel, 'find').mockReturnValueOnce(mockReservations);
        const {body, statusCode} = await supertest(testapp).get(`/api/reservations/`);
        expect(statusCode).toBe(200);
        expect(reservatonModelMock).toHaveBeenCalledTimes(1);
    });
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });         
});

describe("POST /reservations", () => {
    describe("given the new reservation payload is good", ()=> {
        it("should return the newly created reservation when successful", async () => {
            const reservationPayLoad = new ReservationModel(mockReservations[0]);
            const getAllReservationsSpy = jest.spyOn(ReservationModel, 'find').mockReturnValueOnce(mockReservations); 
            const mockSave = jest.spyOn(reservationPayLoad, 'save').mockReturnValueOnce(mockReservationForPost);
            const {body, statusCode} = await supertest(testapp).post(`/api/reservations/`).send(mockReservationForPost);
            expect(statusCode).toBe(201);
            expect(mockSave).toHaveBeenCalledTimes(1);    
        });
    });
    describe("given there is already a reservation for the given guest at the same hotel for same dates", ()=> {
        it("should return a error message for duplicate reservation", async () => {
            const reservationPayLoad = new ReservationModel(mockReservations[0]);
            const getAllReservationsSpy = jest.spyOn(ReservationModel, 'find').mockReturnValueOnce(mockReservations); 
            const mockSave = jest.spyOn(reservationPayLoad, 'save').mockReturnValueOnce(mockReservations[0]);
            const {body, statusCode} = await supertest(testapp).post(`/api/reservations/`).send(mockReservations[0]);
            expect(statusCode).toBe(400);
            expect(mockSave).toHaveBeenCalledTimes(1);    
        });
    });   
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });
});

describe("PUT /reservations/:id", () => {
    describe("given the reservation with the given id does not exist or if id is invalid", () => {
        it("should return 404", async () => {
            const reservationId = '123446';
            await supertest(testapp).get(`/api/reservations/${reservationId}`).expect(404);
        });     
    });
    describe("given the reservation with the given id exists", () => {
        it("should update the reservation and return the updated reservation", async ()=> {
            const mockReservationId = "63ee978ee1945b7aceb7ff99";
            const udpatedReservation = ({
                ...mockReservations[0],
                guestName: "Updated Guest name",      
            });
            
            const updateReservationMock = jest.spyOn(ReservationModel, 'findByIdAndUpdate').mockReturnValueOnce(udpatedReservation);
            const {body, statusCode} = await supertest(testapp).put(`/api/reservations/${mockReservationId}`).send(mockReservations[0]);
           
            expect(statusCode).toBe(200);
            expect(updateReservationMock).toHaveBeenCalledTimes(1);
        });
    });
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });
});

describe("DELETE /reservations/:id", () => {
    describe("given the reservation with the given id does not exist or if id is invalid", () => {
        it("should return 404", async () => {
            const reservationId = '123446';
            await supertest(testapp).get(`/api/reservations/${reservationId}`).expect(404);
        });     
    });
    describe("given the reservation with the given id exists", () => {
        it("should cancel the reservation and return the cancelled reservation", async ()=> {
            const mockReservationId = "63ee978ee1945b7aceb7ff99";
            const cancelledReservation = ({
                ...mockReservations[0],
                status: "cancelled",      
            });
            
            const cancelledReservationMock = jest.spyOn(ReservationModel, 'findByIdAndUpdate').mockReturnValueOnce(cancelledReservation);
            const {body, statusCode} = await supertest(testapp).put(`/api/reservations/${mockReservationId}`).send(mockReservations[0]);
           
            expect(statusCode).toBe(200);
            expect(cancelledReservationMock).toHaveBeenCalledTimes(1);
            expect(body.status).toBe("cancelled");
        });
    });
    afterAll(async ()=> {
        jest.restoreAllMocks();
    });
});