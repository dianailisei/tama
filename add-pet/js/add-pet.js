var petColor = document.getElementById("penguin-up-belly");
var petEyeLeft = document.getElementById("penguin-up-left-eye");
var petEyeRight =document.getElementById("penguin-up-right-eye");

function saveNewPet(){
     console.log("your new pet is addopted!");
}

function changePetEyesColor(val){
     petEyeLeft.style.fill = val;
     petEyeRight.style.fill = val; 
}

function changePetColor(val){
     petColor.style.fill = val;
}