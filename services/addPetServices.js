var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

var petForm = document.getElementById("pet-form");
var petContent = document.getElementById("pet-wrapper");
// var typeArr = ["penguin", "spider", "fish", "bunny", "bird"];
var pet;

function petConstructorAddPet(){
    this.type;
    this.name;
    this.age;
    this.gender;
    this.bodyColor;
    this.eyesColor;
    this.description;
    this.xp =1;

    this.updateType = function(type){
        this.type = type;
        changePetSVG();
    }
    this.updateName = function(name){
        this.name = name;
    }
    this.updateAge = function(age){
        this.age = age;
    }
    this.updateGender = function(gender){
        this.gender = gender.replace(' ', '');
    }
    this.updateBodyColor = function(bodyColor){
        this.bodyColor = bodyColor;
        changePetColor(this, petContent);
    }
    this.updateEyesColor = function(eyesColor){
        this.eyesColor =eyesColor;
        changePetEyesColor(this, petContent);
    }
    this.updateDescription = function(description){
        this.description =description;
    }
    this.updateAll = function(){
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

petForm.addEventListener("click", (e) =>{
    pet = new petConstructorAddPet();
})

function postPet(){
    postToServer(`http://localhost:7000/api/addPet?id=${userId}`, { "Name": pet.name, "Age": pet.age, "Gender":pet.gender, "Type": pet.type, "Color": pet.bodyColor, "EyesColor": pet.eyesColor, "Description": pet.description ,"XPStatus" : pet.xp}, (data) => {
        // console.log(data);
        // console.log(data.responseText);
        // console.log(JSON.parse(data.responseText));
        // console.log(JSON.parse(data).id);
        // let id = JSON.parse(data).id;
        // localStorage.setItem("pets", JSON.stringify({ "Id": id, "Name": name, "Age": age, "Type": type, "Color": color, "Description": description }));
        window.location.href = "#playground";
    });
}