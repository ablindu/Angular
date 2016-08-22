(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("productEditController",
                    ["productService", "authorizationService", productEditController]);

    function productEditController(productService, authorizationService) {
        var vm = this;
        vm.product = {};
        vm.message = "";

        productService.get({ id: 5 },
            function (data) {
                vm.product = data;
                vm.originalProduct = angular.copy(data);
            },
            function (response) {
                vm.message = response.statusText + "\r\n";
                if (response.data.exceptionMessage) {
                    vm.message += response.data.exceptionMessage;
                }
            });

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.submit = function () {
            if (vm.product.productId) {
                vm.message = "";
                vm.product.$update({ id: vm.product.productId },
                    function (data) {
                        vm.message = "... Update Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.status === 401) {
                            authorizationService.cleanTokenCookie();
                        }
                        if (response.data.modelstate) {
                            for (var key in response.data.modelstate) {
                                vm.message += response.data.modelstate[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
            } else {
                vm.product.$save(
                    function (data) {
                        vm.originalProduct = angular.copy(data);
                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.data.modelstate) {
                            for (var key in response.data.modelstate) {
                                vm.message += response.data.modelstate[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = "";
        };

    }
}());
