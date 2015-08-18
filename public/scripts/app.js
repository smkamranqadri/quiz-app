(function(){	

var app = angular.module('quiz-app',['ngRoute'])

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: '/partials/main',
			controller: 'mainController'	
		})
		.when('/signin',{
			templateUrl: '/partials/signin',
			controller: 'authController'	
		})
		.when('/quiz',{
			templateUrl: '/partials/quiz',
			controller: 'quizController'	
		});
});

app.run(function($rootScope){
	$rootScope.current_user = {username: '', usertype: ''}
	$rootScope.authenticated = false;
});

})();