const { app } = require("./serverUtil");
const port = process.env.PORT || 5001;
const dotenv = require("dotenv").config();
const connectDB = require("./src/config/dbConnection");

connectDB();
app.listen(port, () => {
    console.log("Server has started");
});



