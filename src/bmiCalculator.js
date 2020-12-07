


const calculateBMI = (cm, kg) => {
    const meter = cm / 100;
    const bmi = kg / (meter * meter);
    return bmi;
}

const calculateCategory = (bmi) => {
    if (isNaN(bmi)) {
        throw 'BMI must be a number';
    }
    else if (bmi < 0) {
        throw 'BMI cannot be a negative value';
    }
    else if (bmi == 0) {
        throw 'BMI cannot be zero';
    }
    else if (bmi < 18.5) {
        return categories.underweight;
    }
    else if (bmi < 25) {
        return categories.healthy;
    }
    else if (bmi < 30) {
        return categories.overweight;
    }
    else {
        return categories.obese;
    }
}

const categories = {
    underweight: "Underweight",
    healthy: "Healthy",
    overweight: "Overweight",
    obese: "Obese"
}

const calculateWaistToHipRatio = (waist, hip) => waist / hip;

const waistHipCategories = {
    normal: "Normal weight",
    overweight: "Overweight",
    obese: "Obese"
}

module.exports = {
    calculateBMI,
    calculateCategory,
    categories,
    calculateWaistToHipRatio,
    waistHipCategories
}