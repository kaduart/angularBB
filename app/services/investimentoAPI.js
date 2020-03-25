(function () {

    'use strict';

    angular
        .module('myApp')

        .factory('investimentoAPI', investimentoAPI);

    investimentoAPI.$inject = ['$http']

    var api = 'http://www.mocky.io/v2/5e76797e2f0000f057986099'

    function investimentoAPI($http) {
        var _listaInvestimento = function () {
            return $http.get(api)
        };

        var _resgatarInvestimento = function (id) {
            return $http.get(api + id);
        };

        return {
            listaInvestimento: _listaInvestimento,
            resgatarInvestimento: _resgatarInvestimento
        }
    }
})()