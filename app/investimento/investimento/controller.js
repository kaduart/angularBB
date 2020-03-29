(function () {
    'use strict';

    angular
        .module('myApp')

        .controller('investimentoCtrl', function ($scope, investimentoService, investimentosFactory) {

            carregarInvestimentos();

            function carregarInvestimentos() {
                var listaInvestimento = investimentoService.getTodosInvestimento();

                listaInvestimento.then(function (resp) {
                    $scope.lstInvestimentos = resp.data;
                });
            }

            $scope.atualizarInvestimentoPorId = function (acao) {
                //set obj entre controlles
                $scope.investimento = acao;
                investimentosFactory.set($scope.investimento);
            }

        });
})();