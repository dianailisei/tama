function AccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/account.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    let user = JSON.parse(localStorage.getItem("user"));
    model.username = user.Username;
    model.email = user.Email;
    model.country = user.Country;
    model.password = user.Password;
    
    view.addScript('services/userServices.js');
    view.addScript('menu.js');
}