function AccountController(view, model) {
    view.removeLastCssLink();
    view.addCssLink('css/account.css');
    view.addCssLink('css/menu.css');
    // view.removeLastScripts('account');
    // view.addScript('services/userServices.js');
    view.addScript('menu.js');
    
    let user = JSON.parse(localStorage.getItem("user"));
    model.username = user.Username;
    model.email = user.Email;
    model.country = user.Country;
    model.password = user.Password;

    setTimeout(() => {
        updateForm = document.getElementById("update-profile");
        updateForm.addEventListener("click", (e) => {
            e.preventDefault();
            let username = document.getElementById("username").value;
            if (username === '') username = model.username;
            let password = document.getElementById("new-password").value;
            let email = model.email;
            let country = document.getElementById("country").value;
            if (country === '') country = model.country;
            let oldPwd = document.getElementById("old-password").value;
            if (oldPwd === model.password) {
                update(`http://localhost:7000/api/users`, { "email": email, "username": username, "country": country, "password": password }, () => updateAccountForm({ "Email": email, "Username": username, "Country": country, "Password": password }))
            };
        })
    }, 500);
}