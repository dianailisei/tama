
if (user === undefined || user === null) {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
}
let petsList = document.getElementById('pets-list');

showPets(petsList, user);

function showPets(petsList, user) {
    getFromServer(`http://localhost:7000/api/pets?id=${user.Id}`, data => {
        data = JSON.parse(data)
        data.forEach(pets => {
            let petContainer = document.querySelector(`[data-id="${pets.Id[0]}"]`);
            if (petContainer === null) {
                petContainer = createElement('li', ["pet-container"], '', '', {}, { "id": pets.Id[0] });
            }
            let petPicture = createElement('img', ['pet-pic'], '', '', { "src": "../resources/cat-icon.png", "alt": "pet-icon" }, {});
            petContainer.appendChild(petPicture);

            let infoContainer = createElement('div', ['pet-info'], '', '', {}, {});
            let petName = createElement('p', ['pet-name'], '', pets.Name[0], {}, {});
            let petGender = createElement('p', [], '', `Gender: ${pets.Gender[0]}`, {}, {});
            let petAge = createElement('p', [], '', `Age: ${pets.Age[0]} years old`, {}, {});
            infoContainer.appendChild(petName);
            infoContainer.appendChild(petGender);
            infoContainer.appendChild(petAge);
            appendChildren(infoContainer, [petName, petGender, petAge]);
            petContainer.appendChild(infoContainer);

            let deletePetBtn = createElement('img', ['delete-pet-btn'], '', '', { "src": '../resources/delete-btn.png', "alt": "delete button" }, { "id": pets.Id[0] });
            deletePetBtn.addEventListener('click', e => deletePet(e.target.dataset.id));
            petContainer.appendChild(deletePetBtn);

            let friendsContainer = createElement('div', ['pet-friends-container'], '', '', {}, {});

            let subtitle = createElement("h3", [], '', `${pets.Name[0]}'s friends`, {}, {});
            friendsContainer.appendChild(subtitle);

            let friendsList = document.getElementById(`${pets.Id[0]}`);
            // console.log(friendsList);
            if (friendsList === null) {
                friendsList = createElement('ul', ['pet-friends'], pets.Id[0], '', {}, {});
                friendsContainer.appendChild(friendsList);
            }
            if (pets.Id[1] !== null) {
                let friend = createElement('li', ['pet-friend'], '', '', {}, {});
                let friendPic = createElement('img', [], '', '', { "src": '../resources/cat-icon.png', "alt": 'pet-icon' }, {});
                let friendName = createElement('p', ['pet-friend-name'], '', pets.Name[1], {}, {});
                appendChildren(friend, [friendPic, friendName]);
                friendsList.appendChild(friend);
            }
            else {
                let message = createElement('h3', [], '', `${pets.Name[0]} has no friends yet.`, {}, {});
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