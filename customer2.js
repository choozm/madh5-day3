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

var CListCtrl = function($scope, $state, CustomerSvc) {
    $scope.customers = [];
    CustomerSvc.getAll()
        .then(function(result) {
            $scope.customers = result;
        });
    $scope.show = function(custId) {
        $state.go("cdetail", {cid: custId});
    }
};
var CDetailCtrl = function($scope, $stateParams, CustomerSvc) {
    $scope.customer = {};
    CustomerSvc.getOne($stateParams.cid)
        .then(function(result) {
            $scope.customer = result;
        });

}
var CustomerConfig = function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("clist", {
        url: "/clist",
        templateUrl: "views/clist2.html",
        controller: ["$scope", "$state", "CustomerSvc", CListCtrl]
    }).state("cdetail", {
        url: "/cdetail/:cid",
        templateUrl: "views/cdetail2.html",
        controller: ["$scope", "$stateParams", "CustomerSvc", CDetailCtrl]
    })
    ;
    $urlRouterProvider.otherwise("/clist");
}
CustomerApp.config(["$stateProvider", "$urlRouterProvider"
    , CustomerConfig]);

var CustomerCtrl = function($scope) {

}
CustomerApp.controller("CustomerCtrl", ["$scope", CustomerCtrl]);













