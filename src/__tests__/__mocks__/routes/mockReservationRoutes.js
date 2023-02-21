const express = require("express");
const { getAllReservations, 
        getReservation, 
        createReservation, 
        updateReservation, 
        cancelReservation } = require("../../../controllers/reservationsController");
const router = express.Router();



router.route("/").get(getAllReservations).post(createReservation);
router.route("/:id").get(getReservation).put(updateReservation).delete(cancelReservation);


module.exports = router;

