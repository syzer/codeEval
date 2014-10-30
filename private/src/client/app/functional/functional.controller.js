'use strict';

angular.module('jsSparkUiApp')
    .controller('FunctionalCtrl', function ($scope) {
        $scope.jsCode = {};

        $scope.editorOptions = {
            lineWrapping: true,
//            lineNumbers: true,
//            readOnly: 'nocursor',
            showCursorWhenSelecting: true,
            tabSize: 4,
            mode: "javascript"
        };

//        $(document).ready(function () {
//            $("#flip").click(function () {
//                $("#panel").slideUp("slow");
//            });
//        });

        function sql() {
            return "SELECT Book.title AS Title,\
                COUNT(*) AS Authors\
            FROM  Book\
            JOIN  Book_author\
            ON  Book.isbn = Book_author.isbn\
            GROUP BY Book.title;";
        };

        $scope.testMe = function() {
            console.log($scope.jsCode);
        }
    });

