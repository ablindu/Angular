(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("mainController",
                     ["userAccountService","currentUserService","authorizationService","$cookies", mainController]);

    function mainController(userAccountService, currentUserService, authorizationService,$cookies) {
        var vm = this;
        if ($cookies.get('loginToken')) {
            currentUserService.getProfile().isLoggedIn = true;
        }

        vm.isLoggedIn = function () {
            var loggedIn = currentUserService.getProfile().isLoggedIn;
           //if token cookie exists, take it from there and authenticate, else FALSE
            console.log("IS LOGGED IN? => "+loggedIn);
            return loggedIn;
        };
        vm.message = "";
        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;
            userAccountService.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "... Registration successful!";
                    vm.login();
                },
                function (response) {
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }
        vm.login = function () {
            //defining the autenthication type (user+password)
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccountService.login.loginUser(vm.userData,
                function (onSuccessData) {
                    vm.message = "";
                    vm.password = "";
                    currentUserService.setProfile(onSuccessData.userName, onSuccessData.access_token);
                   // currentUserService.setTokenCookie(onSuccessData.userName, onSuccessData.access_token);
                    $cookies.put("loginToken", onSuccessData.access_token);
                },
                function (errorResponse) {
                    vm.password = "";
                    vm.message = errorResponse.statusText + "\r\n";
                    if (errorResponse.data.exceptionMessage)
                        vm.message += errorResponse.data.exceptionMessage;
                    if (errorResponse.data.error)
                        vm.message += errorResponse.data.error;
                });
        }
        vm.logout = function() {
            authorizationService.cleanTokenCookie();
        }
    }
})();