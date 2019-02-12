function YourFriendsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-friends.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    // view.addScript('services/friendsServices.js');
    view.addScript('menu.js');

    let user = JSON.parse(localStorage.getItem("user"));
    model.email = user.Email;
    model.id = user.Id;
    let friends;
    function renderFriends() {
        setTimeout(() => {
            let friendsList = document.getElementById("friends-list");
            getFromServer(`http://localhost:7000/api/users/friends?id=${model.id}`, (data) => {
                friends = JSON.parse(data);
                friends.forEach(friend => {
                    console.log(friend);
                    let userContainer = document.querySelector(`[data-id="${friend.Id}"]`);
                    if (userContainer === null) {
                        userContainer = createElement("li", ["friend-container"], '', '', {}, { "id": friend.Id });
                    }
                    let img = createElement("img", ["friend-pic"], '', '', { "src": "../resources/default-profile-pic.png", "alt": "profile picture" }, { "id": friend.Id });
                    let friendInfo = createElement('div', ["friend-info"]);
                    let friendName = createElement("p", ["friend-name"], '', friend.Username);
                    let friendCountry = createElement("p", ["friend-pets-number"], '', `${friend.Username} is from ${friend.Country}`);
                    appendChildren(friendInfo, [friendName, friendCountry]);
                    // let deleteBtn = document.createElement("img");
                    // deleteBtn.classList.add("delete-friend-btn");
                    // deleteBtn.src = "../resources/delete-btn.png";
                    let petsContainer = createElement("div", ["friend-pets-container"]);
                    let subtitle = createElement('h3', [], '', `${friend.Username}'s pets`);
                    petsContainer.appendChild(subtitle);
                    let friendPets = document.getElementById(`${friend.Id}`);
                    if (friendPets === null) {
                        friendPets = createElement('ul', ['friend-pets'], friend.Id);
                    }
                    if (friend.Name !== null) {
                        let pet = createElement('li', ['friend-pet']);
                        let petName = createElement('p', ['friend-pet-name'], '', friend.Name, {}, {"petId": friend.IdPet});
                        // let petIcon = createElement('img', [], '', '', {"src" : "../resources/cat-icon.png", "alt": "pet-icon"}, {"petId": friend.IdPet});
                        let templatePet = document.getElementById(friend.Type);
                        let petIcon = createElement('div', ['pet-pic']);
                        petIcon.innerHTML = templatePet.innerHTML;
                        appendChildren(pet, [petName, petIcon]);
                        var petEyes = petIcon.getElementsByClassName("pet-eyes");
                        for (var i = 0; i < petEyes.length; i++) {
                            petEyes.item(i).style.fill = friend.EyesColor;
                        }
                        var petColor = petIcon.getElementsByClassName("pet-body");
                        for (var i = 0; i < petColor.length; i++) {
                            petColor.item(i).style.fill = friend.Color;
                        }
                        friendPets.appendChild(pet);
                    }
                    else {
                        let msg = createElement('p', [], '', `${friend.Username} has no pets yet.`);
                        friendPets.appendChild(msg);
                    }
                    petsContainer.appendChild(friendPets);
                    appendChildren(userContainer, [img, friendInfo, petsContainer]);
                    // userContainer.appendChild(deleteBtn);
                    friendsList.appendChild(userContainer);
                });
            })
        }, 500);
    }

    renderFriends();
    setTimeout(() => {
        let usersList = document.getElementById("people-list");
        getFromServer(`http://localhost:7000/api/users/all`, (data) => {
            let people = JSON.parse(data);
            people.forEach(user => {
                if (user.Id !== model.id && isFriend(friends, user)) {
                    let userContainer = createElement("li", ["person-container"]);
                    let nameContainer = createElement("div");
                    let nameParagraph = createElement("p", ["person-name"], '', user.Username);
                    let secondParagraph = createElement('p', ["person-pets-number"], '', "Double click for add")
                    let link = createElement("a", ["person-pic"]);
                    let img = createElement("img", [], '', '', { "src": "../resources/default-profile-pic.png", "alt": "profile picture" }, { "id": user.Id });
                    link.appendChild(img);
                    appendChildren(nameContainer, [nameParagraph, secondParagraph]);
                    appendChildren(userContainer, [link, nameContainer]);
                    usersList.appendChild(userContainer);
                }
            })
        })
        let clickCount = 0;

        let container = document.getElementById("friends-list-container");
        container.addEventListener("click", e => {
            e.preventDefault();
            clickCount++;
            if (clickCount === 1) {
                singleClickTimer = setTimeout(() => {
                    clickCount = 0;
                    singleClick(friends, e);
                }, 400)
            }
            else if (clickCount === 2) {
                clearTimeout(singleClickTimer);
                clickCount = 0;
                if (e.target.dataset.id !== undefined) {
                    doubleClick(e, model.id, renderFriends);
                }
                else
                    if (e.target.dataset.petId !== undefined) {
                        doubleClickPet(e.target.dataset.petId, model.id);
                    }
            }
        })

    }, 2000);
}

function singleClick(friends, e) {
    let id = e.target.dataset.id;
    getFromServer(`http://localhost:7000/api/user?id=${id}`, (res) => {
        let currentFriend = JSON.parse(res)[0];
        if (isFriend(friends, currentFriend)) {
            currentFriend.isFriend = 1;
        }
        else {
            currentFriend.isFriend = 0;
        }
        localStorage.setItem("friend", JSON.stringify(currentFriend));
        window.location.href = '#friend-account';
    })
}

function doubleClick(e, userId, callback) {
    let id = e.target.dataset.id;
    postToServer(`http://localhost:7000/api/friends`, { "id1": userId, "id2": id }, (result) => {
        Alert.render("Friend added successfully!");
        // callback();
    })
}

function doubleClickPet(idPet, userId) {
    getFromServer(`http://localhost:7000/api/owner?id=${userId}`, res => {
        res = JSON.parse(res);
        let ids = [];
        res.forEach(element => ids.push(element.IdPet));
        if (ids.length === 0) {
            Alert.render("You do not have yet any pets!");
        }
        else {
            ids.forEach((myPetId, index) => {
                postToServer(`http://localhost:7000/api/petFriends`, { "id1": myPetId, "id2": idPet }, result => {
                    postFriendship(ids[index + 1], idPet);
                })
            })
        }
    })
}

function postFriendship(id, idPet) {
    if (id !== null || id !== undefined) {
        postToServer(`http://localhost:7000/api/petFriends`, { "id1": id, "id2": idPet }, result => {
            Alert.render("Pet added succesfully!");
        })
    }
}