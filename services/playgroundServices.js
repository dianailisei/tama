var petContainer = document.getElementById("svg_30");
var petReaction = document.getElementById("pet-reaction");
var petState = document.getElementById("pet-state");
var pss = document.getElementById("sympathy-level");
var pfs = document.getElementById("food-level");
var pes = document.getElementById("energy-level");
var xp = document.getElementById("xp-level");

//post pet obj
function updatePetStateInBD(d) {
    var obj = JSON.parse(d);
    var update = new Object;
    update.Id = obj[0].Id;
    if (obj[0].XPStatus != xp.value) {
        update.XPStatus = xp.value;
    }
    if (obj[0].EnergyStatus != pes.value) {
        update.EnergyStatus = pes.value;
    }
    if (obj[0].LoveStatus != pss.value) {
        update.LoveStatus = pss.value;
    }
    if (obj[0].PlayStatus != pfs.value) {
        update.PlayStatus = pfs.value;
    }

    var jsonString = JSON.stringify(update);
    console.log(jsonString);
    postToServer("http://localhost:5000/api/testpost", jsonString);
}


//get pet obj
getFromServer("http://localhost:5000/api/test", {}, updatePetStatusShown);
function updatePetStatusShown(data) {
    console.log(data);
    var obj = JSON.parse(data);
    console.log(obj);
    console.log(obj[0].EnergyStatus);
    pss.value = (obj[0].LoveStatus).toString();
    pes.value = (obj[0].EnergyStatus).toString();
    pfs.value = (obj[0].PlayStatus).toString();//should've been food 

    updatePetStateInBD(data);
}

function doSpecificAnimation() {
    petReaction.classList.add("pet-reaction-animation");

    petReaction.style.visibility = "visible";
    setTimeout(() => {
        petReaction.style.visibility = "hidden";
        petReaction.classList.remove("pet-reaction-animation");
    }, 5000);
}
function changeAnimation(option) {
    if (option == 'sympathy') {
        petReaction.innerHTML = "💖";
    } else if (option == 'food') {
        petReaction.innerHTML = "🎂";
    } else if (option == 'energy') {
        petReaction.innerHTML = "💤";
    }
}

function showPetState() {
    // petContainer.addEventListener("mouseover", function( event ) {   
    // highlight the mouseover target
    // event.target.style.visibility = "hidden";

    // }, false);
    petState.style.visibility = "visible";
}

function hidePetState() {
    // petContainer.addEventListener("mouseout", function( event ) {   
    // highlight the mouseout target
    // event.target.style.visibility = "visible";
    // }, false);
    petState.style.visibility = "hidden";
}

