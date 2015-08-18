(function(){

var app = angular.module('quiz-app');

app.controller('mainController', function($scope){

});

app.controller('authController', function($rootScope, $scope, $http, $location){
	
	$scope.user = {userName:'',passWord:''};
	
	$scope.signin = function(){
      $http.post('/signin/auth', $scope.user).success(function(data){
        if(data.state == 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user;
          $location.path('#/quiz');
          //Show Quiz Button
        }
        else{
          $scope.error_message = data.message;
        }
      });
	};
});

})();

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };