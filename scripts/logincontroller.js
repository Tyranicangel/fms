app.controller('LoginController', ['$scope','$http','$rootScope','$state','Logging', function ($scope,$http,$rootScope,$state,Logging) {
	$scope.$emit("changeTitle",$state.current.views.main.data.title);
	$scope.user={};
	$scope.login=function(){
		$rootScope.showloader=true;
		$rootScope.showerror=false;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/login',
			data:$scope.user
		}).
		success(function(result){
			$rootScope.showloader=false;
			if(result['statusCode'] == "202") {
				localStorage.fmstoken = result['message'];
				if(result['user_role']=='1'){
					$state.go('admin.main');
				}
				else if(result['user_role']=='2'){
					$state.go('tappal.main');
				}
				else if(result['user_role']=='3'){
					$state.go('aso.main');
				}
				else if(result['user_role']=='4'){
					$state.go('so.main');
				}
				else if(result['user_role']=='5'){
					$state.go('officer.main');
				}
				else if(result['user_role']=='6'){
					$state.go('peshi.main');
				}
				else if(result['user_role']=='7'){
					$state.go('sec.main');
				}
				else if(result['user_role']=='8'){
					$state.go('speshi.main');
				}
				else if(result['user_role']=='9'){
					$state.go('specialsec.main');
				}
			} else {
				$rootScope.showerror=true;
				$rootScope.loginerrormsg = result['message'];
			}
		});
	}
}]);

app.controller('PasswordController', ['$scope','$http','$rootScope','Dates','Logging', function ($scope,$http,$rootScope,Dates,Logging) {
	$scope.pass={};
	$scope.change_pass=function(){
		if($scope.pass.new!=$scope.pass.confirm)
		{
			alert('New password and Confirm password are not same');
		}
		else if($scope.pass.new==$scope.pass.old)
		{
			alert('Old and New passwords are the same');
		}
		else
		{
			$rootScope.showloader=true;
			$http({
				method:'POST',
				url:$rootScope.requesturl+'/change_pass',
				headers:{'JWT-AuthToken':localStorage.fmstoken},
				data:$scope.pass
			}).success(function(result){
				$rootScope.showloader=false;
				if(result=='Success')
				{
					$scope.pass={};
					alert('Password Changed');
				}
				else
				{
					alert(result);
				}
			}).error(function(data,status){
				$rootScope.showerror=true;
				$rootScope.showloader=false;
				Logging.validation(status);
			});
		}
	}
}]);