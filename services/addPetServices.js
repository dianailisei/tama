var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

//TODO: setState for form!
//TODO: verify POST! typeof(pet.type)


// console.log(userId);
var petForm = document.getElementById("pet-form");
var type;
var description;
var name;
var age;
var color;
var eyesColor;
var pet = document.getElementById("pet-wrapper");

function changePetEyesColor(val) {
    console.log(val);
    var petEyes = document.getElementsByClassName("pet-eyes");
    console.log(petEyes);

    for(var i= 0; i < petEyes.length; i++){
        petEyes.item(i).style.fill = val;
        console.log(petEyes.item(i) +" " +val);
    }
}

function changePetColor(val) {
    var petColor = document.getElementsByClassName("pet-body");
    console.log(petColor);

    for(var i= 0; i < petColor.length; i++){
        petColor.item(i).style.fill = val;
        console.log(petColor.item(i) +" " +val);
    }
}

function postPet(){
    // type = document.getElementById("pet-select").value;
    // description = document.getElementById("pet-description").value;
    // name = document.getElementById("pet-name").value;
    // age = document.getElementById("pet-age").value;
    // color = document.getElementById("pet-color").value;
    // changePetColor(color);
    // eyesColor = document.getElementById("pet-eyes-color").value;
    // changePetEyesColor(eyesColor);

    console.log(name);
    postToServer("http://localhost:7000/api/addPet", { "Name": name, "Age": age, "Type": type, "Color": color, "EyesColor": eyesColor, "Description": description }, (data) => {
        console.log(data);
        // console.log(data.responseText);
        // console.log(JSON.parse(data.responseText));
        console.log(JSON.parse(data).id);
        let id = JSON.parse(data).id;
        localStorage.setItem("pets", JSON.stringify({ "Id": id, "Name": name, "Age": age, "Type": type, "Color": color, "Description": description }));
        window.location.href = "#playground";
    });
}

var petImage;
function changePetSVG() {
    type = document.getElementById("pet-select").value;
    petImage = document.getElementById(type);
    console.log(petImage.content);

    pet.innerHTML = petImage.innerHTML;
}