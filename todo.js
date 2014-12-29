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

//new talk
////////////////
// 1.queryParasiteSpecies: parasiteSpeciesService.query
//everyone?
//2. refactor query*Meethods to queryAndFilterDiseases()
/**
 * Created by syzer on 12/11/2014.
 */
angular.module('anemiaTphApp')
    .factory('parasiteService', function (lib, _, $resource, navbarItems, diseaseService, surveyService, parasiteSpeciesService, stoolMethodService, urineMethodService, bloodMethodService, skinTissueMethodService) {
        'use strict';

        var Resource = $resource('/api/parasites/:id');
        var current;

        return {

            queryByPointId: function (id) {
                return Resource.query({PointID: id}).$promise;
            },

            // a very db specific code
            newEntity: function (entity, parasite) {
                entity.PointID = parasite.PointID;
                entity.SurveyID = parasite.SurveyID;

                return entity;
            },

            save: function (item) {
                return Resource.save(item).$promise;
            },

            queryParasiteSpecies: parasiteSpeciesService.query,
            queryStoolMethods: function (query) {
                return stoolMethodService.query(query).then(filterDisease);
            },
            queryUrineMethods: function (query) {
                return urineMethodService.query(query).then(filterDisease);
            },
            queryBloodMethods: function (query) {
                return bloodMethodService.query(query).then(filterDisease);
            },
            querySkinTissueMethods: function (query) {
                return skinTissueMethodService.query(query).then(filterDisease);
            },

            get: function () {
                return current;
            },
            set: function (parasite) {
                current = parasite;
            }
        };

        function queryAndFilterDiseases(){}

        function filterDisease(stoolMethods) {
            return diseaseService
                .queryByCurrentSurvey()
                .then(function (disease) {
                    navbarItems.setDisease(disease);
                    return stoolMethods.filter(function(method){
                        return method.dis_cod === disease.dis_cod;
                    });
                });
        }

    })
    .factory('parasiteSpeciesService', function (lib, _, $resource) {
        'use strict';

        var Resource = $resource('/api/parasite-species/:id');
        var mapper = lib.map.newMapper({key: 'id', name: 'Parasite_species'});

        return {

            query: lib.resource.newQuery(Resource, mapper)
        };
    });


