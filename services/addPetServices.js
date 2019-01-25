var user = localStorage.getItem("user");
user = JSON.parse(user);
var userId = user.Id;

// console.log(userId);
var petForm = document.getElementById("pet-form");
var type;
var description;
var name;
var age;
var color;
var eyesColor;
var pet = document.getElementById("pet-wrapper");

function changePetSVG() {
    type = document.getElementById("pet-select").value;
    if (type == "penguin-up") {
        pet.innerHTML = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        <ellipse id="penguin-up-belly" stroke="#ffffff" ry="79.99999" rx="62.99999"  cy="196.11998" cx="182.12" stroke-width="5" fill="#ffffff"/>
        <path stroke="null" id="svg_10" d="m156.4,274.5c-0.9,1.8 -2.5,3.5 -5,5.1c-2.6,1.7 5,-2.1 7.1,5.7c0.9,3.4 -0.5,-6.5 8.8,-2.7c1.5,0.6 -2.7,-2.8 -4.1,-7.5c-2.3,-0.2 -4.5,-0.4 -6.8,-0.6z" fill="#F15A29"/>
        <path stroke="null" id="svg_11" d="m212.4,279.6c-2.7,-1.8 -4.4,-3.6 -5.2,-5.6c-2.2,0.2 -4.3,0.4 -6.5,0.5c-1.2,5 -5.8,8.7 -4.3,8.1c9.4,-3.8 7.9,6.1 8.8,2.7c2.2,-7.8 9.8,-4 7.2,-5.7z" fill="#F15A29"/>
        <path stroke="null" fill="black" id="svg_12" d="m266.9,209.1c-9.2,-9.5 -17.9,-19.5 -25.9,-30.1c-2.9,-35.3 -14.7,-67.9 -59.1,-67.9c-39.4,0 -52.9,31.2 -57.5,65.7c-8.4,11.4 -17.6,22.2 -27.5,32.3c-0.3,0.3 -0.6,0.7 -0.7,1.1c-0.1,0.8 0.9,1.3 1.7,1.5c8,2.1 16.6,1.5 24.2,-1.7c-0.1,6.7 -0.1,13.3 -0.1,19.3c0,46 26.8,43.2 59.9,43.2c33.1,0 59.9,2.7 59.9,-43.2c0,-6 0.1,-12.5 0.1,-19.2c7.5,3.1 16.1,3.7 23.9,1.6c0.8,-0.2 1.8,-0.7 1.7,-1.5c0,-0.5 -0.3,-0.8 -0.6,-1.1zm-85,54c-26.4,0 -47.8,0.8 -47.8,-28.7c0,-51.4 9.7,-37.9 47.9,-37.9c35.1,0 47.7,-12.3 47.7,37.9c0,29.5 -21.4,28.7 -47.8,28.7zm0,-79.7c-26.4,0 -52.6,14.2 -47.8,-14.9c10.1,-60.6 42.8,-37.4 47.9,-7.7c4,-29.6 36.8,-56.8 47.7,7.7c4.9,29 -21.4,14.9 -47.8,14.9z"/>
        <path stroke="null" id="penguin-up-left-eye" d="m174,158.8c-0.2,4.9 -1.5,10.2 -4.9,14.7c-4.9,6.6 -12.8,7 -18.1,0.7c-5.9,-7 -7.2,-15 -3.7,-23.6c1.6,-3.9 4.5,-6.7 8.1,-8.7c5.8,-3.3 12.4,-1.1 16,4.9c1.6,3 2.7,7.3 2.6,12zm-13,3.6c-2.1,-0.1 -3.8,0.2 -5.4,0.7c-2.4,0.7 -3.6,2.2 -3.7,4.4c-0.1,2.3 0.8,4 2.9,5.1c4,2 10.1,-0.6 11.4,-4.9c0.8,-2.6 -0.6,-4.9 -3.4,-5.3c-0.7,-0.1 -1.4,0 -1.8,0zm-5.3,-4.3c-0.3,0.1 -0.9,0.1 -1.5,0.3c-0.9,0.4 -1.8,0.9 -1.5,2.1c0.4,1.3 1.5,1.4 2.6,1.2c0.5,-0.1 0.9,-0.4 1.3,-0.6c0.9,-0.4 1.8,-0.9 1.5,-2.1c-0.2,-1.1 -1.2,-0.9 -2.4,-0.9z"/>
        <path stroke="null" id="penguin-up-right-eye" d="m218.5,158.8c-0.2,4.9 -1.5,10.2 -4.9,14.7c-4.9,6.6 -12.8,7 -18.1,0.7c-5.9,-7 -7.2,-15 -3.7,-23.6c1.6,-3.9 4.5,-6.7 8.1,-8.7c5.8,-3.3 12.4,-1.1 16,4.9c1.6,3 2.6,7.3 2.6,12zm-13,3.6c-2.1,-0.1 -3.8,0.2 -5.4,0.7c-2.4,0.7 -3.6,2.2 -3.7,4.4c-0.1,2.3 0.8,4 2.9,5.1c4,2 10.1,-0.6 11.4,-4.9c0.8,-2.6 -0.6,-4.9 -3.4,-5.3c-0.7,-0.1 -1.5,0 -1.8,0zm-5.3,-4.3c-0.3,0.1 -0.9,0.1 -1.5,0.3c-0.9,0.4 -1.8,0.9 -1.5,2.1c0.4,1.3 1.5,1.4 2.6,1.2c0.5,-0.1 0.9,-0.4 1.3,-0.6c0.9,-0.4 1.8,-0.9 1.5,-2.1c-0.3,-1.1 -1.3,-0.9 -2.4,-0.9z"/>
        <path stroke="null" id="svg_16" d="m189.4,167.6c0,0 0,0 0,0c-0.8,-0.8 -14.9,-1 -14.9,0.9c0.1,2.2 1.4,3 6.6,11.1c2.3,3.5 8.9,-11.1 8.3,-12z" fill="#F15A29"/>
   </svg> `;
        color = document.getElementById("pet-color").value;
        changePetColor(color);
        eyesColor = document.getElementById("pet-eyes-color").value;
        changePetEyesColor(eyesColor);

    } else if (type == "penguin-down") {
        pet.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
        <g id="svg_1">
         <ellipse id="penguin-up-belly" fill="white" ry="48.5" rx="53.5" id="svg_54" cy="79.98" cx="83.98" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="null" />    
         <path id="svg_28" d="m59.5933,129.46832c-0.7,2.2 -2.5,4.2 -5.4,6.1c-2.6,1.7 5,-2.1 7.1,5.7c0.9,3.4 -0.5,-6.5 8.8,-2.7c1.6,0.6 -3.4,-3.4 -4.4,-8.6c-1.9,-0.2 -4,-0.3 -6.1,-0.5z" fill="#F15A29"/>
         <path id="svg_29" d="m115.1933,135.46832c-3,-2 -4.8,-4.1 -5.5,-6.4c-2,0.2 -4,0.2 -6,0.3c-0.8,5.5 -6.1,9.7 -4.5,9.1c9.4,-3.8 7.9,6.1 8.8,2.7c2.2,-7.8 9.9,-4 7.2,-5.7z" fill="#F15A29"/>
         <path id="svg_30" fill="black" d="m163.8933,120.46832c-3.4,-6.4 -6.5,-12.8 -9.4,-19.4c-5.1,-11.6 -9.3,-23.7 -12,-36.1c-7,-31.6 -30.2,-47 -57.7,-47c-27.5,0 -50.7,15.4 -57.7,47c-2.7,12.4 -6.9,24.5 -12,36.1c-2.9,6.6 -6,13 -9.4,19.4c-0.2,0.4 -0.4,0.8 -0.3,1.2c0.2,0.8 1.2,1 2.1,1c8.4,-0.2 16.6,-3.4 23.1,-8.8c9.5,16.9 30.3,15.5 54.4,15.5c24.1,0 44.8,1.4 54.4,-15.5c6.4,5.4 14.7,8.5 23.1,8.8c0.8,0 1.9,-0.2 2.1,-1c-0.3,-0.4 -0.5,-0.8 -0.7,-1.2zm-79.2,-5.7c-26.4,0 -47.8,8.3 -47.8,-28.4c0,-33.5 21,-52.5 42,-38c3.5,2.4 8.1,2.4 11.6,0c21.1,-14.6 42,4.5 42,38c0,36.6 -21.4,28.4 -47.8,28.4z"/>
         <path  id="penguin-up-left-eye" d="m82.7933,75.66832c-0.2,4.9 -1.5,10.2 -4.9,14.7c-4.9,6.6 -12.8,7 -18.1,0.7c-5.9,-7 -7.2,-15 -3.7,-23.6c1.6,-3.9 4.5,-6.7 8.1,-8.7c5.8,-3.3 12.4,-1.1 16,4.9c1.6,3 2.6,7.3 2.6,12zm-13,3.6c-2.1,-0.1 -3.8,0.2 -5.4,0.7c-2.4,0.7 -3.6,2.2 -3.7,4.4c-0.1,2.3 0.8,4 2.9,5.1c4,2 10.1,-0.6 11.4,-4.9c0.8,-2.6 -0.6,-4.9 -3.4,-5.3c-0.7,-0.1 -1.5,0 -1.8,0zm-5.3,-4.3c-0.3,0.1 -0.9,0.1 -1.5,0.3c-0.9,0.4 -1.8,0.9 -1.5,2.1c0.4,1.3 1.5,1.4 2.6,1.2c0.5,-0.1 0.9,-0.4 1.3,-0.6c0.9,-0.4 1.8,-0.9 1.5,-2.1c-0.3,-1.1 -1.3,-0.9 -2.4,-0.9z"/>
         <path id="penguin-up-right-eye" d="m115.2933,75.66832c-0.2,4.9 -1.5,10.2 -4.9,14.7c-4.9,6.6 -12.8,7 -18.1,0.7c-5.9,-7 -7.2,-15 -3.7,-23.6c1.6,-3.9 4.5,-6.7 8.1,-8.7c5.8,-3.3 12.4,-1.1 16,4.9c1.6,3 2.6,7.3 2.6,12zm-13.1,3.6c-2.1,-0.1 -3.8,0.2 -5.4,0.7c-2.4,0.7 -3.6,2.2 -3.7,4.4c-0.1,2.3 0.8,4 2.9,5.1c4,2 10.1,-0.6 11.4,-4.9c0.8,-2.6 -0.6,-4.9 -3.4,-5.3c-0.7,-0.1 -1.4,0 -1.8,0zm-5.2,-4.3c-0.3,0.1 -0.9,0.1 -1.5,0.3c-0.9,0.4 -1.8,0.9 -1.5,2.1c0.4,1.3 1.5,1.4 2.6,1.2c0.5,-0.1 0.9,-0.4 1.3,-0.6c0.9,-0.4 1.8,-0.9 1.5,-2.1c-0.3,-1.1 -1.3,-0.9 -2.4,-0.9z"/>
         <path id="svg_34" d="m92.0933,95.66832c0,0 0,0 0,0c-0.8,-0.8 -14.9,-1 -14.9,0.9c0.1,2.2 1.4,3 6.6,11.1c2.3,3.5 9,-11.1 8.3,-12z" fill="#F15A29"/>
        </g>
      </svg>`;
        color = document.getElementById("pet-color").value;
        changePetColor(color);
        eyesColor = document.getElementById("pet-eyes-color").value;
        changePetEyesColor(eyesColor);
    }

}
function changePetEyesColor(val) {
    var petEyeLeft = document.getElementById("penguin-up-left-eye");
    var petEyeRight = document.getElementById("penguin-up-right-eye");

    petEyeLeft.style.fill = val;
    petEyeRight.style.fill = val;
}

function changePetColor(val) {
    var petColor = document.getElementById("penguin-up-belly");
    petColor.style.fill = val;
}

petForm.addEventListener("submit", (e) => {
    e.preventDefault();
    type = document.getElementById("pet-select").value;
    description = document.getElementById("pet-description").value;
    name = document.getElementById("pet-name").value;
    age = document.getElementById("pet-age").value;
    color = document.getElementById("pet-color").value;
    changePetColor(color);
    eyesColor = document.getElementById("pet-eyes-color").value;
    changePetEyesColor(eyesColor);

    if (type == "penguin-down") {
        type = 2;
    } else if (type == "penguin-up") {
        type = 0;
    }
    console.log(name);
    postToServer("http://localhost:5000/api/addPet", { "Name": name, "Age": age, "Type": type, "Color": color, "EyesColor": eyesColor, "Description": description }, (data) => {
        console.log(data);
        // console.log(data.responseText);
        // console.log(JSON.parse(data.responseText));
        console.log(JSON.parse(data).id);
        let id = JSON.parse(data).id;
        localStorage.setItem("pets", JSON.stringify({ "Id": id, "Name": name, "Age": age, "Type": type, "Color": color, "Description": description }));
        window.location.href = "#playground";
    });
})
