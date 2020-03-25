(function () {

    'use strict';

    angular
        .module('myApp')
        .controller('investimentoController', investimentoController);

    investimentoController.$inject = ['investimentoAPI', '$scope']

    function investimentoController(investimentoAPI, $scope) {

        $scope.investimentos = [];
        $scope.acoes = {};

        var listaInvestimento = function () {
            investimentoAPI.listaInvestimento().then(function (resp) {
                $scope.investimentos = resp.data.response.data.listaInvestimentos;
            });
        }

        if ($scope.investimentos.length === 0) {

            listaInvestimento();
        }

        $scope.resgatarInvestimento = function (el) {

            $scope.acoes = el;
            console.log('aaaaaa', $scope.acoes);
            console.log('iiiii', $scope.investimentos);
        }



    }
})();