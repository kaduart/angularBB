(function () {
    'use strict';

    angular
        .module('myApp')
        .service('investimentoService', function ($http) {
            this.getTodosInvestimento = function () {
                return $http.get("http://www.mocky.io/v2/5e76797e2f0000f057986099");
            }
        })
})();