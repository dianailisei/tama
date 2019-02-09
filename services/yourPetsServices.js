
let user = JSON.parse(localStorage.getItem("user"));
let petsList = document.getElementById('pets-list');

showPets(petsList, user);

function showPets(petsList, user) {
    getFromServer(`http://localhost:7000/api/pets?id=${user.Id}`, data => {
        data = JSON.parse(data)
        data.forEach(pets => {
            let petContainer = document.querySelector(`[data-id="${pets.Id[0]}"]`);
            if (petContainer === null) {
                petContainer = document.createElement('li');
                petContainer.classList.add("pet-container");
                petContainer.dataset.id = pets.Id[0];
            }

            let petPicture = document.createElement('img');
            petPicture.classList.add("pet-pic");
            petPicture.src = "../resources/cat-icon.png";
            petPicture.alt = "pet-icon";
            petContainer.appendChild(petPicture);

            let infoContainer = document.createElement("div");
            infoContainer.classList.add("pet-info");

            let petName = document.createElement('p');
            petName.classList.add("pet-name");
            petName.innerText = pets.Name[0];
            let petGender = document.createElement('p');
            petGender.innerText = `Gender: ${pets.Gender[0]}`;
            let petAge = document.createElement('p');
            petAge.innerText = `Age: ${pets.Age[0]} years old`;
            infoContainer.appendChild(petName);
            infoContainer.appendChild(petGender);
            infoContainer.appendChild(petAge);
            petContainer.appendChild(infoContainer);

            let deletePetBtn = document.createElement('img');
            deletePetBtn.classList.add("delete-pet-btn");
            deletePetBtn.src = "../resources/delete-btn.png";
            deletePetBtn.alt = "delete button";
            deletePetBtn.dataset.id = pets.Id[0];
            deletePetBtn.addEventListener('click', e => deletePet(e.target.dataset.id));
            petContainer.appendChild(deletePetBtn);

            let friendsContainer = document.createElement('div');
            friendsContainer.classList.add("pet-friends-container");

            let subtitle = document.createElement("h3");
            subtitle.innerText = `${pets.Name[0]}'s friends`;
            friendsContainer.appendChild(subtitle);

            let friendsList = document.getElementById(`${pets.Id[0]}`);
            // console.log(friendsList);
            if (friendsList === null) {
                friendsList = document.createElement('ul');
                friendsList.classList.add("pet-friends");
                friendsList.id = pets.Id[0];
                friendsContainer.appendChild(friendsList);
            }
            if (pets.Id[1] !== null) {
                let friend = document.createElement('li');
                friend.classList.add('pet-friend');
                let friendPic = document.createElement('img');
                friendPic.src = '../resources/cat-icon.png';
                friendPic.alt = 'pet-icon';
                friend.appendChild(friendPic);
                let friendName = document.createElement('p');
                friendName.classList.add("pet-friend-name");
                friendName.innerText = pets.Name[1];
                friend.appendChild(friendName);

                friendsList.appendChild(friend);
            }
            else {
                let message = document.createElement('h3');
                message.innerText=`${pets.Name[0]} has no friends yet.`;
                friendsContainer.appendChild(message);
            }

            petContainer.appendChild(friendsContainer);

            petsList.appendChild(petContainer);
        });
    });
}



function deletePet(id) {
    deleteFromServer('http://localhost:7000/api/pets', { "id": id }, () => {
        showPets(petsList, user);
        Alert.render("Pet deleted successfully!");
    })
}