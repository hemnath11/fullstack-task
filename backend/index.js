const express = require('express');
const authRouter = require('./controller/auth-controller');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')

var app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static('public'))
var port = process.env.PORT || 4001;

const db = require('./model');
const userRouter = require('./controller/user-controller');
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  app.use(cors())
app.use("/auth" , authRouter);
app.use("/users" , userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})