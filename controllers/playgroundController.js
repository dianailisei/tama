function PlaygroundController(view, model) {
    view.removeLastCssLink();
    model.level = "1 XP";
    view.addCssLink('css/playground.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('services/playgroundServices.js');
    view.addScript('menu.js');
}