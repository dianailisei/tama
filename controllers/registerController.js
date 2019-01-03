function RegisterController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/register.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');
}