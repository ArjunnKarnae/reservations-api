const express = require("express");
const { retrieveGuestsStaySummary, searchStays } = require("../../../controllers/staysSummaryController");


const router = express.Router();

router.route("/:guestMemberId").get(retrieveGuestsStaySummary);
router.route("/search").post(searchStays);

module.exports = router;


