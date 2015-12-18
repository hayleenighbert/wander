var app = angular.module('WanderApp', ['ngRoute', 'WanderCtrls', 'WanderServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/wander.html',
    controller: 'HomeCtrl'
  })
  .when('/storys/new', {
    templateUrl: 'app/views/newStory.html',
    controller: 'NewCtrl'
  })
  .when('/about', {
    templateUrl: 'app/views/about.html'
  })
  .when('/storys/:id', {
    templateUrl: 'app/views/showStory.html',
    controller: 'ShowCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
  templateUrl: 'app/views/userLogin.html',
  controller: 'SignupCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
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
