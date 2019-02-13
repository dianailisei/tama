var animationArray = ["rollPet", "rollAndMoveRight", "rollAndMoveLeft", "jumpUp", "movePetLeft", "movePetRight"];

if(NR_INCREMENT === undefined){
    var NR_INCREMENT = 3;
}
if(NR_MIN === undefined) {
    var NR_MIN = 3;
}
if(NR_MAX === undefined){
    var NR_MAX= 200;
}
if(NR_DECREMENT ==undefined){
    var NR_DECREMENT = 1;
}
if(NR_DEFAULT === undefined){
    var NR_DEFAULT = 100;
}

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
        // console.log(`you've clicked on ${this.id}: ${this.foodLevel}   ${this.sympathyLevel}  ${this.energyLevel}!`);

        var petReaction = document.getElementById(`${this.id}-reaction`);
        petReaction.classList.add("pet-reaction-animation");
        petReaction.style.visibility = "visible";

        if (this.animationOption == "rollAndMoveRight") {
            rollAndMoveRight(this.id);
        } else if (this.animationOption == "movePetRight") {
            movePetRight(this.id);
        } else if (this.animationOption == "rollPet") {
            rollPet(this.id);
        } else if (this.animationOption == "movePetLeft") {
            movePetLeft(this.id);
        } else if (this.animationOption == "rollAndMoveLeft") {
            rollAndMoveLeft(this.id);
        } else if (this.animationOption == "jumpUp") {
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
        if (this.energyLevel <= NR_MAX - NR_INCREMENT)
            this.energyLevel = this.energyLevel + NR_INCREMENT;
        petEnergyLevel.value = this.energyLevel;
    }
    this.changeAnimationFood = function () {
        var petReactionFood = document.getElementById(`${this.id}-food`);
        var petFoodLevel = document.getElementById(`${this.id}-food-level`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "🎂";
        if (this.foodLevel <= NR_MAX - NR_INCREMENT)
            this.foodLevel = this.foodLevel + NR_INCREMENT;
        petFoodLevel.value = this.foodLevel;
    }
    this.changeAnimationHeart = function () {
        var petReactionHeart = document.getElementById(`${this.id}-heart`);
        var petSympathyLevel = document.getElementById(`${this.id}-sympathy-level`);
        var petReaction = document.getElementById(`${this.id}-reaction`);

        petReaction.innerHTML = "💖";
        if (this.sympathyLevel <= NR_MAX - NR_INCREMENT)
            this.sympathyLevel = this.sympathyLevel + NR_INCREMENT;
        petSympathyLevel.value = this.sympathyLevel;
    }
    this.decreaseStatus = function decreaseStatus() {
        var petFoodLevel = document.getElementById(`${this.id}-food-level`);
        var petSympathyLevel = document.getElementById(`${this.id}-sympathy-level`);
        var petEnergyLevel = document.getElementById(`${this.id}-energy-level`);

        setTimeout(() => {
            if (this.foodLevel > NR_MIN * 2) {
                this.foodLevel--;
                // petFoodLevel.value = this.foodLevel;            
            }
            if (this.energyLevel > NR_MIN * 2) {
                this.energyLevel--;
                // petEnergyLevel.value = this.energyLevel;
            }
            if (this.sympathyLevel > NR_MIN * 2) {
                this.sympathyLevel--;
                // petSympathyLevel.value = this.sympathyLevel;
            }
            updatePetStateInBD(this);
            this.decreaseStatus();
        }, 10000);
    }
    window.onload = this.decreaseStatus();
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

    changePetColor(currentPet, petContent);
    changePetEyesColor(currentPet, petContent);
}

