function rollAndMoveRight(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("rollAndMoveRight");
}
function rollAndMoveLeft(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("rollAndMoveLeft");
}
function rollPet(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("roll");
}

function movePetLeft(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("moveLeft");
}

function movePetRight(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("moveRight");
}

function jumpUp(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.add("jumpUp");
}

function removeClassAnimation(id) {
    var element = document.getElementById(`${id}-content`);
    element.classList.remove("roll");
    element.classList.remove("moveRight");
    element.classList.remove("rollAndMoveRight");
    element.classList.remove("moveLeft");
    element.classList.remove("rollAndMoveLeft");
    element.classList.remove("jumpUp");
}
