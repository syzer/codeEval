'use strict';

angular.module('jsSparkUiApp')
    .controller('FunctionalCtrl', function ($scope, _) {

        $scope.jsCode = $(document).ready(function () {
            $("#flip").click(function () {
                $("#panel").slideUp("slow");
            });
        });

        $scope.jsOptions = {
            lineWrapping: true,
            showCursorWhenSelecting: true,
            tabSize: 4,
            mode: "javascript"
        };
        $scope.sqlOptions = _.clone($scope.jsOptions);
        $scope.sqlOptions.mode = "sql";

//        $(document).ready(function () {
//            $("#flip").click(function () {
//                $("#panel").slideUp("slow");
//            });
//        });

        $scope.sqlCode = "SELECT Book.title AS Title,\
                COUNT(*) AS Authors\
            FROM  Book\
            JOIN  Book_author\
            ON  Book.isbn = Book_author.isbn\
            GROUP BY Book.title;";

        $scope.change = function(item) {
            console.log(item);
        };

        $scope.testMe = function() {
            console.log($scope.jsCode);
        };
    });

