(function() {
    "use strict";
    angular
        .module("services")
        .factory("productService", ["$resource", "appSettings", "currentUserService","$cookies", productService]);

    function productService($resource, appSettings, currentUserService, $cookies) {
        var token = "Bearer " + currentUserService.getProfile().token;

        if ($cookies.get('loginToken')) {
            token = "Bearer " + $cookies.get('loginToken');
        }
        return $resource(appSettings.serverpath + "/api/products/:id",
            null,
            {
                'get': {
                    headers: { "Authorization": token }
                },
                'save': {
                    headers: { "Authorization": token }
                },
                'update': {
                    method: 'PUT',
                    headers: { "Authorization": token }
                }
            });
    }
})();