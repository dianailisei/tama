if (user === undefined || user === null) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
}

var userId = user.Id;

var petForm = document.getElementById("pet-form");
var petContent = document.getElementById("pet-wrapper");
// var typeArr = ["penguin", "spider", "fish", "bunny", "bird"];

var pet = new addPetConstructor();


petForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postPet();
})

function postPet() {
    postToServer(`http://localhost:7000/api/addPet?id=${userId}`, { "Name": pet.name, "Age": pet.age, "Gender": pet.gender, "Type": pet.type, "Color": pet.bodyColor, "EyesColor": pet.eyesColor, "Description": pet.description, "XPStatus": pet.xp }, (data) => {
        window.location.href = "#playground";
    });
}