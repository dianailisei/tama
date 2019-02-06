setTimeout(() => {
    updateForm = document.getElementById("update-profile");
    updateForm.addEventListener("click", (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem("user"));
        let username = document.getElementById("username").value;
        if (username === '') username = user.Username;
        let password = document.getElementById("new-password").value;
        let email = user.Email;
        let country = document.getElementById("country").value;
        if (country === '') country = user.Country;
        let oldPwd = document.getElementById("old-password").value;
        if (oldPwd === user.Password) {
            if (password !== '') {
                update(`http://localhost:7000/api/users`, { "id": user.id, "email": email, "username": username, "country": country, "password": password }, () => updateAccountForm({ "Email": email, "Username": username, "Country": country, "Password": password }))
            }
            else {
                update(`http://localhost:7000/api/users`, { "id": user.id, "email": email, "username": username, "country": country, "password": oldPwd }, () => updateAccountForm({ "Email": email, "Username": username, "Country": country, "Password": oldPwd }))
            }
        }
        else {
            Alert.render("Incorrect current password. Please try again.");
            clearInputs();
        }
    })
}, 500);