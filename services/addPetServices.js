var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

//TODO: setState for form!
//TODO: verify POST! typeof(pet.type)

var type;
var description;
var name;
var age;
var color;
const xp = 1;
var eyesColor;
var petForm = document.getElementById("pet-form");
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

var petImage;
function changePetSVG() {
    type = document.getElementById("pet-select").value;
    petImage = document.getElementById(type);
    console.log(petImage.content);

    pet.innerHTML = petImage.innerHTML;
}

petForm.addEventListener("click", (e) =>{
    e.preventDefault();
    type = document.getElementById("pet-select").value;
    description = document.getElementById("pet-description").value;
    name = document.getElementById("pet-name").value;
    age = document.getElementById("pet-age").value;
    color = document.getElementById("pet-color").value;
    changePetColor(color);
    eyesColor = document.getElementById("pet-eyes-color").value;
    changePetEyesColor(eyesColor);
})

var typeArr = ["penguin", "spider", "fish", "bunny", "bird"];

function postPet(){
    if(typeArr.indexOf(type) < 0 ){
        Alert.render("select pet!")
        return;
    }
    if(!/^[a-zA-Z\d ]+$/.test(name)){
        Alert.render("give your pet a name!")
        return;
    }
    if(!/^[\d]+$/.test(age)){
        Alert.render("age!")
        return ;
    }
    
    postToServer(`http://localhost:7000/api/addPet?id=${userId}`, { "Name": name, "Age": age, "Type": type, "Color": color, "EyesColor": eyesColor, "Description": description ,"XPStatus" : 1}, (data) => {
        console.log(data);
        // console.log(data.responseText);
        // console.log(JSON.parse(data.responseText));
        console.log(JSON.parse(data).id);
        // let id = JSON.parse(data).id;
        // localStorage.setItem("pets", JSON.stringify({ "Id": id, "Name": name, "Age": age, "Type": type, "Color": color, "Description": description }));
        window.location.href = "#playground";
    });
}