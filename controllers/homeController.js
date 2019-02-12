function HomeController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/home.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    view.addScript('menu.js');
}
