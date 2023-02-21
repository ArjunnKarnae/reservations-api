Steps for running the app 
1. Checkout the code from GIT using url "https://github.com/ArjunnKarnae/reservations-api.git"
2. Run the command "npm install" to download the dependencies
3. Run the command npm run dev to start the server
4. Go to url "http://localhost:5001/api-docs" to render the swagger UI page
5. First access the POST /register to create a new user or use the credentials [username: "admin", email: "admin@testmail.com", password: "adminPwd"] to hit the /login endpoint to receive the JWT access token which is valid for 5 mins
6. Grab the JWT token, and set it to the Authorization header as "Bearer <AccessToken>" and then access the other endpoints

