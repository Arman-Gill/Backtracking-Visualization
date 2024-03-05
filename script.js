import sudokuSamples from './data.json' assert {type: 'json'};
import {printStep, printStepCount} from './steps.js';
import {run, changeSpeed, stop} from './algorithm.js'
import { addClass, removeClass, editInnerHTML } from './helperFunctions.js';

const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
const changeBoardButton = document.querySelector('#changeBoardButton');
const speedValueRange = document.querySelector('#speedValue');
const screen = document.querySelector('#steps');
const stepCountScreen = document.querySelector('#stepCount');
const cells = document.querySelectorAll('.cell');
let boardData = sudokuSamples;
let currentBoardSample = 0

function fetchBoardValues(){
    return boardData[currentBoardSample].board
}

function fetchTotalStepCount(){
    return boardData[currentBoardSample].stepsToCompletion
}

function returnCopyofBoardValues(boardToBeCopied){
    let copy = []
    for (let i=0; i<9; i++){
        copy.push(boardToBeCopied[i].slice())
    }
    return copy
}

let visualizationOn = false;



speedValueRange.addEventListener('change', ()=>{
    changeSpeed(speedValueRange.value)
})

function incrementCurrentBoardSample(){
    currentBoardSample = currentBoardSample + 1
    if (currentBoardSample === boardData.length){
        currentBoardSample = 0
    }
    const boardValues = fetchBoardValues()
}

function changeBoard(){
    incrementCurrentBoardSample()
    emptyBoard()
    placeBoardValues()

}

function updateVisualizationOn(){
    visualizationOn = !visualizationOn
}

/*async function startVisualization(){
    if (visualizationOn === false){
        updateVisualizationOn()

        addClass(changeBoardButton, 'disabledButton')
        removeClass(stopButton, 'disabledButton')

        startButton.removeEventListener('click', startVisualization)
        stopButton.addEventListener('click', stopVisualization)
        changeBoardButton.removeEventListener('click', changeBoard)

        addClass(startButton, 'disabledButton')
        const boardValues = fetchBoardValues()
        const boardValuesCopy = returnCopyofBoardValues(boardValues)
        const totalStepCount = fetchTotalStepCount()
        const solutionFound = await run(cells, boardValuesCopy, totalStepCount, speedValueRange.value);
        if (solutionFound){
            successfulCompletionAnimation()
        } 
        else {
            reset()
        }
    
}}*/

async function startVisualization(){

        updateVisualizationOn()

        addClass(changeBoardButton, 'disabledButton')
        removeClass(stopButton, 'disabledButton')
        addClass(startButton, 'disabledButton')

        startButton.removeEventListener('click', startVisualization)
        stopButton.addEventListener('click', stopVisualization)
        changeBoardButton.removeEventListener('click', changeBoard)

        
        const boardValues = fetchBoardValues()
        const boardValuesCopy = returnCopyofBoardValues(boardValues)
        const totalStepCount = fetchTotalStepCount()
        const solutionFound = await run(cells, boardValuesCopy, totalStepCount, speedValueRange.value);
        if (solutionFound){
            successfulCompletionAnimation()
        } 
        else {
            reset()
        }
    
}

/*function stopVisualization(){
    if (visualizationOn){
        stop()
        reset()
        
    }
    else{
        reset()
    }
    
}*/
function stopVisualization(){
    if(visualizationOn === true)
    {
    stop()
    reset()}

    else{
        reset()
    }
}

function successfulCompletionAnimation(){
    //startButton.addEventListener('click', startVisualization)
    //changeBoardButton.addEventListener('click', changeBoard)
    //removeClass(startButton, 'disabledButton')
    //removeClass(changeBoardButton, 'disabledButton')
    updateVisualizationOn()
    editInnerHTML(stopButton, 'Reset')
    
    
}

function emptyBoard(){
    cells.forEach(cell => {
        editInnerHTML(cell, '')
        removeClass(cell, 'blueCell')
        removeClass(cell, 'prefilledCell')
    })
}

function reset(){
    if(visualizationOn === true){
        updateVisualizationOn()
    }
    
    editInnerHTML(stopButton, 'Stop Visualization')
    const blueCells = document.querySelectorAll('.blueCell')
    blueCells.forEach(cell => {
        removeClass(cell, 'blueCell')
        editInnerHTML(cell, '')
    })
    editInnerHTML(screen, '')
    editInnerHTML(stepCountScreen, '')

    startButton.addEventListener('click', startVisualization)
    changeBoardButton.addEventListener('click', changeBoard)
    stopButton.removeEventListener('click', stopVisualization)
    removeClass(changeBoardButton, 'disabledButton')
    removeClass(startButton, 'disabledButton')
    addClass(stopButton, 'disabledButton')

    speedValueRange.value = 50
}


function placeBoardValues(){
    const boardValues = fetchBoardValues()
    for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
            const calculatedIndex = (row * 9) + col ;
            if(boardValues[row][col] !== 0){
                
                addClass(cells[calculatedIndex], 'prefilledCell')
                editInnerHTML(cells[calculatedIndex], boardValues[row][col])
                
            }
        }
    }
}

function main(){
    placeBoardValues()
    speedValueRange.value = 50
    addClass(stopButton, 'disabledButton')
    startButton.addEventListener('click', startVisualization);
    stopButton.addEventListener('click', stopVisualization);
    changeBoardButton.addEventListener('click', changeBoard);
}

main()