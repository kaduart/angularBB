(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('investimentoCtrl', function ($scope, investimentoService) {

            $scope.lstInvestimentos = [];
            carregarInvestimentos();

            function carregarInvestimentos() {
                var listaInvestimento = investimentoService.getTodosInvestimento();

                listaInvestimento.then(function (resp) {
                    $scope.lstInvestimentos = resp.data.response.data.listaInvestimentos;
                    console.log('testeeee', $scope.lstInvestimentos);
                },
                    function () {
                        console.log("Os dados nao foram listados!");
                    }
                );
            }


        })
})();