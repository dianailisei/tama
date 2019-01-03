function FriendAccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/friend-account.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');
}