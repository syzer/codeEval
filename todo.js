// POC remove me
function functionCreate(key, value) {
       if (!key) {
           return value;
       }
       if ('string' === typeof value) {
           var funcRegExp = /^function[^\(]*\(([^\)]*)\)[^\{]*{(([^\}]*|\}[^$])*)\}$/,
               match = value.match(funcRegExp);
           if (match) {
               var args = match[1]
                   .split(',')
                   .map(function (arg) {
                       return arg.replace(/\s+/, '');
                   });
               return new Function(args, match[2]);
           }
       }
       return value;
   }
var filters = function(a, b){
 console.log(a, b);
 return a + b;
}
var filtersString = JSON.stringify(filters, function (key, value) {
   if (typeof value === 'function') {
         return value.toString();
     }
       return value;
   });
var localFn = JSON.parse(filtersString, function (key, value) {
  if (value && typeof value === "string" && value.substr(0,8) == "function") {
          var startBody = value.indexOf('{') + 1;
           var endBody = value.lastIndexOf('}');
           var startArgs = value.indexOf('(') + 1;
          var endArgs = value.indexOf(')');

          return new Function(value.substring(startArgs, endArgs)
                            , value.substring(startBody, endBody));
      }
});
localFn('test','me');


function makeSandwich(ifBacon, ifLattice, ifTomato) {
    ifBacon = ifBacon ? 'Bacon': '';
    ifLattice = ifLattice ? 'Lattice' : '';
    ifTomato = ifTomato ? 'Tomato': '';

    // ... 80 LOC switch case logic for preparation of lattice, bacon, tomato

    return {
        getFood: function() {
            return 'Here is a sandwich with: ' + ifBacon + ifLattice + ifTomato;
        }
    }
}

console.log(makeSandwich(true, false, true).getFood());
console.log(makeSandwich(true, false).getFood());
//Here is a sandwich with: Bacon,,Tomato
//Here is a sandwich with: Bacon,,


function makeSandwich2() {
    var preparedFood = 'Here is a sandwich with: ';

    return {
        addLattice: function() {
            // Lattice logic here
            preparedFood += 'Lattice';
            return this;
        },
        addBacon: function() {
            preparedFood += 'Bacon';
            return this;
        },
        addTomato: function() {
            preparedFood += 'Tomato';
            return this;
        },
        getFood: function() {
            return preparedFood;
        }
    }
}

makeSandwich()
    .addLattice()
    .addBacon()
    .addTomato()
    .getFood();


