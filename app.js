'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('about', 'about.html'),
            new Route('account', 'account.html'),
            new Route('add-pet', 'add-pet.html'),
            new Route('friend-account', 'friend-account.html'),
            new Route('playground', 'playground.html'),
            new Route('register', 'register.html'),
            new Route('your-friends', 'your-friends.html'),
            new Route('your-pets', 'your-pets.html')
        ]);
    }
    init();
}());