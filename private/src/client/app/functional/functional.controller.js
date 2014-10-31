'use strict';

angular.module('jsSparkUiApp')
    .controller('FunctionalCtrl', function ($scope, _, intro, tasks) {

        $scope.js = intro.js;
        $scope.sql = intro.sql;
        $scope.xml = intro.xml;
        $scope.logo = intro.logo;
        $scope.task1 = tasks.task1;

    });

