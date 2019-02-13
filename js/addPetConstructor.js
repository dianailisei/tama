function addPetConstructor() {
    this.type ='';
    this.name = '';
    this.age =  '';
    this.gender ='';
    this.bodyColor ='';
    this.eyesColor = '';
    this.description = '';
    this.xp = 1;

    this.updateType  = function (type) {
        this.type = type;
        changePetSVG();
    },
    this.updateName = function (name) {
        this.name = name;
    },
    this.updateAge = function (age) {
        this.age = age;
    },
    this.updateGender =function (gender) {
        this.gender = gender.replace(' ', '');
    },
    this.updateBodyColor =function (bodyColor) {
        this.bodyColor = bodyColor;
        changePetColor(this, petContent);
    },
    this.updateEyesColor = function (eyesColor) {
        this.eyesColor = eyesColor;
        changePetEyesColor(this, petContent);
    },
    this.updateDescription =  function (description) {
        this.description = description;
    },
    this.updateAll = function () {
        pet.updateType(document.getElementById("pet-select").value);
        pet.updateDescription(document.getElementById("pet-description").value);
        pet.updateName(document.getElementById("pet-name").value);
        pet.updateAge(document.getElementById("pet-age").value);
        pet.updateGender(document.getElementById("pet-gender").value);
        pet.updateBodyColor(document.getElementById("pet-color").value);
        pet.updateEyesColor(document.getElementById("pet-eyes-color").value);
    }
}

function changePetSVG() {
    type = document.getElementById("pet-select").value;
    var petImage = document.getElementById(type);
    petContent.innerHTML = petImage.innerHTML;
}