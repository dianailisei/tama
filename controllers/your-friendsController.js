function YourFriendsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-friends.css');
    view.addCssLink('css/menu.css');
    view.addScript('services/friendsServices.js');
    view.addScript('menu.js');

    let user = JSON.parse(localStorage.getItem("user"));
    model.email = user.Email;
    model.id = user.Id;
    let friends;
    setTimeout(() => {
        let friendsList = document.getElementById("friends-list");
        getFromServer(`http://localhost:7000/api/users/friends?id=${model.id}`, (data) => {
            friends = JSON.parse(data);
            friends.forEach(friend => {
                let userContainer = document.createElement("li");
                userContainer.classList.add("friend-container");
                let nameContainer = document.createElement("div");
                let nameParagraph = document.createElement("p");
                let link = document.createElement("a");
                link.classList.add("friend-pic");
                // link.href = "#friend-account";
                let img = document.createElement("img");
                img.dataset.id = friend.Id;
                img.src = "../resources/default-profile-pic.png";
                img.alt = "profile picture";
                link.appendChild(img);
                nameParagraph.classList.add("friend-name");
                nameParagraph.innerText = friend.Username;
                secondParagraph = document.createElement("p");
                secondParagraph.classList.add("friend-pets-number");
                secondParagraph.innerText = `${friend.Username} is from ${friend.Country}`;
                nameContainer.appendChild(nameParagraph);
                nameContainer.appendChild(secondParagraph);
                userContainer.appendChild(link);
                userContainer.appendChild(nameContainer);
                friendsList.appendChild(userContainer);
            });
        })
    }
        , 500);

    setTimeout(() => {
        let usersList = document.getElementById("people-list");
        getFromServer(`http://localhost:7000/api/users/all`, (data) => {
            let people = JSON.parse(data);
            people.forEach(user => {
                if (user.Id !== model.id && isFriend(friends, user)) {
                    let userContainer = document.createElement("li");
                    userContainer.classList.add("friend-container");
                    let nameContainer = document.createElement("div");
                    let nameParagraph = document.createElement("p");
                    let link = document.createElement("a");
                    link.classList.add("friend-pic");
                    // link.href = "#friend-account";
                    let img = document.createElement("img");
                    img.dataset.id = user.Id;
                    img.src = "../resources/default-profile-pic.png";
                    img.alt = "profile picture";
                    link.appendChild(img);
                    nameParagraph.classList.add("friend-name");
                    nameParagraph.innerText = user.Username;
                    secondParagraph = document.createElement("p");
                    secondParagraph.classList.add("friend-pets-number");
                    secondParagraph.innerText = "Double click for add";
                    nameContainer.appendChild(nameParagraph);
                    nameContainer.appendChild(secondParagraph);
                    userContainer.appendChild(link);
                    userContainer.appendChild(nameContainer);
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
                doubleClick(e, model.id);
            }
        })

    }, 2000);
}

function singleClick(friends, e) {
    let id = e.target.dataset.id;
    getFromServer(`http://localhost:7000/api/user?id=${id}`, (res) => {
        let currentFriend = JSON.parse(res)[0];
        if(isFriend(friends, currentFriend)) {
            currentFriend.isFriend = 1;
        }
        else {
            currentFriend.isFriend = 0;
        }
        localStorage.setItem("friend", JSON.stringify(currentFriend));
        window.location.href = '#friend-account';
    })
}

function doubleClick(e, userId) {
    let container = document.getElementById("people-list");
    if (container.contains(e.target)) {
        let id = e.target.dataset.id;
        postToServer(`http://localhost:7000/api/friends`, {"id1":userId, "id2":id}, (result) => {
            Alert.render("Friend added successfully!");
        })
    }
}