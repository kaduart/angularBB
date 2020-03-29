'use strict';

angular.module('myApp.investimento', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/investimento', {
            templateUrl: 'pages/investimento/investimento.html',
            controller: 'investimentoCtrl'
        });
    }])

    .controller('investimentoCtrl', [function () {

    }]);