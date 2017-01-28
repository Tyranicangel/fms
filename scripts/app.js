var app=angular.module("FMSApp",["ui.router"]);

app.controller('MainController', ['$scope','$rootScope', function ($scope,$rootScope) {
	$rootScope.requesturl='http://localhost/fms/api/public';
	$rootScope.showloader=false;
	$rootScope.str_pad=function(a){
		var b=a+'';
		while (b.length<7){
			b='0'+b;
		}
		return b;
	}
}]);

app.directive('fileChange', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('change', function() {
				scope.$apply(function() {
				scope[attrs['fileChange']](element[0].files);
				});
			});
		},
	}
});

app.factory('Dates',function(){
	return{
		getDate:function(str1)
		{
			if(!str1)
			{
				return "";
			}
			else
			{
				var dt1=str1.substring(8,10);
				var mon1=str1.substring(5,7);
				var yr1=str1.substring(0,4);
				return dt1+'/'+mon1+'/'+yr1;
			}
		}
	}
});

app.controller('UserController', ['$scope','Logging','$http','$rootScope', function ($scope,Logging,$http,$rootScope) {
	$rootScope.showloader=true;
	$scope.mainuser={};
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/user_data',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.mainuser=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});
	$scope.logout = function()
	{
		$scope.mainuser={};
		Logging.logout();
	}
}]);

app.service('Logging', ['$state','$rootScope','$http',function ($state,$rootScope,$http) {
	this.validation=function(status){
		if(status=='401')
		{
			$rootScope.loginerrormsg='Unauthorized Access.';
		}
		else if(status=='402')
		{
			$rootScope.loginerrormsg='Session Timed Out.';
		}
		else
		{
			$rootScope.loginerrormsg='Error Connecting.';
		}
		localStorage.removeItem('pmstoken');
		$state.go('login');
	}

	this.logout=function(){
		$rootScope.showloader=true;
		$http({
			method:'GET',
			url:$rootScope.requesturl+'/logout',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
		}).success(function(result){
			$rootScope.showloader=false;
			localStorage.removeItem('pmstoken');
			$state.go('login');
		}).error(function(data,status){
			$rootScope.showloader=false;
			if(status=='401')
			{
				$rootScope.loginerrormsg='Unauthorized Access.';
			}
			else if(status=='402')
			{
				$rootScope.loginerrormsg='Session Timed Out.';
			}
			else
			{
				$rootScope.loginerrormsg='Error Connecting.';
			}
			localStorage.removeItem('pmstoken');
			$state.go('login');
		});
	}
}]);