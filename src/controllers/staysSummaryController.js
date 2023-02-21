const express = require("express");
const asyncHandler = require("express-async-handler");
const ReservationModel = require("../models/reservationModel");

//Method for retrieving the guest stay summary using the guest id
const retrieveGuestsStaySummary = asyncHandler(async (req, res) => {
    
    const reservationsList = await ReservationModel.find({guestMemberId: req.params.guestMemberId});

    if(reservationsList.length == 0) {
        res.status(404);
        throw new Error("No reservations exist for the given guest id");
    }

    const futureStays = reservationsList.filter(reservation => reservation.arrivalDate.getTime() > new Date().getTime());
    const pastStays = reservationsList.filter(reservation => reservation.arrivalDate.getTime() < new Date().getTime());

    const upcomingStaysInfo = getStaysInfo(futureStays);
    const pastStaysInfo = getStaysInfo(pastStays);
    const cancelledStays = reservationsList.filter(reservation => reservation.status === "cancelled").length;
    const totalStaysAmount = Math.abs(upcomingStaysInfo.stayAmount + pastStaysInfo.stayAmount);
    const guestStaySummary = {
        "guestMemberId": req.params.guestMemberId,
        "upComingStayInfo": upcomingStaysInfo,
        "pastStayInfo": pastStaysInfo,
        "cancelledStays": cancelledStays,
        "totalStaysAmount": totalStaysAmount
    }
    res.status(200).json(guestStaySummary);

});

//Method for retrieving the stays between the given dates
const searchStays = asyncHandler (async (req, res) => {
    if(new Date(req.body.startDate).getTime() > new Date(req.body.endDate).getTime()) {
        res.status(400);
        throw new Error("Start Date cannot be greater than End Date");
    }
    const results = await ReservationModel.find(
        {
            "arrivalDate": { $gt: req.body.startDate, $lt: req.body.endDate}
        }
        );
    if(null != results && results.length == 0) {
        res.status(200).json({"message": "No reservations found for the given span"});
    }
    res.status(200).json(results);
});

function getStaysInfo(stays) {
    let daysOfStay =  0;
    let totalAmountForStay = 0;

    stays.forEach(reservation => { 
        let daysOfStayInTime =   Math.abs(new Date(reservation.departureDate).getTime() - new Date(reservation.arrivalDate).getTime());
        daysOfStay += getDays(daysOfStayInTime);
        totalAmountForStay += reservation.baseStayAmount + reservation.taxAmount;
    });
    
    return {
        numOfstays: stays.length,
        numOfNights: daysOfStay,
        stayAmount: totalAmountForStay
    }
}

function getDays(daysOfStayInTime) {
    return Math.ceil(daysOfStayInTime / (1000 * 3600 * 24));
}

module.exports = { retrieveGuestsStaySummary, searchStays };