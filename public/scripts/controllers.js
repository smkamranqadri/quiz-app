(function(){

var app = angular.module('quiz-app');

app.controller('mainController', function($scope){

});

app.controller('authController', function($rootScope, $scope, $http, $location){
	
	$scope.user = {userName:'',passWord:''};
	
	$scope.signin = function(){
      $http.post('/auth/signin', $scope.user).success(function(data){
        if(data.state == 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user;
          $location.path('#quiz');
          //Show Quiz Button
        }
        else{
          $scope.error_message = data.message;
        }
      });
	};
});

})();