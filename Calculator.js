/**
 * Created by Rienk84 on 13-10-2014.
 */
var app = angular.module('calc', ['ngRoute']);

    app.factory('calculateFactory', ['$http', function($http){
        var urlBase = 'Calculator.php';
        var  calculateFactory = {};

        calculateFactory.calcutateTax = function(inkomsten, ziektekosten,
            giften, koopwoning, studiekosten, schijf, total){
            return $http({
                url: urlBase,
                method: "GET",
                params: {inkomsten: inkomsten,
                         ziektekosten: ziektekosten,
                         giften: giften,
                         koopwoning: koopwoning,
                         studiekosten: studiekosten,
                         schijf: schijf,
                         total: total}
            });
        }
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

    $scope.calcutateTax = function (){
        calculateFactory($scope.inkomsten, $scope.ziektekosten,
            $scope.giften, $scope.studiekosten, $scope.koopwoning, $scope.schijf)
            .succes(function(result){
                $scope.inkomsten = result.inkomsten;
                $scope.ziektekosten = result.ziektekosten;
                $scope.giften = result.giften;
                $scope.studiekosten = result.studiekosten;
                $scope.koopwoning = result.koopwoning;
                $scope.schijf = result.schijf;
                $scope.total = result.total;
                $scope.status = "";
                $scope.checked = true;
                //if ($scope.inkomen > 0 && $scope.inkomen <= 19645) {
                //    $scope.schijf = "Schijf 1";
                //    $scope.tax = (($scope.inkomen / 100 ) * 36.25);
                //}
                //else if ($scope.inkomen >= 19646 && $scope.inkomen <= 33363) {
                //    $scope.schijf = "Schijf 2";
                //    $scope.tax = (($scope.inkomen / 100 ) * 42);
                //}
                //else if ($scope.inkomen >= 33364 && $scope.inkomen <= 56531) {
                //    $scope.schijf = "Schijf 3";
                //    $scope.tax = (($scope.inkomen / 100 ) * 42);
                //} else {
                //    $scope.schijf = "Schijf 4";
                //    $scope.tax = (($scope.inkomen / 100 ) * 52);
                //}
                //if ($scope.studiekosten >= 250 && $scope.studiekosten <= 15000) {
                //    $scope.total += $scope.studiekosten;
                //}

            })
            .error(function (error){
                $scope.status = error;
                $scope.checked = false;
            })
    }
}]);