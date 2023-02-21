const supertest = require("supertest");
const User = require("../../models/userModel");
const {app} = require("../../../serverUtil");
const {registerUserPayload, mockUserWithNoData, registerUserMockResponse} = require("../__mocks__/userMockHelper");
const {userController} = require("../../controllers/userController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


jest.mock("../../models/userModel");

describe("POST /users/registration", () => {
    describe("given the user payload missing any data", () => {
        it("should throw an error", async () => {
            const {body, statusCode} = await supertest(app).post("/api/users/register").send(mockUserWithNoData);
            expect(statusCode).toBe(400);    
        });
    });
    describe("given the user already exists", () => {
        it("should return an error", async () => {
            const existingUserMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(registerUserMockResponse);
            const {body, statusCode} = await supertest(app).post("/api/users/register").send(registerUserPayload);
            expect(statusCode).toBe(400);  
            expect(body.message).toBe("User already exists");
            expect(existingUserMock).toHaveBeenCalled();
        });
    });
    describe("given the user does  not exist", () => {
        it("should create the user", async () => {
            const existingUserMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(null);
            const userPayLoad = new User(registerUserPayload);
            const mockUserSave = jest.spyOn(userPayLoad, 'save').mockReturnValueOnce(registerUserMockResponse);
            const {body, statusCode} = await supertest(app).post("/api/users/register").send(registerUserPayload);
            expect(statusCode).toBe(201);  
            expect(mockUserSave).toHaveBeenCalled();
        });
    });
    afterAll(async ()=>{
        jest.restoreAllMocks();
    });
});

describe("POST /users/login", () => {
    describe("given the crendentials are incorrect", () => {
        it("should give an error", async () => {
            const {body, statusCode} = await supertest(app).post("/api/users/login").send(mockUserWithNoData);
            expect(statusCode).toBe(400);  
        });
    });
    describe("given the password is incorrect", () => {
        it("should give an error", async () => {
            const registerUserPayloadWithWrongPwd = {...registerUserPayload, "password": "wrongPwd"};
            const existingUserMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(registerUserPayloadWithWrongPwd); 
            const {body, statusCode} = await supertest(app).post("/api/users/login").send(registerUserPayload);
            expect(statusCode).toBe(400);
            expect(existingUserMock).toHaveBeenCalled();
        });
    });
    describe("given the credentials are correct", () => {
        it("should give return access token", async () => {
            const userWithHashedPwd = {...registerUserPayload, "password": await bcrypt.hash(registerUserPayload.password, 10)};
            const accessTokenMock = jest.spyOn(jwt, 'sign').mockReturnValueOnce("mockAccessToken");
            const existingUserMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(userWithHashedPwd); 
            const {body, statusCode} = await supertest(app).post("/api/users/login").send(registerUserPayload); 
            expect(statusCode).toBe(200);
            expect(existingUserMock).toHaveBeenCalled();
        });
    });
    afterAll(async () => {
        jest.restoreAllMocks();
    })
});
