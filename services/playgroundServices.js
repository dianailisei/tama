// TODO: constructor for pets[]
// TODO: correct http requests
// TODO: import extern templates(for add-pet & playground)
// TODO: refactor some code... 'cause it needs it  

const NR_INCREMENT = 3;

function petConstructor(id, name, type, bodyColor, eyesColor, xp, foodLevel, sympathyLevel, energyLevel, age, description){
    this.id = id;
    this.name = name;
    this.type = type;
    this.bodyColor = bodyColor;
    this.eyesColor = eyesColor;
    this.xp = xp;
    this.foodLevel = foodLevel;
    this.sympathyLevel = sympathyLevel;
    this.energyLevel = energyLevel;
    this.age = age;
    this.description = description;
    this.doSpecificAnimation = function() {
        // this.changeAnimation();
        console.log(`you've clicked on ${this.id}: ${this.foodLevel}   ${this.sympathyLevel}  ${this.energyLevel}!`);
        var petReaction = document.getElementById(`${this.id}-reaction`);
        petReaction.classList.add("pet-reaction-animation");
        petReaction.style.visibility = "visible";
        // // rollAndMove();
    
        setTimeout(() => {
            petReaction.style.visibility = "hidden";
            petReaction.classList.remove("pet-reaction-animation");
            // removeClassAnimation();
        }, 5000);
    }
    this.showPetState =  function(){
        var petState = document.getElementById(`${this.id}-state`);
        petState.style.visibility = "visible";
    }
    this.hidePetState =  function() {
        var petState = document.getElementById(`${this.id}-state`);
        petState.style.visibility = "hidden";
    }
    this.changeMood = function(){

        var petMood = document.getElementById(this.id).getElementsByClassName("pet-body");
        if(this.Level < 50 || this.energyLevel <50){
            petMood.item(i).style.fill = "yellow";
        }
        else if(this.sympathyLevel < 50) {
            petMood.item(i).style.fill = "red";
       } else {
            for(let i= 0; i < petMood.length; i++){
                petMood.item(i).style.fill = this.bodyColor;
            }
        }
    }
    this.changeAnimationSleepy = function () {
        var petReactionSleepy = document.getElementById(`${this.id}-sleepy`);
        var petReaction = document.getElementById(`${this.id}-reaction`);
        
        petReaction.innerHTML = "💤";
        this.energyLevel = this.energyLevel + NR_INCREMENT;

        this.changeMood();        
    }
    this.changeAnimationFood = function () {
        var petReactionFood = document.getElementById(`${this.id}-food`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "🎂";
        this.foodLevel = this.foodLevel + NR_INCREMENT;

        this.changeMood();        

    }
    this.changeAnimationHeart = function () {
        var petReactionHeart = document.getElementById(`${this.id}-heart`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "💖";
        this.sympathyLevel = this.sympathyLevel + NR_INCREMENT;

        this.changeMood();        

    }    
    (function decreaseStatus(){
        setTimeout(() => {
            this.foodLevel--;
            this.energyLevel--;
            this.sympathyLevel--;
            changeAnimation();
            // updatePetStateInBD();
            decreaseStatus();
        }, 6000);
    })();
    
}

var pets = [];

var pet1 = new petConstructor("pet1", "tama", "penguin", "#fff7c0", "#0b3c5d", 1, 67, 35, 98, 300, null);
var pet2 = new petConstructor("pet2", "COCO", "spider", "#660066", "#fff7c0", 5, 39, 85, 120, 13, null);
var pet3 = new petConstructor("pet3", "Bibo", "fish", null, "#caebf2", 5, 39, 85, 180, 8, null);

pets.push(pet1, pet2, pet3);

console.log(pets);

(function (){
var elements = document.getElementsByClassName("pet-wrapperCont");
    let templ = document.getElementById("templatePetWrapper");
    for (let i =0 ; i < pets.length; i++){
        elements[i].innerHTML = templ.innerHTML;
    }
    AddSpecific();
    
})()

function AddSpecific() {
    var elements = document.querySelectorAll("[data-insert-pet]");
    if(elements) {
    for(var i = 0; i< elements.length; i++) {
        var currentElement = elements[i];
        
        var currentPet = eval(currentElement.dataset.insertPet);
        currentElement.querySelector(".pet-reaction").id = currentPet.id + "-reaction";
        
        var currentStateElement = currentElement.querySelector(".pet-state");
        currentStateElement.id = currentPet.id + "-state";
        
        var foodLevelEl = currentStateElement.querySelector(".food-level");
        foodLevelEl.id = currentPet.id + "-food-level";
        foodLevelEl.value = currentPet.foodLevel;
        var foodImg = currentStateElement.querySelector(".img-pet food");
        foodImg.id = currentPet.id + "-food";
        
        var sympthLevelEl = currentStateElement.querySelector(".sympathy-level");
        sympthLevelEl.id = currentPet.id + "-sympathy-level";
        sympthLevelEl.value = currentPet.sympathyLevel;
        var sympthImg = currentStateElement.querySelector(".img-pet heart");
        sympthImg.id = currentPet.id + "-heart";
        

        var energyLevelEl = currentStateElement.querySelector(".energy-level");
        energyLevelEl.id = currentPet.id + "-energy-level";
        energyLevelEl.value = currentPet.energyLevel;        
        var energyImg = currentStateElement.querySelector(".img-pet sleepy");
        energyImg.id = currentPet.id + "-sleepy";
        
        var currentPetContent = currentElement.querySelector(".pet-content");
        currentPetContent.id = currentPet.id + "-content";
        addPetSVG(currentPet);
    }
    }
}

function addPetSVG(pet) {
    var petImage = document.getElementById(pet.type);

    petContent = document.getElementById(`${pet.id}-content`);
    petContent.innerHTML = petImage.innerHTML;
}


// //post pet obj
// function updatePetStateInBD() {
//     var up = new Object;
//     up.Id = 4;
//     up.XPStatus = xp.value;  
//     up.EnergyStatus = pes.value;
//     up.LoveStatus = pss.value;
//     up.PlayStatus = pfs.value;


//     // var jsonString = JSON.stringify(update);
//     // console.log(jsonString);
//     update("http://localhost:7000/api/playground", up, ()=>{});
// }


// //get pet obj
// getFromServer("http://localhost:7000/api/playground", updatePetStatusShown);
// function updatePetStatusShown(data) {
//    // console.log(data);
//     var obj = JSON.parse(data);
//     //console.log(obj);
//     //console.log(obj[0].EnergyStatus);
//     xp.value = (obj[0].XPStatus).toString();
//     pss.value = (obj[0].LoveStatus).toString();
//     pes.value = (obj[0].EnergyStatus).toString();
//     pfs.value = (obj[0].PlayStatus).toString();//should've been food 
//     changeMood();
// }
