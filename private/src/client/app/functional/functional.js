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
    .factory('add2Tabs', function () {
        return function (el) {
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

        var serverTasks = {
            result: 'SUCCESS',
            interfaceVersion: '1.0.3',
            requested: '10/17/2013 15:31:20',
            lastUpdated: '10/16/2013 10:52:39',
            tasks: [
                {
                    id: 104, complete: false, priority: 'high',
                    dueDate: '2013-11-29', username: 'Scott',
                    title: 'Do something', created: '9/22/2013'
                },
                {
                    id: 105, complete: false, priority: 'medium',
                    dueDate: '2013-11-22', username: 'Lena',
                    title: 'Do something else', created: '9/22/2013'
                },
                {
                    id: 107, complete: true, priority: 'high',
                    dueDate: '2013-11-22', username: 'Mike',
                    title: 'Fix the foo', created: '9/22/2013'
                },
                {
                    id: 108, complete: false, priority: 'low',
                    dueDate: '2013-11-15', username: 'Punam',
                    title: 'Adjust the bar', created: '9/25/2013'
                },
                {
                    id: 110, complete: false, priority: 'medium',
                    dueDate: '2013-11-15', username: 'Scott',
                    title: 'Rename everything', created: '10/2/2013'
                },
                {
                    id: 112, complete: true, priority: 'high',
                    dueDate: '2013-11-27', username: 'Lena',
                    title: 'Alter all quuxes', created: '10/5/2013'
                }
                // , ...
            ]
        };
        serverTasks = JSON.stringify(serverTasks, null, 2);

        var fetchData = function () {
            var deffered = Q.defer();
            setTimeout(function () {
                deffered.resolve(data);
            }, 1000);
            return deffered.promise;
        };

        fetchData = String(fetchData);

        var expectedTasksSummary = [
            {
                id: 110,
                priority: 'medium',
                dueDate: '2013-11-15',
                title: 'Rename everything'
            },
            {
                id: 104,
                priority: 'high',
                dueDate: '2013-11-29',
                title: 'Do something'
            }
        ];
        expectedTasksSummary =  JSON.stringify(expectedTasksSummary, null, 2);

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
            },
            incompleteTaskSummary: {
                serverTasks: serverTasks,
                fetchData: fetchData,
                expectedTaskSummary: expectedTasksSummary,
                opts: editorOptions
            },
            coffee: {
                opts: 'text/x-coffeescript'
            }
        }
    });

