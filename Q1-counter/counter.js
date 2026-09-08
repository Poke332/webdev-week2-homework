let counter = 0;
            
function add() {
    counter++;
    document.querySelector('h1').innerHTML = counter;
}

function decrease() {
    counter--;
    if (counter < 0) {
        counter = 0;
        alert("Counter cannot go below 0");
    }
    document.querySelector('h1').innerHTML = counter;
}

function reset() {
    counter = 0;
    document.querySelector('h1').innerHTML = counter;
}
