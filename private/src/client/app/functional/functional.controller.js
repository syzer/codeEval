'use strict';

angular.module('jsSparkUiApp')
    .controller('FunctionalCtrl', function ($scope, _, intro, tasks) {

        $scope.js = intro.js;
        $scope.sql = intro.sql;
        $scope.xml = intro.xml;
        $scope.logo = intro.logo;
        $scope.task1 = tasks.task1;
        $scope.task2 = tasks.task2;
        $scope.articles = tasks.articles;
        $scope.incompleteTaskSummary = tasks.incompleteTaskSummary;

        $scope.coffee = tasks.coffee
    });

