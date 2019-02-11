if (user === undefined || user === null) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
}

var userId = user.Id;

var petForm = document.getElementById("pet-form");
var petContent = document.getElementById("pet-wrapper");
// var typeArr = ["penguin", "spider", "fish", "bunny", "bird"];
var pet;

var pet = {
    type: '',
    name: '',
    age: '',
    gender: '',
    bodyColor: '',
    eyesColor: '',
    description: '',
    xp: 1,

    updateType: function (type) {
        this.type = type;
        changePetSVG();
    },
    updateName: function (name) {
        this.name = name;
    },
    updateAge: function (age) {
        this.age = age;
    },
    updateGender: function (gender) {
        this.gender = gender.replace(' ', '');
    },
    updateBodyColor: function (bodyColor) {
        this.bodyColor = bodyColor;
        changePetColor(this, petContent);
    },
    updateEyesColor: function (eyesColor) {
        eyesColor = eyesColor;
        changePetEyesColor(this, petContent);
    },
    updateDescription: function (description) {
        this.description = description;
    },
    updateAll: function () {
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
    // console.log(petImage.content);

    petContent.innerHTML = petImage.innerHTML;
}

petForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postPet();
})

function postPet() {
    postToServer(`http://localhost:7000/api/addPet?id=${userId}`, { "Name": pet.name, "Age": pet.age, "Gender": pet.gender, "Type": pet.type, "Color": pet.bodyColor, "EyesColor": pet.eyesColor, "Description": pet.description, "XPStatus": pet.xp }, (data) => {
        window.location.href = "#playground";
    });
}