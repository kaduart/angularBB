(function () {
    'use strict';

    angular
        .module('myApp')
        .service('acaoService', function ($http) {

            this.atualizar = function (investimento) {
                var request = $http({
                    method: 'put',
                    url: `http://localhost:3000/listaInvestimentos/${investimento.id}`,
                    data: investimento
                })
                return request;
            }
        });
})()