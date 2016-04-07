var MyApp = angular.module("MyApp", ["ui.router"]);

var SessionSvc = function() {
    var data = [];
    this.load = function() {
        return (data);
    }
    this.save = function(person) {
        data.push(person);
    }
};
MyApp.service("SessionSvc", [SessionSvc]);

var PreorderCtrl = function($scope, $state, SessionSvc) {
    $scope.name = "";
    $scope.phone = "";
    $scope.email = "";
    $scope.registerMe = function() {
        console.info(">> name = " + $scope.name)
        console.info(">> phone = " + $scope.phone)
        console.info(">> email = " + $scope.email)
        //Save to database
        SessionSvc.save({
            name: $scope.name,
            phone: $scope.phone,
            email: $scope.email
        });
        
        $state.go("home")
    }
}

var AppConfig = function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "views/home.html"
        
    }).state("preorder", {
        url: "/preorder",
        templateUrl: "views/preorder.html",
        controller: ["$scope", "$state", "SessionSvc", PreorderCtrl]
    })
    
    $urlRouterProvider.otherwise("/home");
}

var MyCtrl = function($scope, SessionSvc) {
    $scope.interestedParties = SessionSvc.load();
    
}
MyApp.config(["$stateProvider", "$urlRouterProvider", AppConfig]);
MyApp.controller("MyCtrl", ["$scope", "SessionSvc", MyCtrl]);