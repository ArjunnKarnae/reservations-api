const express = require("express");
const { retrieveGuestsStaySummary, searchStays } = require("../controllers/staysSummaryController");
const validateJwtToken = require("../middleware/jwtTokenValidator");

const router = express.Router();
router.use(validateJwtToken);
router.route("/:guestMemberId").get(retrieveGuestsStaySummary);
router.route("/search").post(searchStays);

module.exports = router;


