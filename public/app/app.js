var app = angular.module('WanderApp', ['ngRoute', 'WanderCtrls', "WanderServices"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    // templateUrl: '../index.html',
    controller: 'HomeCtrl'
  })
  // .when('/recipes/new', {
  //   templateUrl: '../views/newRecipe.html',
  //   controller: 'NewCtrl'
  // })
  // .when('/recipes/:id', {
  //   templateUrl: '../views/showRecipe.html',
  //   controller: 'ShowCtrl'
  // })
  .when('/login', {
    // templateUrl: '../views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
  // templateUrl: '../views/userLogin.html',
  controller: 'SignupCtrl'
  })
  .otherwise({
    templateUrl: '../views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(["$rootScope", "Auth", function($rootScope, Auth) {
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  }
}]);