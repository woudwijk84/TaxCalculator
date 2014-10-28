/**
 * Created by Rienk84 on 13-10-2014.
 */
var app = angular.module('calc', ['ngRoute']);

app.factory('dataFactory', ['$http', function ($http) {
    var urlBase = 'Calculator.php';
    var dataFactory = {};

    dataFactory.getMachine = function () {
        return $http.get(urlBase);
    }

    dataFactory.calculateTax = function (inkomen, ziektekosten,
                                         giften, koopwoning, studiekosten, schijf, total) {
        return $http({
            url: urlBase,
            method: "GET",
            params: {
                inkomen: inkomen,
                ziektekosten: ziektekosten,
                giften: giften,
                koopwoning: koopwoning,
                studiekosten: studiekosten,
                schijf: schijf,
                total: total
            }
        });
    };
    return dataFactory;
}])
    .controller('MainCtrl', ['$scope', 'dataFactory', '$log', function ($scope, dataFactory, $log) {
        $scope.totalTax;
        $scope.inkomen;
        $scope.studiekosten;
        $scope.koopwoning;
        $scope.ziektekosten;
        $scope.giften;
        $scope.schijf;
        $scope.tax;
        $scope.status;
        //$scope.$log = $log;

        $scope.checked = false;
        getMachine();
        $scope.calculateTax = function () {
            dataFactory.calculateTax($scope.inkomen, $scope.ziektekosten,
                $scope.giften, $scope.studiekosten, $scope.koopwoning, $scope.schijf)
                .success(function (result) {
                    //$scope.inkomen = result.inkomen;
                    //$scope.ziektekosten = result.ziektekosten;
                    //$scope.studiekosten = result.studiekosten;
                    //$scope.koopwoning = result.koopwoning;
                    //$scope.giften = result.giften;
                    $scope.schijf = result.schijf;
                    $scope.totalTax = result.total;
                    $scope.status = "";
                    $scope.checked = true;
                })
                .error(function (error) {
                    $scope.status = error;
                    $scope.checked = false;
                });
        };

        function getMachine(){
            dataFactory.getMachine();
        }
    }]);