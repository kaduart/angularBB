(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('investimentosFactory', function () {
            var valor = {}

            function set(data) {
                valor = data;
            }
            function get() {
                return valor;
            }

            return {
                set: set,
                get: get
            }
        })
})();