const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ReservationModel = require("../models/reservationModel");

//Method for retrieving all reservations
const getAllReservations = asyncHandler (async (req, res) => {
   
    const reservationsList = await ReservationModel.find(); 
    const modifiedList  = reservationsList.map((reservation)=> {
        return mapResponseReservation(reservation);
    }); 
    res.status(200).json(modifiedList);
});

//Method for retrieving reservation with the given reservation id
const getReservation = asyncHandler (async (req, res) => {
    
    handleInvalidReservationId(req.params.id, res);
    const fetchedReservation = await ReservationModel.findById(req.params.id);  
    res.status(200).json(mapResponseReservation(fetchedReservation));
});

//Method for creating a new reservation
const createReservation = asyncHandler (async (req, res) => {
    
    const existingReservations = await ReservationModel.find({guestMemberId: req.body.guestMemberId});
   
    //Check if the guest already has any reservation at the same hotel for the requested dates
    existingReservations.forEach(reservation => {
        if(reservation.hotelName === req.body.hotelName) {
            if(new Date(reservation.arrivalDate).getTime() === new Date(req.body.arrivalDate).getTime() 
            && new Date(reservation.departureDate).getTime() === new Date(req.body.departureDate).getTime()) {
                res.status(400);
                throw new Error("Already a reservation exists for the same dates at the same hotel");
            }
        }
    });
    const reservation = new ReservationModel(req.body);
    const newReservation = await reservation.save();
    res.status(201).json(mapResponseReservation(newReservation));
});

//Method for modifying a given reservation
const updateReservation = asyncHandler (async (req, res) => {
    
    handleInvalidReservationId(req.params.id, res);
    const updatedReservation = await ReservationModel.findByIdAndUpdate(req.params.id, req.body, {new: true});   
    res.status(200).json(mapResponseReservation(updatedReservation));
});

//Method for cancelling a reservation using the reservation id.
//Just updating the status as cancelled instead of removing the whole record from DB
const cancelReservation = asyncHandler (async (req, res) => { 
    handleInvalidReservationId(req.params.id, res);
    const cancelledReservation = await ReservationModel.findByIdAndUpdate(req.params.id, {status:"cancelled"}, {new:true});
    res.status(200).json(mapResponseReservation(cancelledReservation)); 
});

//Method for handling error in case of invalid reservation id
const handleInvalidReservationId = (id, res) => { 
    if(!mongoose.isValidObjectId(id)) { 
        res.status(404);
        throw new Error("No Reservation Exists with the given id");
    }
};

const mapResponseReservation = (reservation) => { 
   return {
        "reservationId": reservation._id,
        "guestMemberId": reservation.guestMemberId,
        "guestName": reservation.guestName,
        "hotelName": reservation.hotelName,
        "arrivalDate": reservation.arrivalDate,
        "departureDate": reservation.departureDate,
        "status": reservation.status,
        "baseStayAmount": reservation.baseStayAmount,
        "taxAmount": reservation.taxAmount
    };      
}

module.exports= { 
    getAllReservations,
    getReservation,
    createReservation,
    updateReservation,
    cancelReservation
  };