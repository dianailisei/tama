function YourFriendsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-friends.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');
    let user = JSON.parse(localStorage.getItem("user"));
    model.email = user.Email;
    model.id = user.Id;

    setTimeout(() => {
        let friendsList = document.getElementById("friends-list");
        // console.log(model.id);
        getFromServer(`http://localhost:7000/api/users/friends?id=${model.id}`, (data) => {
            let people = JSON.parse(data);
            // console.log(people);
            people.forEach(user => {
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
                secondParagraph.innerText = `${user.Username} is from ${user.Country}`;
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
    }, 500)
}