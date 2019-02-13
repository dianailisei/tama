function YourFriendsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-friends.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    view.addScript('services/yourFriendsServices.js');
    view.addScript('menu.js');
}