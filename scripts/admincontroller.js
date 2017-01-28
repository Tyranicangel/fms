app.controller('AdminController', ['$scope', function ($scope) {

}]);

app.controller('AdminPasswordController', ['$scope','$http','$rootScope','Dates','Logging', function ($scope,$http,$rootScope,Dates,Logging) {
	$scope.cpname="";

	$scope.reset_pass=function(){
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/reset_pass',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{user:$scope.cpname}
		}).success(function(result){
			$rootScope.showloader=false;
			if(result=='Success')
			{
				$scope.cpname="";
				alert('Password reset');
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
}]);

app.controller('AdminChangeFileController', ['$scope','$http','$rootScope','Dates','Logging', function ($scope,$http,$rootScope,Dates,Logging) {
	$scope.Dates=Dates;
	$scope.userselect=4;
	$rootScope.showloader=true;
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_admin_users',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.userlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.get_frn_details=function(){
		$rootScope.showloader=true;
		$http({
			method:'GET',
			url:$rootScope.requesturl+'/get_frn_details',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			params:{frn:$scope.frn}
		})
		.success(function(result){
			$rootScope.showloader=false;
			$scope.file=result[0];
			$scope.trans=result[1];
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}

	$scope.change_file=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/change_file',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			params:{fileid:$scope.file.id,userid:$scope.frwd_usr,remarks:$scope.remarks}
		})
		.success(function(result){
			$rootScope.showloader=false;
			delete $scope.file;
			delete $scope.trans;
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);

app.controller('AdminSectionController', ['$scope','$http','$rootScope','Logging', function ($scope,$http,$rootScope,Logging) {
	$rootScope.showloader=true;
	$scope.sectionlist=[];
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_sections',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.sectionlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.create_section=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/create_section',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{section:$scope.sectionname}
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.sectionlist=result;
			$scope.sectionname="";
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);

app.controller('AdminDeptController', ['$scope','$http','$rootScope','Logging', function ($scope,$http,$rootScope,Logging) {
	$rootScope.showloader=true;
	$scope.sectionlist=[];
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_deptlist',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.deptlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.create_dept=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/create_dept',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{dept:$scope.deptname}
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.deptlist=result;
			$scope.deptname="";
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);


app.controller('AdminUserController', ['$scope','$http','$rootScope','Logging', function ($scope,$http,$rootScope,Logging) {
	$rootScope.showloader=true;
	$scope.sectionlist=[];
	$scope.rolelist=[];
	$scope.user={};

	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_sections',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.sectionlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_roles',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.rolelist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.create_user=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/create_user',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:$scope.user
		}).success(function(result){
			$rootScope.showloader=false;
			alert(result[1]);
			if(result[0]=='Success')
			{
				$scope.user={};
			}
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);

app.controller('AdminEditUserController', ['$scope','$http','$rootScope','Logging', function ($scope,$http,$rootScope,Logging) {
	$rootScope.showloader=true;
	$scope.sectionlist=[];

	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_all_users',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$scope.userlist=result;
	});

	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_sections',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.sectionlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.show_edit=function(x){
		$scope.mainuser=angular.copy(x);
		$scope.showfile=true;
	}

	$scope.close_box=function(){
		$scope.showfile=false;
		$scope.mainuser={};
	}

	$scope.save_user=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/edit_user',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:$scope.mainuser
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.userlist=result;
			$scope.mainuser={};
			$scope.showfile=false;
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);