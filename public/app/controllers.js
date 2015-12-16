angular.module('WanderCtrls', ['WanderServices'])
.controller('HomeCtrl', ['$scope', 'Story', function($scope, Story) {
  $scope.storys = [];
  $scope.search = '';

  Story.query(function success(data) {
    $scope.storys = data;
  }, function error(data) {
    console.log(data)
  });



  $scope.deleteStory = function(id, storysIdx) {
    Story.delete({id: id}, function success(data) {
      $scope.storys.splice(storysIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$routeParams', 'Story', function($scope, $routeParams, Story) {
  $scope.story = {};

  Story.get({id: $routeParams.id}, function success(data) {
    $scope.story = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Story', function($scope, $location, Story) {
  $scope.story = {
    title: '',
    description: '',
    image: ''
  };
  $scope.uploadPhoto = function(){
    cloudinary.openUploadWidget({ cloud_name: 'dkvjhgv6a', upload_preset: 'jwkvojrr'},
    function(error, result) {
      $scope.$apply(function(){
      $scope.imageUploadUrl = result[0].secure_url;
      });
    })
  };

  $scope.createStory = function() {
    Story.save($scope.story, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
      
  }
}])



//inject scope and auth
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
  };
}])
  .controller("LoginCtrl", [
    "$scope",
    "$http",
    "$location",
    "Auth",
    function($scope, $http, $location, Auth) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.actionName = "Login";
      $scope.userAction = function() {
        $http.post("/api/auth", $scope.user).then(function(res) {
          Auth.saveToken(res.data.token);
          $location.path("/");
        }, function(res) {
          console.log(res.data);
        });
      };
    }])
  .controller("SignupCtrl", [
    "$scope",
    "$http",
    "$location",
    "Auth",
    function($scope, $http, $location, Auth) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.actionName = "Sign Up";
      $scope.userAction = function() {
        $http.post("/api/users", $scope.user).then(function(res) {
          $http.post("/api/auth", $scope.user).then(function(res) {
            Auth.saveToken(res.data.token);
            $location.path("/");
          }, function(res) {
            console.log(res.data);
          });
        }, function (res) {
          console.log(res.data);
        });
      }
    }
  ]);