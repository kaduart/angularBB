
// (function () {
//     'use strict';

//     angular
//         .module('myApp')
//         .controller('resgateCtrl', function ($scope, investimentoService) {

//             carregarInvestimentos();

//             function carregarInvestimentos() {
//                 var listaInvestimento = investimentoService.getTodosInvestimento();

//                 listaInvestimento.then(function (resp) {
//                     $scope.lstInvestimentos = resp.data.response.data.listaInvestimentos;
//                     console.log('testeeee', $scope.lstInvestimentos);
//                 },
//                     function () {
//                         console.log("Os dados nao foram listados!");
//                     }
//                 );
//             }


//         })
// })();

// $scope.resgatarInvestimento = function (id) {
//     investimentoAPI.resgatarAcao(id).then(function (resp) {
//         $scope.acoes = resp.data.response.data.listaInvestimentos.filter(function (el) {
//             return (el.id === id) ? el : null;
//         })
//         console.log('acao', $scope.acoes);
//     });
// }
