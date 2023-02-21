const mockReservations = 
[
    {
    "guestMemberId": "10000",
    "guestName": "mockGuest",
    "hotelName": "mockHotel",
    "arrivalDate": "2023-02-20T00:00:00.000Z",
    "departureDate": "2023-02-24T00:00:00.000Z",
    "status": "active",
    "baseStayAmount": 2000,
    "taxAmount": 150,
    "reservationId": "63ee978ee1945b7aceb7ff99"
},
{
    "guestMemberId": "10000",
    "guestName": "Guest1",
    "hotelName": "Hotel1",
    "arrivalDate": "2023-02-20T00:00:00.000Z",
    "departureDate": "2023-02-24T00:00:00.000Z",
    "status": "active",
    "baseStayAmount": 2000,
    "taxAmount": 150,
    "reservationId": "63ee97c0e1945b7aceb7ff92"
},
{
    "guestMemberId": "10000",
    "guestName": "Guest1",
    "hotelName": "Hotel1",
    "arrivalDate": "2023-02-20T00:00:00.000Z",
    "departureDate": "2023-02-24T00:00:00.000Z",
    "status": "active",
    "baseStayAmount": 2000,
    "taxAmount": 150,
    "reservationId": "63ee97d6bf95db46a5dc358a"
}] ;

const mockReservationForPost = {
    
        "guestMemberId": "99999",
        "guestName": "mockGuest1",
        "hotelName": "mockHotel1",
        "arrivalDate": "2023-02-20T00:00:00.000Z",
        "departureDate": "2023-02-24T00:00:00.000Z",
        "status": "active",
        "baseStayAmount": 2000,
        "taxAmount": 150,
        "reservationId": "63ee978ee1945b7aceb7ff91"
    
};

module.exports = { mockReservations, mockReservationForPost};