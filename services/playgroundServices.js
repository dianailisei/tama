// TODO: constructor for pets[]
// TODO: correct http requests
// TODO: refactor some code... 'cause it needs it  

// var pet1 = new petConstructor("1", "tama", "penguin", "#fff7c0", "#0b3c5d", 1, 67, 35, 98, 300, null, "rollAndMoveLeft");
// var pet2 = new petConstructor("2", "COCO", "spider", "#660066", "#fff7c0", 5, 39, 85, 120, 13, null, "jumpUp");
// var pet3 = new petConstructor("3", "Bibo", "fish", "#660066", "#caebf2", 5, 39, 85, 180, 8, null, "movePetLeft");

var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

var pets = [];
const NR_INCREMENT = 3;
const NR_DEFAULT = 100;

function petConstructor(id, name, type, bodyColor, eyesColor, xp, foodLevel, sympathyLevel, energyLevel, age, description, animationOption) {
    this.idDB = id;
    this.id = "pet" + id;
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
    this.animationOption = animationOption;
    
    this.doSpecificAnimation = function () {
        console.log(`you've clicked on ${this.id}: ${this.foodLevel}   ${this.sympathyLevel}  ${this.energyLevel}!`);
        
        var petReaction = document.getElementById(`${this.id}-reaction`);
        petReaction.classList.add("pet-reaction-animation");
        petReaction.style.visibility = "visible";
        
        if(this.animationOption == "rollAndMoveRight") {
            rollAndMoveRight(this.id);
        }else if(this.animationOption == "movePetRight"){
            movePetRight(this.id);
        } else if(this.animationOption== "rollPet"){
            rollPet(this.id);
        } else if(this.animationOption =="movePetLeft"){
            movePetLeft(this.id);
        } else if(this.animationOption == "rollAndMoveLeft"){
            rollAndMoveLeft(this.id);
        } else if(this.animationOption == "jumpUp"){
            jumpUp(this.id);
        }

        setTimeout(() => {
            petReaction.style.visibility = "hidden";
            petReaction.classList.remove("pet-reaction-animation");
            removeClassAnimation(this.id);
        }, 5000);
    }
    this.showPetState = function () {
        var petState = document.getElementById(`${this.id}-state`);
        petState.style.visibility = "visible";
    }
    this.hidePetState = function () {
        var petState = document.getElementById(`${this.id}-state`);
        petState.style.visibility = "hidden";
    }
    this.changeMood = function () {
        var petMood = document.getElementById(this.id).getElementsByClassName("pet-body");
        if (this.foodLevel < 50 || this.energyLevel < 50) {
            for (let i = 0; i < petMood.length; i++) {           
                petMood.item(i).style.fill = "yellow";
            }
        } else if (this.sympathyLevel < 50) {
            for (let i = 0; i < petMood.length; i++) {
                petMood.item(i).style.fill = "red";
            }
        } else {
            for (let i = 0; i < petMood.length; i++) {
                petMood.item(i).style.fill = this.bodyColor;
            }
        }
    }
    this.changeAnimationSleepy = function () {
        var petReactionSleepy = document.getElementById(`${this.id}-sleepy`);
        var petEnergyLevel = document.getElementById(`${this.id}-energy-level`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "💤";
        this.energyLevel = this.energyLevel + NR_INCREMENT;
        petEnergyLevel.value = this.energyLevel;
    }
    this.changeAnimationFood = function () {
        var petReactionFood = document.getElementById(`${this.id}-food`);
        var petFoodLevel = document.getElementById(`${this.id}-food-level`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "🎂";
        this.foodLevel = this.foodLevel + NR_INCREMENT;
        petFoodLevel.value = this.foodLevel;
    }
    this.changeAnimationHeart = function () {
        var petReactionHeart = document.getElementById(`${this.id}-heart`);
        var petSympathyLevel = document.getElementById(`${this.id}-sympathy-level`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "💖";
        this.sympathyLevel = this.sympathyLevel + NR_INCREMENT;
        petSympathyLevel.value = this.sympathyLevel;    
    }    
    this.decreaseStatus = function decreaseStatus(){
        // var petFoodLevel = document.getElementById(`${this.id}-food-level`);
        // var petSympathyLevel = document.getElementById(`${this.id}-sympathy-level`);
        // var petEnergyLevel = document.getElementById(`${this.id}-energy-level`);
        
        setTimeout(() => {
            this.foodLevel--;
            // petFoodLevel.value = this.foodLevel;            
            this.energyLevel--;
            // petEnergyLevel = this.energyLevel;
            this.sympathyLevel--;
            // petSympathyLevel = this.sympathyLevel;
            updatePetStateInBD(this);
            this.decreaseStatus();
        }, 10000);
    }
    this.decreaseStatus();
}

function addTemplatesContainer() {
    var elements = document.getElementsByClassName("pet-wrapperCont");
    let templ = document.getElementById("templatePetWrapper");
    for (let i = 0; i < pets.length; i++) {
        elements[i].innerHTML = templ.innerHTML;
    }
    AddSpecificationAfterTemplates();
}


function AddPetToPlatground(pet) {
    var petWrapperAll = document.getElementById("pets-wrapper-all");
    pets.push(pet);

    var newpet = `<div class="pet-wrapperCont" data-insert-pet="pets[${pets.length - 1}]" onclick="pets[${pets.length - 1}].doSpecificAnimation(${this.animationOption})" onmouseover="pets[${pets.length - 1}].showPetState()"
    onmouseout="pets[${pets.length - 1}].hidePetState()"></div>`;
    petWrapperAll.innerHTML += newpet;

    addTemplatesContainer();
}

function AddSpecificationAfterTemplates() {
    var elements = document.querySelectorAll("[data-insert-pet]");
    if (elements) {
        for (var i = 0; i < elements.length; i++) {
            var currentElement = elements[i];

            var currentPet = eval(currentElement.dataset.insertPet);
            currentElement.querySelector(".pet-reaction").id = currentPet.id + "-reaction";

            var currentStateElement = currentElement.querySelector(".pet-state");
            currentStateElement.id = currentPet.id + "-state";

            addStateFood(currentPet, currentStateElement);
            addStateLove(currentPet, currentStateElement);
            addStateEnergy(currentPet, currentStateElement);

            addPetSVG(currentElement, currentPet);
        }
    }
}

function addStateFood(currentPet, currentStateElement) {
    var foodLevelEl = currentStateElement.querySelector(".food-level");
    foodLevelEl.id = currentPet.id + "-food-level";
    foodLevelEl.value = currentPet.foodLevel;

    var foodImg = currentStateElement.querySelector(".food");
    foodImg.id = currentPet.id + "-food";
    
    var food = document.getElementById(`${currentPet.id}-food`);
    food.setAttribute('onclick', `pets[${pets.indexOf(currentPet)}].changeAnimationFood()`);
}

function addStateLove(currentPet, currentStateElement) {
    var sympthLevelEl = currentStateElement.querySelector(".sympathy-level");
    sympthLevelEl.id = currentPet.id + "-sympathy-level";
    sympthLevelEl.value = currentPet.sympathyLevel;

    var sympthImg = currentStateElement.querySelector(".heart");
    sympthImg.id = currentPet.id + "-heart";

    var sympt = document.getElementById(`${currentPet.id}-heart`);
    sympt.setAttribute('onclick', `pets[${pets.indexOf(currentPet)}].changeAnimationHeart()`);
}

function addStateEnergy(currentPet, currentStateElement) {
    var energyLevelEl = currentStateElement.querySelector(".energy-level");
    energyLevelEl.id = currentPet.id + "-energy-level";
    energyLevelEl.value = currentPet.energyLevel;

    var energyImg = currentStateElement.querySelector(".sleepy");
    energyImg.id = currentPet.id + "-sleepy";

    var energy = document.getElementById(`${currentPet.id}-sleepy`);
    energy.setAttribute('onclick', `pets[${pets.indexOf(currentPet)}].changeAnimationSleepy()`);
}

function addPetSVG(currentElement, currentPet) {
    var currentPetContent = currentElement.querySelector(".pet-content");
    currentPetContent.id = currentPet.id + "-content";
    
    var petImage = document.getElementById(currentPet.type);

    petContent = document.getElementById(`${currentPet.id}-content`);
    // setTimeout(() => console.log(petImage.contentDocument), 1000);
    petContent.innerHTML = petImage.innerHTML;
}


//post pet obj
function updatePetStateInBD(pet) {
    console.log(`entered update for ${pet.name}`);
    var up = new Object;
    up.Id = pet.idDB;
    up.XPStatus = pet.xp;
    up.EnergyStatus = pet.energyLevel;
    up.LoveStatus = pet.sympathyLevel;
    up.PlayStatus = pet.foodLevel;

    // var jsonString = JSON.stringify(update);
    // console.log(jsonString);

    update(`http://localhost:7000/api/playground`, up, ()=>{});
}


//get pet obj
getFromServer(`http://localhost:7000/api/playground?id=${userId}`, updatePetStatusShown);
function updatePetStatusShown(data) {
//    console.log(data);
    var obj = JSON.parse(data);
    // console.log(obj);
    for(let i = 0; i < obj.length ; i++){
        if(obj[i].LoveStatus == null) {
            obj[i].LoveStatus = NR_DEFAULT;
            obj[i].EnergyStatus = NR_DEFAULT;
            obj[i].PlayStatus = NR_DEFAULT;
        }
        var pet = new petConstructor(obj[i].Id, obj[i].Name, obj[i].Type, obj[i].Color, obj[i].EyesColor, obj[i].XPStatus, obj[i].PlayStatus, obj[i].LoveStatus, obj[i].EnergyStatus, obj[i].age, obj[i].Description, "rollPet");
 
        // console.log(pet);
        AddPetToPlatground(pet);
    }
}
