function FriendAccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/friend-account.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    view.addScript('menu.js');
    let user = JSON.parse(localStorage.getItem("user"));
    let friend = JSON.parse(localStorage.getItem("friend"));
    model.userId = user.Id;
    model.id = friend.Id;
    model.username = friend.Username;
    model.country = friend.Country;
    model.isFriend = friend.isFriend;

    setTimeout(() => {
        getFromServer(`http://localhost:7000/api/owner/pets?id=${model.id}`, res => {
            res = JSON.parse(res);
            console.log(res);
            let petList = document.getElementById('pets-list');
            if (res === undefined || res.length === 0) {
                let p = createElement('h2', [], '', `${model.username} has no pets yet.`);
                petList.appendChild(p);
            }
            else {
                res.forEach(element => {
                    let petContainer = createElement('li', ['pet-container']);
                    // let img = createElement('img', ['pet-pic'], '', '', { "src": "../resources/cat-icon.png", "alt": "pet-icon" });
                    let templatePet = document.getElementById(element.Type);
                    let img = createElement('div', ['pet-pic']);
                    img.innerHTML = templatePet.innerHTML;
                    let p = createElement('p', ['pet-name'], '', element.Name);
                    appendChildren(petContainer, [img, p]);
                    var petEyes = img.getElementsByClassName("pet-eyes");
                    for (var i = 0; i < petEyes.length; i++) {
                        petEyes.item(i).style.fill = element.EyesColor;
                    }
                    var petColor = img.getElementsByClassName("pet-body");
                    for (var i = 0; i < petColor.length; i++) {
                        petColor.item(i).style.fill = element.Color;
                    }
                    petList.appendChild(petContainer);
                })
            }
        })
    })

    setTimeout(() => {
        let removeBtn = document.getElementsByClassName("remove-btn")[0];
        let addBtn = document.getElementsByClassName("add-btn")[0];
        if (model.isFriend === 0) {
            removeBtn.classList.remove("is-inactive");
            setRemoveBtn(removeBtn, model.userId, model.id);
        }
        else {
            addBtn.classList.remove("is-inactive");
            setAddBtn(addBtn, model.userId, model.id, friend);
        }
    }, 500)

}

function setRemoveBtn(btn, id1, id2) {
    btn.addEventListener('click', e => {
        e.preventDefault();
        deleteFromServer(`http://localhost:7000/api/friends`, { "id1": id1, "id2": id2 }, data => {
            localStorage.removeItem("friend");
            window.location.href = "#your-friends";
        })
    })
}

function setAddBtn(btn, id1, id2, friend) {
    btn.addEventListener('click', e => {
        e.preventDefault();
        postToServer(`http://localhost:7000/api/friends`, { "id1": id1, "id2": id2 }, (result) => {
            Alert.render("Friend added successfully!");
            friend.isFriend = 1;
            localStorage.setItem("friend", JSON.stringify(friend));
            btn.classList.add("is-inactive");
            let removeBtn = document.getElementsByClassName("remove-btn")[0];
            removeBtn.classList.remove("is-inactive");
            setRemoveBtn(removeBtn, id1, id2);
        })
    })
}