var petContainer = document.getElementById("penguin-down");
var petReaction = document.getElementById("pet-reaction");

function startHeartAnimation(){      
     petReaction.classList.add("pet-reaction-animation");
     
     petReaction.style.visibility = "visible"; 
     setTimeout(() => {
          petReaction.style.visibility = "hidden"; 
          petReaction.classList.remove("pet-reaction-animation");
     }, 5000);
}