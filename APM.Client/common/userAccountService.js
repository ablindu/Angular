(function () {
    "use strict";
    angular
        .module("services")
        .factory("userAccountService", ["$resource", "appSettings", userAccountService]);

    function userAccountService($resource, appSettings) {
        return {
            registration: $resource(appSettings.serverpath + "/api/Account/Register",
                null,
                {
                    "registerUser": { method: 'POST' }
                }),
            login: $resource(appSettings.serverpath + "/Token",
                null,// for url parameters
                {
                    "loginUser": {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        transformRequest: function(data, headersGetter) {
                            var str = [];
                            for (var d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                })
             };
    }
})();