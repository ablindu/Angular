(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("productListController", ["productService",
                     productListController]);

    function productListController(productService) {
        var vm = this;
        //vm.searchCriteria = "GDN";
        productService.query({
          //  $filter: "substringof('" + vm.searchCriteria + "',ProductCode) and Price lt 10",
            $orderby: "Price desc"
        },function (data) {
            vm.products = data;
        });
    }
}());
