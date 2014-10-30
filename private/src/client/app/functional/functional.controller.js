'use strict';

angular.module('jsSparkUiApp')
    .controller('FunctionalCtrl', function ($scope, _) {

        $scope.jsOptions = {
            lineWrapping: true,
            showCursorWhenSelecting: true,
            tabSize: 4,
            mode: "javascript",
            matchBrackets: true
        };
        $scope.sqlOptions = _.clone($scope.jsOptions);
        $scope.sqlOptions.mode = "text/x-mysql";

        $scope.jsCode = [
            "$(document).ready(function () {",
            "    $('#flip').click(function () {",
            "        $('#panel').slideUp('slow');",
            "    });",
            "});"
        ].join('\n');

        $scope.sqlCode = [
            "SELECT Book.title AS Title,",
            "COUNT(*) AS Authors",
            "FROM  Book",
            "JOIN  Book_author",
            "ON  Book.isbn = Book_author.isbn",
            "GROUP BY Book.title;"
        ].join('\n');

        $scope.change = function (item) {
            console.log(item);
        };

        $scope.testMe = function () {
            console.log($scope.jsCode);
        };
    });

