/**
 * Created by syzer on 10/31/2014.
 */
var _ = require('lodash');

// task #1 FLUID API
function makeSandwich() {
    var preparedFood = 'Here is a sandwich with: ';

    return {
        addLattice: function () {
            // Lattice logic here
            preparedFood += 'Lattice';
            return this;
        },
        addBacon: function () {
            preparedFood += 'Bacon';
            return this;
        },
        addTomato: function () {
            preparedFood += 'Tomato';
            return this;
        },
        getFood: function () {
            return preparedFood;
        }
    }
}

makeSandwich()
    .addLattice()
    .addBacon()
    .addTomato()
    .getFood();


function fluent(methodBody) {
    return function fluentized() {
        methodBody.apply(this, arguments);   // apply this function
        return this;
    }
}

//#fluid-sandwich
function makeFluentSandwich() {
    var preparedFood = 'Here is a sandwich with: ';

    return {
        addLattice: fluent(function () {
            // Lattice logic here
            preparedFood += 'Lattice';
        }),
        addBacon: fluent(function () {
            preparedFood += 'Bacon';
        }),
        addTomato: fluent(function () {
            preparedFood += 'Tomato';
        }),
        getFood: function () {
            return preparedFood;
        }
    }
}
makeFluentSandwich()
    .addLattice()
    .addBacon()
    .addTomato()
    .getFood();
//=> Here is a sandwich with: LatticeBaconTomato

// task#2
function nextNum() {
    var count = 1;
    nextNum = function () {
        return ++count;
    };
    return count;
}

// transparent references
// task#3
var adder = function (x) {
    return function (y) {
        return x + y;
    }
};

var add = function (a, b) {
    return a + b;
};
console.log(adder(1)(2)); //=> 3

//#3-using-curry
var adder = _.curry(add);

//console.log('\n------adder-----')
adder(1)(2); //=>3


// task#4 map warmup
function addNameProp(el) {
    return {name: el}
}


//#flip
function flip(fn) {
    return function flipped(a, b) {
        return fn.call(this, b, a);
    }
}
function fromTo(a, b) {
    return "from: " + a + " to: " + b;
}

//#flip-fromTo
var returnTrip = flip(fromTo);
fromTo('Basel', 'Zurich');             //=> from: Basel to: Zurich
returnTrip('Basel', 'Zurich');          //=> from: Zurich to: Basel




// task #function composiotion
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

// #map-compose
var firstTitle = function (iterable) {
    return iterable.map(function (el) {
        return el.title;
    })[0]
};

// #reduce-compose
var firstTitle = function (iterable) {
    return iterable.reduce(function (acc, el, i) {
        0 === i ? acc = el.title : null;
        return acc;
    }, '')
};

//console.log('reduce:', firstTitle(articles));

// #filter-compose
// not valid
//var firstTitle = function (iterable) {
//    return iterable.filter(function (el,i) {
//        return 0 === i;
//    })[0].title
//};
//console.log('filter:', firstTitle(articles));

//#compose-compose
var rPluck = _.curry(function (x, xs) {
    return _.pluck(xs, x);
});
var getTitle = rPluck('title');
var firstTitle = _.compose(_.first, getTitle);
console.log(firstTitle(articles));
//=>Why OO Sucks by Joe Armstrong


// -- Challenge 2 -------------------------
// Return a array of the author names
// using only _.get, _.compose, and _.map.


var authorsNames = _.compose(rPluck('name'), rPluck('author'));
console.log(authorsNames(articles));

var isAuthor = _.curry(function (x, xs) {
    return _.contains(authorsNames(x), xs);
});

console.log(isAuthor(articles)('Michael Fogus'));   //=> true
console.log(isAuthor(articles)('Lukas'));           //=> false


//var isAuthor = _.curry(function (x, xs) {
//    return _.compose(_.contains(x), names)(xs);
//});
//console.log(isAuthor(articles)('Michael Fogus'));


console.log("--------AVG--------");
// TODO AVG not working!!
// As you can see, the fork function is a
// pipeline like compose, except it duplicates
// its value, sends it to two functions, then
// sends the results to a combining function.
//
var sum = function (a, b) {
    console.log('sum:', a, b);
    return a + b;
};

var cSum = _.curry(sum);
var divide = function (a, b) {
    console.log('divide:', a, b);
    return a / b;
};
var cDivide = _.curry(divide);

_.mixin({sum: cSum, divide: divide});

var fork = _.curry(function (lastly, f, g, x) {
    return lastly(f(x), g(x));
});
var avg = fork(_.divide, _.sum, _.size); //TODO size sum divide
//var avg = undefined; // change this
//assertEqual(3, avg([1,2,3,4,5]));
//console.log(avg([1, 2, 3, 4, 5]));
//
//console.log('size:', _.size([1, 2, 3, 4]));

console.log("--------AVG PASS--------");


var before = curry(
    function decorate(decoration, method) {
        return function decoratedWithBefore() {
            decoration.apply(this, arguments);
            return method.apply(this, arguments);
        };
    }
);
// AKA ZF2
var stupid = {
    remove: function () {
        if (!this.isAdmin()) {
            this.remove()
        }
        // destroy code
        return this;
    }
};

var isAdminFirst = before(function () {
    this.isAdmin();
});

var lessStupid = {
    remove: isAdminFirst(function () {
        // destroy code
        return this;
    })
};

var evenLessStupid = {
    remove: isAdminFirst(fluent(function () {
        // destroy code
    }))
};

// curry unary combinators
function curry(fn) {
    return function curried(a, optionalB) {
        if (arguments.length > 1) {
            return fn.call(this, a, optionalB);
        } else {
            return function partiallyApplied(b) {
                return fn.call(this, a, b);
            }
        }
    }
}

// #after-decorator
var after = curry(
    function decorate(decoration, method) {
        return function decoratedWithAfter() {
            var returnValue = method.apply(this, arguments);
            decoration.apply(this, arguments);
            return returnValue;
        };
    }
);


var double = function (n) {
    return n * 2;
};

//#after-decorator-with-logging
var doubleWithLog = after(console.log, double);
console.log(doubleWithLog(2)); //=>4 (console log first arguments)


var data = {
    result: 'SUCCESS',
    interfaceVersion: '1.0.3',
    requested: '10/17/2013 15:31:20',
    lastUpdated: '10/16/2013 10:52:39',
    tasks: [
        {id: 104, complete: false, priority: 'high',
            dueDate: '2013-11-29', username: 'Scott',
            title: 'Do something', created: '9/22/2013'},
        {id: 105, complete: false, priority: 'medium',
            dueDate: '2013-11-22', username: 'Lena',
            title: 'Do something else', created: '9/22/2013'},
        {id: 107, complete: true, priority: 'high',
            dueDate: '2013-11-22', username: 'Mike',
            title: 'Fix the foo', created: '9/22/2013'},
        {id: 108, complete: false, priority: 'low',
            dueDate: '2013-11-15', username: 'Punam',
            title: 'Adjust the bar', created: '9/25/2013'},
        {id: 110, complete: false, priority: 'medium',
            dueDate: '2013-11-15', username: 'Scott',
            title: 'Rename everything', created: '10/2/2013'},
        {id: 112, complete: true, priority: 'high',
            dueDate: '2013-11-27', username: 'Lena',
            title: 'Alter all quuxes', created: '10/5/2013'}
        // , ...
    ]
};

var fetchData = function () {
    var deffered = Q.defer();
    setTimeout(function () {
        deffered.resolve(data);
    }, 1000);
    return deffered.promise;
};


//#curry-task-summary
var getIncompleteTaskSummaries = function (memberName) {
    return fetchData()
        .then(function (data) {
            return data.tasks;
        })
        .then(function (tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].username == memberName) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function (tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function (tasks) {
            return tasks.map(function (task) {
                return {
                    id: task.id,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    title: task.title
                }
            });
        })
        .then(function (tasks) {
            tasks.sort(function (first, second) {
                var a = first.dueDate, b = second.dueDate;
                return a < b ? -1 : a > b ? 1 : 0;
            });
            return tasks;
        });
};
