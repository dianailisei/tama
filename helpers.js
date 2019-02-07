function getByUsernameFromServer(url, callback) {
    var Http = new XMLHttpRequest();
    Http.open("GET", url, true);

    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            if (Http.responseText == "[]") {
                Alert.render("Incorrect username or password. Please try again.")
                clearInputs();
            }
            else
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
    Alert.render("Changes have been made successfully");
    clearInputs();
}

function clearInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = '';
    }
}


function CustomAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Warning";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();

function isFriend(friends, user) {
    let ok = 0;
    friends.forEach(friend => {
        if (friend.Id === user.Id) {
            ok = 1;
            // console.log(friend.Id, user.Id);
        }
    });
    if (ok === 0) return true;
    else return false;
}