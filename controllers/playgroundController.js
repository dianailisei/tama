function PlaygroundController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/playground.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('menu.js');
}