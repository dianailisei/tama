function YourPetsController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/your-pets.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts('services/yourPetsServices.js');
    view.addScript('menu.js');
}