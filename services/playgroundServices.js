var petContainer = document.getElementById("svg_30");
var petReaction = document.getElementById("pet-reaction");
var petMood = document.getElementById("pet-belly");
var petState = document.getElementById("pet-state");
var pss = document.getElementById("sympathy-level");
var pfs = document.getElementById("food-level");
var pes = document.getElementById("energy-level");
var xp = document.getElementById("xp-level");

function changeMood(){
    if(pfs.value < 50 || pes.value <50){
        petMood.style.fill = "yellow";
    }
    else if(pss.value < 50) {
        petMood.style.fill = "red";
    }else {
        petMood.style.fill = "white";
    }
}

(function decreaseStatus(){
    setTimeout(() => {
        pss.value--;
        pfs.value--;
        pes.value--;
        //console.log(pes.value+" "+pfs.value+" "+pss.value);
        changeMood();
        updatePetStateInBD();
        decreaseStatus();
    }, 6000);
})();

function doSpecificAnimation() {
    petReaction.classList.add("pet-reaction-animation");
    petReaction.style.visibility = "visible";
    rollAndMove();
  
    setTimeout(() => {
        petReaction.style.visibility = "hidden";
        petReaction.classList.remove("pet-reaction-animation");
        removeClassAnimation();
    }, 5000);
}

function changeAnimation(option) {
    if (option == 'sympathy') {
        petReaction.innerHTML = "💖";
        pss.value = pss.value + 3;
    } else if (option == 'food') {
        petReaction.innerHTML = "🎂";
        pfs.value = pfs.value + 3;
    } else if (option == 'energy') {
        petReaction.innerHTML = "💤";
        pes.value =pes.value + 3;
    }
    changeMood();
}

function showPetState() {
    petState.style.visibility = "visible";
}

function hidePetState() {
    petState.style.visibility = "hidden";
}

function rollAndMove(){
    var element = document.getElementById("pet-container");
    element.classList.add("rollAndMoveRight");
}

function rollPet(){
    var element = document.getElementById("pet-container");
    element.classList.add("roll");
}


function movePet(){
    var element = document.getElementById("pet-container");
    element.classList.add("moveRight");
}

function removeClassAnimation(){
    var element = document.getElementById("pet-container");
    element.classList.remove("roll");
    element.classList.remove("moveRight");
    element.classList.remove("rollAndMoveRight");

}

//post pet obj
function updatePetStateInBD() {
    var update = new Object;
    update.Id = 4;
    update.XPStatus = xp.value;  
    update.EnergyStatus = pes.value;
    update.LoveStatus = pss.value;
    update.PlayStatus = pfs.value;


    var jsonString = JSON.stringify(update);
    console.log(jsonString);
    putToServer("http://localhost:5000/api/playground", jsonString);
}


//get pet obj
getFromServer("http://localhost:5000/api/playground", updatePetStatusShown);
function updatePetStatusShown(data) {
   // console.log(data);
    var obj = JSON.parse(data);
    //console.log(obj);
    //console.log(obj[0].EnergyStatus);
    xp.value = (obj[0].XPStatus).toString();
    pss.value = (obj[0].LoveStatus).toString();
    pes.value = (obj[0].EnergyStatus).toString();
    pfs.value = (obj[0].PlayStatus).toString();//should've been food 
    changeMood();
}
