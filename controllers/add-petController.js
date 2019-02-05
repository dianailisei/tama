function AddPetController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/add-pet.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('add-pet');
    view.addScript('services/addPetServices.js');
    view.addScript('menu.js');
}