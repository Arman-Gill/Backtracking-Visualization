const screen = document.querySelector('#steps');
const stepCountScreen = document.querySelector('#stepCount');

export function printStep(code, value){
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('stepDiv')

    const dot = document.createElement('div')
    dot.classList.add('dot')
    const text = document.createElement('div')

    if (code === 'blue'){
        dot.classList.add('blueDot')
        text.innerHTML = 'Valid Value, Trying: ' + value;
        
    }
    else if (code === 'red'){
        dot.classList.add('redDot')
        text.innerHTML = 'Can not continue with value: ' + value;
        
    }
    else if (code === 'black'){
        dot.classList.add('blackDot')
        text.innerHTML = 'Removing value: ' + value;
        
    }

    else if (code === 'green'){
        dot.classList.add('greenDot')
        text.innerHTML = 'Success! Grid complete.'
    }

    mainDiv.appendChild(dot)
    mainDiv.appendChild(text)
    screen.appendChild(mainDiv);
    screen.scrollTop = screen.scrollHeight;
    

    
}

export function printStepCount(count, totalCount){
    stepCountScreen.innerHTML = count + ' OF ' + totalCount + ' STEPS '
}