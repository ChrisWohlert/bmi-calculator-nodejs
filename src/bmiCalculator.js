


const calculateBMI = (cm, kg) => {
    const meter = cm / 100;
    const bmi = kg / (meter * meter);
    return  { value: bmi, category: calculateCategory(bmi) };
}    

const calculateCategory = (bmi) => {
    if(bmi < 18.5){
        return categories.underweight;
    }
}

const categories = {
    underweight: "Underweight",
    healthy: "Healthy",
    overweight: "Overweight",
    obese: "Obese"
}


module.exports = {
    calculateBMI,
    categories
}