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

console.log(adder(1)(2)); //=> 3

// task#4 map warmup
function addNameProp(el) {
    return {name: el}
}


//TODO composeVsChain

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

var rPluck = _.curry(function (x, xs) {
    return _.pluck(xs, x);
});
var getTitle = rPluck('title');
var firstTitle2 = _.compose(_.first, getTitle);
console.log(firstTitle2(articles));
//=>Why OO Sucks by Joe Armstrong


// -- Challenge 2 -------------------------
// Return a array of the author names
// using only _.get, _.compose, and _.map.


//isAuthor uses the names function above to see if
// a given person wrote any of the articles.
// "Uncompose" the function below by rewrite it
// without _.compose to make it more natural.
//TODO as exercise
var names = _.compose(rPluck('name'), rPluck('author'));
console.log(names(articles));

var containsNames = _.contains(names(articles), 'Michael Fogus');
var containsNames = _.compose(_.contains, names);

var containsNames = _.curry(function (xs, x) {
    console.log('x:', x,  'xs',xs);
    return _.compose(_.contains(x), names)(xs);
});
console.log(containsNames(articles)('Michael Fogus'))

//var isAuthor = _.curry(function (x, xs) {
//    return _.compose(_.contains(x), names)(xs);
//});
//console.log(isAuthor(articles)('Michael Fogus'));
