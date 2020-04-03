
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

                        if (valorIpt > 0 && valorIpt < saldoTotalDisponivel) {
                            desconto = saldoTotalDisponivel * percentual / 100;

                            saldoTotalDisponivel -= desconto;
                        } else if (valorIpt > saldoTotalDisponivel) {
                            alert('Valor digitado é superior ao seu saldo');
                        } else if (valorIpt == 0) {
                            alert('Você precisa digitar um valor a ser resgatado.')
                        }
                        saldoTotalDisponivel -= valorIpt;

                        $scope.atualizadoIdAcao = acao.id;
                        $scope.atualizadoAcaoNome = acao.nome;
                        $scope.atualizadoAtualizadoPercentual = acao.percentual;
                        $scope.atualizadoValorAResgatar = parseFloat(saldoTotalDisponivel).toFixed(2);
                    }

                });

            }

            $scope.atualizarInvestimento = function () {

                var novoInvestimento = { ...$scope.investimento }

                novoInvestimento.saldoTotalDisponivel = $scope.atualizadoValorAResgatar;

                var acoes = [...$scope.investimento.acoes]
                acoes.forEach(function (acao) {

                    if (acao.id === $scope.atualizadoIdAcao) {
                        acao.percentual = $scope.atualizadoAtualizadoPercentual;
                        acao.valorAResgatar = '';
                    }
                })

                novoInvestimento.acoes = acoes;
                var atualizarInfos = acaoService.atualizar(novoInvestimento);
                atualizarInfos.then(function (data) {
                    if (data.success === true) {
                        console.log("Acão resgatada resgatada");
                        atualizarInvestimentoPorId();
                    } else {
                        console.log("Acão não resgatada");
                    }

                }).catch(error => (console.log(error)));
            }

        });

})();

