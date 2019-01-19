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
function postToServer(url, data, callback) {
    var Http = new XMLHttpRequest();
    Http.open("POST", url, true);

    Http.send(data);

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            //console.log(Http.responseText);
            if (callback) {
                callback(Http.responseText);
            }
        }
    };
}