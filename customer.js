var CustomerApp = angular.module("CustomerApp", ["ui.router", "ngAnimate"]);

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

var CListCtrl = function($scope, CustomerSvc) {
    $scope.customers = [];
    CustomerSvc.getAll()
        .then(function(result) {
            $scope.customers = result;
        });
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
        templateUrl: "views/clist.html",
        controller: ["$scope", "CustomerSvc", CListCtrl]
    }).state("cdetail", {
        url: "/cdetail/:cid",
        templateUrl: "views/cdetail.html",
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














