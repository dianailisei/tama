function clearInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = '';
    }
}

function CustomAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Warning";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();

function createElement(tagName, classNames = [], id = '', text = '', attributes = {}, datasets={}) {
    let element = document.createElement(tagName);
    if(classNames !== []) {
        classNames.forEach(cls => {
            element.classList.add(cls);
        })
    }
    if (id !== ''){
        element.id = id;
    }
    if(text !== '') {
        element.innerText = text;
    }
    if(attributes != {}) {
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr]);
        })
    }
    if(datasets !== {}) {
        Object.keys(datasets).forEach(key => {
            element.dataset[key] = datasets[key];
        })
    }
    return element;
}

function addClass(id, className) {
    let element = document.getElementById(id);
    element.classList.add(className);
}

function appendChildren(element, children){
    children.forEach(child => {
        element.appendChild(child);
    })
}

function changePetEyesColor(pet, petContent) {
    // console.log(pet.eyesColor);
    var petEyes = petContent.getElementsByClassName("pet-eyes");
    // console.log(petEyes);

    for (var i = 0; i < petEyes.length; i++) {
        petEyes.item(i).style.fill = pet.eyesColor;
        // console.log(petEyes.item(i) +" " +pet.eyesColor);
    }
}

function changePetColor(pet, petContent) {
    var petColor = petContent.getElementsByClassName("pet-body");
    // console.log(petColor);

    for (var i = 0; i < petColor.length; i++) {
        petColor.item(i).style.fill = pet.bodyColor;
        // console.log(petColor.item(i) +" " +pet.bodyColor);
    }
}
