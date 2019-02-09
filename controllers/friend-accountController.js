function FriendAccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/friend-account.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    view.addScript('menu.js');

    let user = JSON.parse(localStorage.getItem("user"));
    let friend = JSON.parse(localStorage.getItem("friend"));
    // console.log(fiend);
    model.userId = user.Id;
    model.id = friend.Id;
    model.username = friend.Username;
    model.country = friend.Country;
    model.isFriend = friend.isFriend;

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