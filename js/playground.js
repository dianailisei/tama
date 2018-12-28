var petContainer = document.getElementById("penguin-down");
var petReaction = document.getElementById("pet-reaction");
var petState = document.getElementById("pet-state");

function startHeartAnimation(){      
     petReaction.classList.add("pet-reaction-animation");
     
     petReaction.style.visibility = "visible"; 
     setTimeout(() => {
          petReaction.style.visibility = "hidden"; 
          petReaction.classList.remove("pet-reaction-animation");
     }, 5000);
}

function showPetState(){
     // petContainer.addEventListener("mouseover", function( event ) {   
          // highlight the mouseover target
          // event.target.style.visibility = "hidden";

     // }, false);
     petState.style.visibility = "visible";
}

function hidePetState(){
     // petContainer.addEventListener("mouseout", function( event ) {   
          // highlight the mouseout target
          // event.target.style.visibility = "visible";
     // }, false);
     petState.style.visibility = "hidden";
}

