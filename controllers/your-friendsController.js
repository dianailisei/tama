function YourFriendsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-friends.css');
    view.addCssLink('css/menu.css');
    view.addScript('services/friendsServices.js');
    view.addScript('menu.js');

    let user = JSON.parse(localStorage.getItem("user"));
    model.email = user.Email;
    model.id = user.Id;
    let friends = [];

    setTimeout(() => {
        let friendsList = document.getElementById("friends-list");
        // console.log(model.id);
        getFromServer(`http://localhost:7000/api/users/friends?id=${model.id}`, (data) => {
            let people = JSON.parse(data);
            people.forEach(user => {
                console.log(user);
                friends.push(user.IdUser2);
                // 
            });
            friends.forEach((friend, index) => {

                getFromServer(`http://localhost:7000/api/user?id=${friend}`, (resp) => {

                    let currentFriend = JSON.parse(resp)[0];
                    let userContainer = document.createElement("li");
                    userContainer.classList.add("friend-container");
                    let nameContainer = document.createElement("div");
                    let nameParagraph = document.createElement("p");
                    let link = document.createElement("a");
                    link.classList.add("friend-pic");
                    link.href = "#friend-account";
                    let img = document.createElement("img");
                    img.src = "../resources/default-profile-pic.png";
                    img.alt = "profile picture";
                    link.appendChild(img);
                    nameParagraph.classList.add("friend-name");
                    nameParagraph.innerText = currentFriend.Username;
                    secondParagraph = document.createElement("p");
                    secondParagraph.classList.add("friend-pets-number");
                    secondParagraph.innerText = `${currentFriend.Username} is from ${currentFriend.Country}`;
                    nameContainer.appendChild(nameParagraph);
                    nameContainer.appendChild(secondParagraph);
                    userContainer.appendChild(link);
                    userContainer.appendChild(nameContainer);
                    friendsList.appendChild(userContainer);
                });

            })
        })
    }
        , 500);

    setTimeout(() => {
        let usersList = document.getElementById("people-list");
        //get all users
        //delete myself and my friends
        // console.log(usersList);
        getFromServer(`http://localhost:7000/api/users/all`, (data) => {
            let people = JSON.parse(data);
            people.forEach(user => {
                if (user.Email !== model.Email) {
                    let userContainer = document.createElement("li");
                    userContainer.classList.add("friend-container");
                    let nameContainer = document.createElement("div");
                    let nameParagraph = document.createElement("p");
                    let link = document.createElement("a");
                    link.classList.add("friend-pic");
                    link.href = "#friend-account";
                    let img = document.createElement("img");
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
    }, 2000)
}