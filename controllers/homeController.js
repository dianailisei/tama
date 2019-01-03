function HomeController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/home.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('home');
    view.addScript('menu.js');

}
