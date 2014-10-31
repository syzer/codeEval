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
    })
    //TODO
    .factory('add2Tabs', function() {
        return function(el) {
                return '        ' + el;
        }
    })
    .factory('editorOptions', function () {
        return {
            lineWrapping: true,
            showCursorWhenSelecting: true,
            tabSize: 4,
            mode: "javascript",
            matchBrackets: true
        }
    })
    .factory('intro', function (_, editorOptions, add2Tabs) {
        var jsOptions = editorOptions;

        var sqlOptions = _.clone(jsOptions);
        sqlOptions.mode = "text/x-mysql";

        var xmlOptions = _.clone(jsOptions);
        xmlOptions.mode = "text/x-mysql";

        var logoOptions = _.clone(jsOptions);
        logoOptions.mode = "text/x-verilog";

        var jsCode = [
            "$(document).ready(function () {",
            "    $('#flip').click(function () {",
            "        $('#panel').slideUp('slow');",
            "    });",
            "});"
        ].map(add2Tabs).join('\n');

        var sqlCode = [
            "SELECT Book.title AS Title,",
            "COUNT(*) AS Authors",
            "FROM  Book",
            "JOIN  Book_author",
            "ON  Book.isbn = Book_author.isbn",
            "GROUP BY Book.title;"
        ].map(add2Tabs).join('\n');

        var xmlCode = [
            "<note>",
            "	<to>Tove</to>",
            "	<from>Jani</from>",
            "	<heading>Reminder</heading>",
            "	<body>Dont forget me this weekend!</body>",
            "</note>"
        ].map(add2Tabs).join('\n');

        var logoCode = [
            "#logo",
            "to reverse :stuff",
            "ifelse equal? count :stuff 1",
            "[output first :stuff]",
            "[output sentence reverse butfirst :stuff first :stuff]",
            "end",
            "",
            "print reverse [apples and pears]",
            "pears and apples"
        ].map(add2Tabs).join('\n');

        return {
            js: {
                caption: 'Being alive after 2006 and do WebDevelopment:',
                code: jsCode,
                opts: jsOptions
            },
            sql: {
                caption: 'Used a DB:',
                code: sqlCode,
                opts: sqlOptions
            },
            xml: {
                caption: 'Used XML:',
                code: xmlCode,
                opts: xmlOptions
            },
            logo: {
                caption: 'Was forced @school to do logo:',
                code: logoCode,
                opts: logoOptions
            }
        }

    })
    .factory('tasks', function (editorOptions, add2Tabs) {
        var code = function makeSandwich(ifBacon, ifLattice, ifTomato) {
        ifBacon = ifBacon ? 'Bacon' : '';
        ifLattice = ifLattice ? 'Lattice' : '';
        ifTomato = ifTomato ? 'Tomato' : '';

    // ... 80 LOC switch case logic of lattice, bacon, tomato

           return {
                getFood: function () {
                    return 'Here is a sandwich with: '
                        + ifBacon + ifLattice + ifTomato;
                }
           }
        };

        var expected = [
            "makeSandwich()",
            "    .addLattice()",
            "    .addBacon()",
            "    .addTomato()",
            "    .getFood();"
        ].map(add2Tabs).join('\n');

        var code2generator = [
            'nextNum();          //=> 1',
            'nextNum();          //=> 2',
            'nextNum();          //=> 3',
            'nextNum();          //=> 4'
        ].map(add2Tabs).join('\n');

        var articles = [
            {
                title: 'Why OO Sucks by Joe Armstrong',
                url: 'http://www.bluetail.com/~joe/vol1/v1_oo.html',
                author: {
                    name: 'Joe Armstrong',
                    email: 'empty@email.com'
                }
            },
            {
                title: 'Functional JavaScript',
                url: 'http://shop.oreilly.com/product/0636920028857.do',
                author: {
                    name: 'Michael Fogus',
                    email: 'empty2@email.com'
                }
            }
        ];
        articles = JSON.stringify(articles, null, 2);

        return {
            task1: {
                caption: "You have a overloaded method that takes 3 arguments, " +
                "change it to Fluent API",
                opts: editorOptions,
                code: code,
                expected: expected
            },
            task2: {
                caption: "Make a function that behaves like",
                opts: editorOptions,
                code: code2generator
            },
            articles: {
                code: articles
            }
        }
    });

