export function addClass(element, className){
    element.classList.add(className)
}

export function removeClass(element, className){
    element.classList.remove(className)
}

export function editInnerHTML(element, string){
    element.innerHTML = string
}