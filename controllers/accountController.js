function AccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/account.css');
    view.addCssLink('css/menu.css');
    view.removeLastScripts();
    let user = JSON.parse(localStorage.getItem("user"));
    
    model.username = user.Username;
    model.email = user.Email;
    model.country = user.Country;
    model.password = user.Password;
    if(user.Id === undefined) {
        getByUsernameFromServer(`http://localhost:7000/api/users/?username=${model.username}&password=${model.password}`, login);
    }
    view.addScript('services/userServices.js');
    view.addScript('menu.js');
}