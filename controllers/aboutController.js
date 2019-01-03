function AboutController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/about.css');
    view.addCssLink('css/menu.css');
    view.addScript('menu.js');
}