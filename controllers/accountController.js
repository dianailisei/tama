function AccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/account.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');
}