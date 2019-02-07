function FriendAccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/friend-account.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');

    let friend = JSON.parse(localStorage.getItem("friend"));
    console.log(friend);
    model.id = friend.Id;
    model.username = friend.Username;
    model.country = friend.Country;
}