const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({ 
    guestMemberId: {
        type: String,
        required: [true, "Guest Member Id is mandatory"]
    },
    reservationId: {
        type: String
    },
    guestName: {
        type: String,
        required: [true, "Guest Name is required"]
    },
    hotelName: {
        type: String,
        required: [true, "Hotel Name is required"]
    },
    arrivalDate: {
        type: Date,
        required: [true, "Arrival Date is required"]
    },
    departureDate: {
        type: Date,
        required: [true, "Departure Date is required"]
    },
    status: {
        type: String
    },
    baseStayAmount: {
        type: Number
    },
    taxAmount: {
        type: Number
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;