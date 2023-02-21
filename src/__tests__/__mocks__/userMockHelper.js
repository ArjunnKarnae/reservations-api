const registerUserPayload = {
    "username": "test",
    "email": "mockuser@mock.com",
    "password": "mockPwd"
}

const mockUserWithNoData = {
    "username": "",
    "email": "",
    "password": ""
};

const registerUserMockResponse = {
    "username": "test",
    "email": "mockuser@mock.com",
    "password": "mockPwd" 
};

module.exports = {registerUserPayload, mockUserWithNoData, registerUserMockResponse};