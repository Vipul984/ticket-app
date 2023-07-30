require('dotenv').config()
const express = require('express');
const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require("./routes/bookingsRoute");
const app = express();

const dbConfig = require('./config/dbconfig');
const port = process.env.PORT || 6000;
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings', bookingsRoute)

app.listen(port, () => { console.log(`server started at port ${port}`) })