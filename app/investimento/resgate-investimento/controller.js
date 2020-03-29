
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

                var saldoTotalDisponivel = $scope.atualizadosaldoTotalDisponivel;

                angular.forEach($scope.acoes, function (acao) {

                    $scope.pegarInput = function (acao) {
                        var valorIpt = acao.valorAResgatar;
                        var percentual = acao.percentual;

                        if (valorIpt <= percentual && valorIpt <= saldoTotalDisponivel) {


                            saldoTotalDisponivel = parseFloat(saldoTotalDisponivel - (saldoTotalDisponivel * percentual / 100) - valorIpt).toFixed(2);

                            percentual = percentual - valorIpt;


                        } else if (valorIpt <= 0) {
                            alert('Ops...Você precisa digitar um valor');
                        } else if (saldoTotalDisponivel <= 0) {
                            alert('Excedeu o limite...');
                        } else {
                            alert('Valor superior ao seu saldo acumulado');
                        }

                        $scope.atualizadoIdAcao = acao.id;
                        $scope.atualizadoAcaoNome = acao.nome;
                        $scope.atualizadoAtualizadoPercentual = acao.percentual;
                        $scope.atualizadoValorAResgatar = saldoTotalDisponivel;
                    }

                })

            }


            $scope.atualizarInvestimento = function () {

                var novoInvestimento = { ...$scope.investimento }
                novoInvestimento.saldoTotalDisponivel = $scope.atualizadoValorAResgatar;

                var acoes = [...$scope.investimento.acoes]
                acoes.forEach(function (acao) {

                    if (acao.id === $scope.atualizadoIdAcao) {
                        acao.percentual = $scope.atualizadoAtualizadoPercentual;
                    }
                })

                novoInvestimento.acoes = acoes;
                var atualizarInfos = acaoService.atualizar(novoInvestimento);
                atualizarInfos.then(function (data) {
                    if (data.data.success === true) {

                        $timeout(atualizarInvestimentoPorId, 5000);

                    } else {
                        console.log("Acão não resgatada");
                    }

                }).catch(error => (console.log(error)));
            }

            $scope.limparDadosAtualizados = function () {
                $scope.atualizadoValorAResgatar = "";
            }
        });

})();

