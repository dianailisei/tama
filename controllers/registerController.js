function RegisterController(view, model) {
    view.removeLastCssLink();

    view.addCssLink('css/register.css');
    view.addCssLink('css/menu.css');

    view.addScript('services/registerServices.js');
    view.addScript('menu.js');

}