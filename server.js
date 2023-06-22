const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const ticketRoutes = require('./routes/tickets');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use(ticketRoutes);

const port= 4003;
const DB_URL='mongodb+srv://eakushan:200058@cluster0.yhgvoym.mongodb.net/mernCrud?retryWrites=true&w=majority'

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log('DB Connected');
})
.catch((err) =>console.log('DB connection error'));


app.listen(port,()=>{
    console.log(`App is running on ${port}`);
});