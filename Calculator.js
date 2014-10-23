/**
 * Created by Rienk84 on 13-10-2014.
 */
var app = angular.module('calc', ['ngRoute']);

    app.factory('calculateFactory', ['$http', function($http){
        var urlBase = 'Calculator.php';
        var  calculateFactory = {};

        calculateFactory.getMachine = function(){
            return $http.get(urlBase);
        }

        calculateFactory.calculateTax = function(inkomen, ziektekosten,
            giften, koopwoning, studiekosten, schijf, total){
            return $http({
                url: urlBase,
                method: "GET",
                params: {inkomen: inkomen,
                         ziektekosten: ziektekosten,
                         giften: giften,
                         koopwoning: koopwoning,
                         studiekosten: studiekosten,
                         schijf: schijf,
                         total: total}
            });
        };
        return calculateFactory;
    }]) ;

app.controller('MainCtrl', ['$scope', 'calculateFactory', function ($scope, calculateFactory) {
    $scope.total;
    $scope.inkomen;
    $scope.studiekosten;
    $scope.koopwoning;
    $scope.ziektekosten;
    $scope.giften;
    $scope.schijf;
    $scope.tax;
    $scope.checked = false;

    $scope.calculateTax = function (){
        calculateFactory.calculateTax($scope.inkomsten, $scope.ziektekosten,
            $scope.giften, $scope.studiekosten, $scope.koopwoning, $scope.schijf)
            .success(function(result){
                $scope.inkomsten = result.inkomsten;
                $scope.ziektekosten = result.ziektekosten;
                $scope.giften = result.giften;
                $scope.studiekosten = result.studiekosten;
                $scope.koopwoning = result.koopwoning;
                $scope.schijf = result.schijf;
                $scope.total = result.total;
                $scope.status = "";
                $scope.checked = true;
            })
            .error(function (error){
                $scope.status = error;
                $scope.checked = false;
            });
    };
}]);