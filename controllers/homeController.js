function HomeController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/home.css');
    view.addCssLink('css/menu.css');
    view.addScript('menu.js');
}
