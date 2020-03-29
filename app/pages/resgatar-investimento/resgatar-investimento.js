(function () {
  'use strict';

  angular.module('myApp.resgatar-investimento', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/resgatar-investimento', {
        templateUrl: 'pages/resgatar-investimento/resgatar-investimento.html',
        controller: 'resgatar-investimentoCtrl'
      });
    }])

    .controller('resgatar-investimentoCtrl', [function () {

    }]);
})();