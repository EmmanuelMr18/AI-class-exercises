function main() {
    const itemsWeight = [22, 39, 99, 63, 68, 2];
    const itemsValue = [43, 3, 45, 12, 43, 16];
    const backpackSize = 150;
    const population = getInitialPopulation(8, itemsWeight);
    const populationWeights = getPopulationWeights(population, itemsWeight);
    const populationFitness = getPopulationFitness(
        population,
        populationWeights,
        itemsValue,
        backpackSize
    );
    const fathers = getFathers(population, populationFitness);
    console.log('population', population);
    console.log('populationWeights', populationWeights);
    console.log('populationFitness', populationFitness);
    console.log('fathers', fathers);
}
main();

function getInitialPopulation(populationSize, itemsWeight) {
    const populationBuff = [];
    for (let i = 0; i < populationSize; i++) {
        const individualBuff = [];
        for (let j = 0; j < itemsWeight.length; j++) {
            const randomNum = Math.round(Math.random() * 1);
            individualBuff.push(randomNum);
        }
        populationBuff.push(individualBuff);
    }
    return populationBuff;
}

function getPopulationWeights(population, itemsWeight) {
    const populationWeights = population.map((individual) => {
        return individual.reduce((acc, itemBool, index) => {
            if (itemBool === 0) {
                return acc;
            }
            return acc + itemsWeight[index];
        }, 0);
    });
    return populationWeights;
}

function getPopulationFitness(
    population,
    populationWeights,
    itemsValue,
    backpackSize
) {
    const populationFitnessBuff = population.map((individual, index) => {
        if (populationWeights[index] > backpackSize) {
            return 0;
        }
        return individual.reduce((acc, itemBool, index) => {
            if (itemBool === 0) {
                return acc;
            }
            return acc + itemsValue[index];
        }, 0);
    });
    return populationFitnessBuff;
}

function getFathers(population, populationFitness) {
    const fathersBuff = population.map((_, index) => {
        const randomNum1 = Math.round(Math.random() * (population.length - 1));
        const randomNum2 = Math.round(Math.random() * (population.length - 1));
        const contender1 = population[randomNum1];
        const contender2 = population[randomNum2];
        const fitness1 = populationFitness[randomNum1];
        const fitness2 = populationFitness[randomNum2];

        console.log(`Iteración No. ${index + 1}`);
        console.log('contender1', contender1);
        console.log('contender2', contender2);
        console.log('fitness1', fitness1);
        console.log('fitness2', fitness2);
        console.log('---------------------');

        if (fitness1 === fitness2 || fitness1 > fitness2) {
            return contender1;
        }
        return contender2;
    });
    return fathersBuff;
}
