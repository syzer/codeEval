/**
 * Created by syzer on 8/28/2014.
 */
angular.module('jsSparkUiApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('functional', {
                url: '/functional',
                templateUrl: 'app/functional/functional.html',
                controller: 'FunctionalCtrl',
                authenticate: true
            });
    })
    .filter('boolean', function (_, $filter) {
        return function booleanFilter(input) {
            return input ? '\u2713' : '\u2718';
        };
    });

