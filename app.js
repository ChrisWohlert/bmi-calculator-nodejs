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
    const bmi = calculator.calculateBMI(cm, kg);
    const category = tryCalculateCategory(bmi);
    res.render("pages/result", {
        bmi: bmi,
        category: category
    });
});

app.get("/waistHipResult", (req, res) => {
    const { waist, hip, sex } = req.query;
    const ratio = calculator.calculateWaistToHipRatio(waist, hip);
    const category = tryCalculateWaistHipCategory(ratio, sex);
    res.render("pages/waistHipResult", {
        waistToHip: ratio,
        category: category
    });
});

function tryCalculateCategory(bmi) {
    let category;
    try {
        category = calculator.calculateCategory(bmi);
    }
    catch (err) {
        category = err;
    }
    return category;
}

function tryCalculateWaistHipCategory(ratio, sex){
    try{
        return (sex == "male" ? calculator.calculateWaistToHipCategoryForMales : calculator.calculateWaistToHipCategoryForFemales)(ratio);
    }catch (err) {
        return err;
    }
}

var port = 8080;
console.log("App is running on http://localhost:"+port)
app.listen(port);
