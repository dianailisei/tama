function getByUsernameFromServer(url, callback) {
    var Http = new XMLHttpRequest();
    Http.open("GET", url, true);

    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            if (callback) {
                callback(Http.responseText);
            }
        }
    };
}

function getFromServer(url, callback) {
    var Http = new XMLHttpRequest();
    Http.open("GET", url, true);

    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            if (callback) {
                callback(Http.responseText);
            }
        }
    };
}

function postToServer(url, data, callback) {
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => {
            return response.text().then(text => {
                callback(text);
            });
        });
    // parses response to JSON
}

// function putToServer(url, data, callback) {
function update(url, data, callback) {
    return fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response =>
            callback()
        );
}

function login(data) {
    let user = JSON.parse(data)[0];
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "#account";
}

function register() {
    window.location.href = "#account";
}

function updateAccountForm(user) {
    localStorage.setItem("user", JSON.stringify(user));
    let usernameInput = document.getElementById("username");
    let countryInput = document.getElementById("country");
    if (user.Username !== usernameInput.getAttribute("placeholder")) {
        usernameInput.setAttribute("placeholder", user.Username);
    }
    if (user.Country != countryInput.getAttribute("placeholder")) {
        countryInput.setAttribute("placeholder", user.Country);
    }
    clearInputs();
}

function clearInputs() {
    let inputs = document.getElementsByTagName("input");
    for(let input of inputs) {
        input.value = '';
    }
}