const express = require("express");
const app = express();

require('dotenv').config();
require('./config/database').connect();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/v1',require('./routes/user.route'));

app.listen(PORT,()=>{
    console.log(`You app is listen at ${PORT}`);
})
