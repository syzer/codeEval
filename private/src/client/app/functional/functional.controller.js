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
        $scope.testMe = function() {
            console.log($scope.jsCode);
        }
    });

