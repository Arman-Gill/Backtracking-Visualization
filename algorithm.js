import {printStep, printStepCount} from './steps.js'
import {addClass, removeClass, editInnerHTML} from './helperFunctions.js'

let solutionFound = false
let stopExecution = false
let stepCount = 0
let boardValues = null
let totalStepCount = null
let cells = null
let minVisualizationSpeed = 300
let VisualizationSpeed = 0

export function changeSpeed(percentageValue){
    VisualizationSpeed = minVisualizationSpeed - ((percentageValue * minVisualizationSpeed) / 100)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function incrementStepCount(){
    stepCount = stepCount + 1;
}

function updateSolutionFound(){
    solutionFound = !solutionFound
  }

async function updateCells(row, col, value){
    const calculatedIndex = (9*row) + col
    const concernedCell = cells[calculatedIndex]
    if(value !== 0 && boardValues[row][col] === 0){
        incrementStepCount()
        printStep('blue', value)
        printStepCount(stepCount, totalStepCount)
        addClass(concernedCell, 'blueCell')
        editInnerHTML(concernedCell, value)
        }
    
    else if (value !== 0 && boardValues[row][col] !== 0){
        incrementStepCount()
        printStepCount(stepCount, totalStepCount)
        printStep('red', boardValues[row][col])
        printStep('black', boardValues[row][col])
        removeClass(concernedCell, 'blueCell')
        addClass(concernedCell, 'redCell')
        addClass(concernedCell, 'animatedCell')
       
        await sleep(150 + VisualizationSpeed)
        editInnerHTML(concernedCell, value)
        removeClass(concernedCell, 'redCell')
        removeClass(concernedCell, 'animatedCell')
        addClass(concernedCell, 'blueCell')
        
    }
    
    else if(value === 0 && boardValues[row][col] !== 0){
        incrementStepCount()
        printStep('red', boardValues[row][col])
        printStepCount(stepCount, totalStepCount)
        printStep('black', boardValues[row][col])
        removeClass(concernedCell, 'blueCell')
        addClass(concernedCell, 'redCell')
        addClass(concernedCell, 'animatedCell')
    
        await sleep(150 + VisualizationSpeed)
        editInnerHTML(concernedCell, '')
        removeClass(concernedCell, 'redCell')
        removeClass(concernedCell, 'animatedCell')
        
    }

  }

function updateBoardValues(row, col, value){

    boardValues[row][col] = value
    
  }

 function checkRow(row, num){ 
    
    for(let i=0; i<9; i++){
      if (boardValues[row][i] === num){
        return false
      }
          
    }

  return true
  }


 function checkCol(col, num){
  
  for(let i=0; i<9; i++){
    if(boardValues[i][col] === num) return false
  }
  return true
}


 function checkSquare(row, col, num){

  let srow = row - (row%3)
  let erow = srow + 3
  let scol = col - (col%3)
  let ecol = scol + 3



  for(let i=srow; i<erow;i++){
    for(let j=scol;j<ecol;j++){
      if(boardValues[i][j] === num){
        return false
      } 
    }
  }

  return true
}
  
 function validity(row, col, num){
  return ( checkRow(row, num) && checkCol(col, num) && checkSquare(row, col, num))
}

async function solve(row, col){
  

    if(solutionFound) return
  
    if(row===8 && col===8){
      if(boardValues[row][col] !== 0){
        updateSolutionFound()
        return
      }
    
      for(let i=1; i<10; i++){
        
        const isValid = validity(row, col, i)
        if (isValid){
            await updateCells(row, col, i)
            updateBoardValues(row, col, i)
            updateSolutionFound()
            await sleep(VisualizationSpeed)
        }
        
      }
      return
    
    }
  
    if(boardValues[row][col] !== 0){
      if(col === 8){
        await solve(row+1, 0)
        if(stopExecution) return
        if(solutionFound) return
        
      }
      else{
        await solve(row, col+1)
        if(stopExecution) return
        if(solutionFound) return
        
      }
      return
    }
  
    for(let i=1; i<10;i++){
     
      if(validity(row, col, i) === false){
        continue
      }
  
      await updateCells(row, col, i)
      updateBoardValues(row, col, i)
      await sleep(VisualizationSpeed)
      
  
      if(col === 8){
        await solve(row+1, 0)
        if(stopExecution) return
        if(solutionFound) return
        
        
      }
      else{
        await solve(row, col+1)
        if(stopExecution) return
        if(solutionFound) return
        
      }
  
    }
    if(solutionFound) return
    else {
      await updateCells(row, col, 0)
      updateBoardValues(row, col, 0)
      await sleep(VisualizationSpeed)
      return
    }
  
}

export function stop(){
    stopExecution = true
}


export async function run(cellsTemp, boardValuesTemp, totalStepCountTemp, speed){
   cells = cellsTemp
   boardValues = boardValuesTemp
   totalStepCount = totalStepCountTemp
   changeSpeed(speed)

   await solve(0, 0)

   stopExecution = false
   stepCount = 0

   if(solutionFound){
    printStep('green');
    updateSolutionFound()
    return true
   }

   else{
    return false
   }

  
}

//                        ALGORITHM ENDS
