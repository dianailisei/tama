function PlaygroundController(view, model) {
    model.name1 = "Tama1"; 
    // JSON.parse(localStorage.getItem("pet")).Name;
    view.removeLastCssLink();
    view.addCssLink('css/playground.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    view.addScript('services/playgroundServices.js');
    view.addScript('menu.js');
}