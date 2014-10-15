/**
 * Created by Rienk84 on 13-10-2014.
 */
var app = angular.module('calc', ['ngRoute']);

app.config('$routeProvider', function($routeProvider){
    $routeProvider.when('/calculator', {
        templateUrl: 'Calculator/views/view.html',
        controller: 'MainController'
    });
});

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.total;
    $scope.inkomen;
    $scope.studiekosten;
    $scope.koopwoning;
    $scope.ziektekosten;
    $scope.giften;
    $scope.schijf;
    $scope.tax;

    $scope.calculateTax = function () {
        if ($scope.inkomen > 0 && $scope.inkomen <= 19645) {
            $scope.schijf = "Schijf 1";
            $scope.tax = (($scope.inkomen / 100 ) * 36.25);
        }
        else if($scope.inkomen >= 19646 && $scope.inkomen <= 33363){
            $scope.schijf = "Schijf 2";
            $scope.tax = (($scope.inkomen / 100 ) * 42);
        }
        else if($scope.inkomen >= 33364 && $scope.inkomen <= 56531){
            $scope.schijf = "Schijf 3";
            $scope.tax = (($scope.inkomen / 100 ) * 42);
        } else {
            $scope.schijf = "Schijf 4";
            $scope.tax = (($scope.inkomen / 100 ) * 52);
        }
        if ($scope.studiekosten >= 250 && $scope.studiekosten <= 15000 ){
            $scope.total += $scope.studiekosten;
        }
    }
}]);