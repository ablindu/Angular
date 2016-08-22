(function () {
    "use strict";
    angular
        .module("services")
        .factory("authorizationService", ["$cookies",/* "$location",*/"currentUserService", authorizationService]);

    function authorizationService($cookies, /*$location, */currentUserService) {
        var cleanTokenCookie = function () {
            $cookies.remove("loginToken");
            currentUserService.getProfile().isLoggedIn = false;
           // $location.path("/index.html").replace();
        }
        return { cleanTokenCookie: cleanTokenCookie }
    };

})();