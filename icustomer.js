var CustomerApp = angular.module("CustomerApp", ["ionic"]);

//Customer Service
var CustomerSvc = function($http, $q) {
    this.getAll = function() {
        var defer = $q.defer();
        $http.get("http://localhost:10633/customer/api/customer")
            .then(function(result) {
                defer.resolve(result.data);
            });
        //return (defer);
        return (defer.promise);
    };
    this.getOne = function(cid) {
        var defer = $q.defer();
        $http.get("http://localhost:10633/customer/api/customer/" + cid)
            .then(function(result) {
                defer.resolve(result.data);
            });
        //return (defer);
        return (defer.promise);
    }
}
CustomerApp.service("CustomerSvc", ["$http", "$q", CustomerSvc]);

var CustomerCtrl = function($scope, $ionicListDelegate, CustomerSvc) {
    $scope.customers = [];
    $scope.showDelete = false;
    $scope.toggleDelete = function() {
        $scope.showDelete = !$scope.showDelete;
    }
    $scope.deleteCustomer = function($index) {
        $scope.customers.splice($index, 1);
        $scope.showDelete = false;
    }
    $scope.sendEmail = function(email) {
        $ionicListDelegate.closeOptionButtons();
    }
    CustomerSvc.getAll()
        .then(function(result) {
            $scope.customers = result;
        });
};
CustomerApp.controller("CustomerCtrl", 
    ["$scope", "$ionicListDelegate", "CustomerSvc", CustomerCtrl]);













