function getFromServer(url, callback) {
    var Http = new XMLHttpRequest();
    Http.open("GET", url, true);

    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            //console.log(Http.responseText);
            if (callback) {
                callback(Http.responseText);
            }
        }
    };
}


function putToServer(url, data, callback) {
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
        body: data, // body data type must match "Content-Type" header
    })
    .then(response => console.log(response)); // parses response to JSON
}
