
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('resgateCtrl', function ($scope, acaoService, investimentosFactory, $timeout) {

            atualizarInvestimentoPorId();

            function atualizarInvestimentoPorId() {

                // get obj entre controllers
                $scope.investimento = investimentosFactory.get();

                var investimento = $scope.investimento
                $scope.atualizadoId = investimento.id;
                $scope.nome = investimento.nome;
                $scope.objetivo = investimento.objetivo;
                $scope.atualizadosaldoTotalDisponivel = investimento.saldoTotalDisponivel;
                $scope.acoes = investimento.acoes;


                angular.forEach($scope.acoes, function (acao) {

                    $scope.pegarInput = function (acao) {
                        var saldoTotalDisponivel = $scope.atualizadosaldoTotalDisponivel;
                        var valorIpt = acao.valorAResgatar;
                        var percentual = acao.percentual;
                        var desconto = 0;

                        if (saldoTotalDisponivel >= valorIpt) {

                            desconto = parseFloat(saldoTotalDisponivel * percentual / 100).toFixed(2);

                            saldoTotalDisponivel = saldoTotalDisponivel - desconto;
                        }

                        $scope.atualizadoIdAcao = acao.id;
                        $scope.atualizadoAcaoNome = acao.nome;
                        $scope.atualizadoAtualizadoPercentual = acao.percentual;
                        $scope.atualizadoValorAResgatar = saldoTotalDisponivel;
                    }

                })

            }


            $scope.atualizarInvestimento = function () {

                atualizarInvestimentoPorId();
                var novoInvestimento = { ...$scope.investimento }
                novoInvestimento.saldoTotalDisponivel = $scope.atualizadoValorAResgatar;

                var acoes = [...$scope.investimento.acoes]
                acoes.forEach(function (acao) {

                    if (acao.id === $scope.atualizadoIdAcao) {
                        acao.percentual = $scope.atualizadoAtualizadoPercentual;
                        acao.valorAResgatar = 0;
                    }
                })

                novoInvestimento.acoes = acoes;
                var atualizarInfos = acaoService.atualizar(novoInvestimento);
                atualizarInfos.then(function (data) {
                    if (data.success === true) {

                        $timeout(atualizarInvestimentoPorId, 5000);
                        limparDadosAtualizados();

                    } else {
                        console.log("Acão não resgatada");
                    }

                }).catch(error => (console.log(error)));
            }

            function limparDadosAtualizados() {
                $scope.atualizadoValorAResgatar = "";
            }
        });

})();

