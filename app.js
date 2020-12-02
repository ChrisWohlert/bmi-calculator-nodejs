var express = require("express");
const calculator = require("./src/bmiCalculator.js");

// create express app
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/landing");
});

app.get("/result", (req, res) => {
    const { cm, kg } = req.query;
    let bmi;
    let category;
    try {
        bmi = calculator.calculateBMI(cm, kg);
        category = calculator.calculateCategory(bmi);
    }
    catch (err) {
        bmi = 0;
        category = err;
    }
    res.render("pages/result", {
        bmi: bmi,
        category: category
    });
});

var port = 8080;
console.log("App is running on http://localhost:"+port)
app.listen(port);
