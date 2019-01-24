function AboutController(view, model) {
    model.dev1 = "Cristiana Antăluț";
    model.dev2 = "Diana Ilisei";
    model.description = "web app description";
    view.removeLastCssLink();
    view.addCssLink('css/about.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('about');
    view.addScript('menu.js');
}