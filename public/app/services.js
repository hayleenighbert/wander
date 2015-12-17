// var TOKEN_STORAGE = "balhhhadjasodjasoi"

angular.module('WanderServices', ['ngResource'])
.factory('Story', ['$resource', 'Auth', function($resource, Auth) {
  return $resource('/api/storys/:id');
}])
//newfactory
.factory("Auth", ["$window", function($window) {
	return {
		saveToken: function(token) {
			//with localStorage you can take it as a hash map
			//saves arbitrary things on the user's computer
			$window.localStorage["secretstory-token"] = token;
		},
		getToken: function() {
			return $window.localStorage["secretstory-token"];
		},
		removeToken: function() {
			$window.localStorage.removeItem("secretstory-token");
		},
		isLoggedIn: function() {
			var token = this.getToken();
			return token ? true : false;
		}
	};
}])
//An interceptor is simply a factory() service that returns an object with 4 properties that map to functions:
.factory("AuthInterceptor", ["Auth", function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = "Bearer "+token;
			}
			return config;
		}
	}
}]);