const express = require("express");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/routes");
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use("/employee", employeeRouter);
console.log('connecting...')
mongoose
    .connect(
        // insert a url that get from mongodb and set your username and password
        "mongodb+srv://mhmdasadi1367:Calmo0102@my-app.xcwxmzh.mongodb.net/",
        { dbName: "employeeManagement" },
        { collection: "employees" }
    )
    .then(() => app.listen(5000, () => console.log("server started in port 5000")))
    .catch(() => console.log("Could not connect to Data Base!"));
