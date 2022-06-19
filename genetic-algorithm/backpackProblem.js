// Función principal donde se establecen los valores
// y se llaman a las otras funciones
const prompt = require('prompt-sync')();
function main() {
    const itemsWeight = [22, 39, 99, 63, 68, 2];
    const itemsValue = [43, 3, 45, 12, 43, 16];
    const backpackSize = 150;
    const probCrossing = 0.75;
    let populationSize = 0;
    while (populationSize <= 0) {
        populationSize = prompt('¿De qué tamaño quieres la población? ');
    }
    const population = getInitialPopulation(populationSize, itemsWeight);
    const populationWeights = getPopulationWeights(population, itemsWeight);
    const populationFitness = getPopulationFitness(
        population,
        populationWeights,
        itemsValue,
        backpackSize
    );
    
    console.log('population', population);
    console.log('populationWeights', populationWeights);
    console.log('populationFitness', populationFitness);
    const fathers = getFathers(population, populationFitness);
    console.log('fathers', fathers);
    const sons = crossing(fathers, probCrossing);
    console.log('Sons', sons);
}
main();

//La funcion getInitialPopulation toma como parametros el tamaño de la población y el peso de los objetos
//y retorna la población inicial

function getInitialPopulation(populationSize, itemsWeight) {
    const populationBuff = [];

    //Mediante 2 fors va creando los vectores
    //El primer for crea el vector y el segundo
    //for genera el numero aleatorio ya sea 0 ó 1
    for (let i = 0; i < populationSize; i++) {
        const individualBuff = [];
        for (let j = 0; j < itemsWeight.length; j++) {
            const randomNum = Math.round(Math.random() * 1);

            //Para agregar el valor al final al arreglo se hace uso del metodo push
            individualBuff.push(randomNum);
        }
        populationBuff.push(individualBuff);
    }
    return populationBuff;
}

//La función getPopulationWights retorna el peso total de cada individuo

function getPopulationWeights(population, itemsWeight) {
    //El método map nos permite iterar sobre el arreglo
    const populationWeights = population.map((individual) => {
        //El método reduce nos permite llamar cada elemento del vector
        return individual.reduce((acc, itemBool, index) => {
            if (itemBool === 0) {
                return acc;
            }
            return acc + itemsWeight[index];
        }, 0);
    });
    return populationWeights;
}

//La función getPopultationFitness retorna el fitness de cada individuo

function getPopulationFitness(
    population,
    populationWeights,
    itemsValue,
    backpackSize
) {
    const populationFitnessBuff = population.map((individual, index) => {
        //Si el peso es mayor a la capacidad se retorna a 0
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

//La función getFathers retorna los padres seleccionados

function getFathers(population, populationFitness) {
    //Elige aleatoriamente los individuos que competiran

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

function crossing(fathers, probCrossing){
    
    const sonsBuff = [];

    let i;
    for(i=0 ; i<fathers.length ; i+=2){
        const randomNum1 = Math.round(Math.random() * (fathers[i].length));
        const randomNum2 = Math.round(Math.random() * (fathers[i].length));
        const randomNumCrossing = Math.round(Math.random() * 1);
        sonsBuff.push(fathers[i]);
        sonsBuff.push(fathers[i+1]);

        console.log("CROSSING");
        console.log('father1', fathers[i]);
        console.log('father2', fathers[i+1]);
        console.log(`Random1-> ${randomNum1}`);
        console.log(`Random2-> ${randomNum2}`);

        //Puede que no haya cruce por la probabilidad de cruce
        if(randomNumCrossing < probCrossing){
            if(randomNum1 < randomNum2 || randomNum2 < randomNum1){      

                if(randomNum1 < randomNum2){
                    let middle1 = sonsBuff[i].slice(randomNum1, randomNum2)                

                    let middle2 = sonsBuff[i+1].slice(randomNum1, randomNum2)
                    
                    sonsBuff[i].splice(randomNum1, middle1.length, ...middle2)

                    sonsBuff[i+1].splice(randomNum1, middle1.length, ...middle1)
                } else{
                    let cutRight = sonsBuff[i+1].slice(0, randomNum2)
                    let cutLeft = sonsBuff[i].slice(0, randomNum2);
                    console.log(`Este es el corte 1 ->${cutLeft}`)
                    sonsBuff[i].splice(0,randomNum2,...cutRight);
                    
                    
                    console.log(`Este es el corte 2 ->${cutRight}`)
                    sonsBuff[i+1].splice(0,randomNum2,...cutLeft);

                    //Aun no funciona el corte de la derecha
                    cutLeft = sonsBuff[i].slice(randomNum1, sonsBuff[i].length+1)
                    console.log(`Este es el corte 1 derecha ->${cutLeft}`)
                    sonsBuff[i].splice(randomNum1,sonsBuff[i].length - randomNum1,...cutLeft);
                    console.log(`Argumento 1->${randomNum1-1}, argumento 2->${sonsBuff[i].length - randomNum1}`);

                    cutRight = sonsBuff[i+1].slice(randomNum1, sonsBuff[i].length+1)
                    console.log(`Este es el corte 2 derecha ->${cutRight}`)
                    sonsBuff[i+1].splice(randomNum1,sonsBuff[i].length - randomNum1,...cutRight);

                    console.log(`El hijo 1 quedo asi ->${sonsBuff[i]}`)
                    console.log(`El hijo 2 quedo asi ->${sonsBuff[i+1]}`)

                }

            }
        }
        console.log("No hubo crossing por probabilidad de cruce");

    }

    return sonsBuff;

    
}