// TODO: constructor for pets[]
// TODO: correct http requests
// TODO: refactor some code... 'cause it needs it  

// var pet1 = new petConstructor("1", "tama", "penguin", "#fff7c0", "#0b3c5d", 1, 67, 35, 98, 300, null, "rollAndMoveLeft");
// var pet2 = new petConstructor("2", "COCO", "spider", "#660066", "#fff7c0", 5, 39, 85, 120, 13, null, "jumpUp");
// var pet3 = new petConstructor("3", "Bibo", "fish", "#660066", "#caebf2", 5, 39, 85, 180, 8, null, "movePetLeft");

var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

var animationArray = ["rollPet", "rollAndMoveRight", "rollAndMoveLeft", "jumpUp", "movePetLeft", "movePetRight"];
var pets = [];
const NR_INCREMENT = 3;
const NR_MIN = 3;
const NR_MAX= 200;
const NR_DEFAULT = 100;

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
        var randomAnimation = Math.floor((Math.random() * 6));

        if(obj[i].LoveStatus == null) {
            obj[i].LoveStatus = NR_DEFAULT;
            obj[i].EnergyStatus = NR_DEFAULT;
            obj[i].PlayStatus = NR_DEFAULT;
        }
        var pet = new petConstructor(obj[i].Id, obj[i].Name, obj[i].Type, obj[i].Color, obj[i].EyesColor, obj[i].XPStatus, obj[i].PlayStatus, obj[i].LoveStatus, obj[i].EnergyStatus, obj[i].age, obj[i].Description, animationArray[randomAnimation]);
 
        // console.log(pet);
        AddPetToPlatground(pet);
    }
}
