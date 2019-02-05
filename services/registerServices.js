let loginForm;
let registerForm;

setTimeout(() => {
    loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let username = document.getElementById("username-login").value;
        let password = document.getElementById("password-login").value;
        getByUsernameFromServer(`http://localhost:7000/api/users/?username=${username}&password=${password}`, login);
    })
}, 500);
setTimeout(() => {
    registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let country = document.getElementById("country").value;
        let password = document.getElementById("password").value;
        let pwdVerify = document.getElementById("check-password").value;
        if(password === pwdVerify)
        {
            postToServer(`http://localhost:7000/api/users`, {"email":email, "username":username,"country":country, "password": password}, (data) => {
                console.log(data);
                // console.log(data.responseText);
                // console.log(JSON.parse(data.responseText));
                console.log(JSON.parse(data).id);
                let id = JSON.parse(data).id;
                localStorage.setItem("user", JSON.stringify({"Id":id, "Email":email, "Username":username,"Country":country, "Password": password}));                    
                register();});
        }
        else {
            alert("Passwords don't match!");
        }
    })
}, 500);