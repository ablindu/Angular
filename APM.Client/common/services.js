(function() {
    "use strict";
    angular
        .module("services", ["ngResource", "ngCookies"])
        .constant("appSettings",
        {
            serverpath: "http://localhost:8080"
        });
})()