app.controller('TappalController', ['$scope','$http','$rootScope','Dates','Logging', function ($scope,$http,$rootScope,Dates,Logging) {
	$scope.Dates=Dates;
	$scope.userselect=3;
	$scope.remarks="";
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_tappal_users',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.userlist=result;
		console.log(result);
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.showfilefunc = function(file)
	{
		$scope.showfile = true;
		$scope.mainfile=file;
		var cdate=new Date();
		var filedate=new Date($scope.mainfile.received_on);
		var timediff=Math.abs(cdate.getTime() - filedate.getTime());
		var diffDays = Math.ceil(timediff / (1000 * 3600 * 24));
		if(diffDays>2)
		{
			$scope.reasonshow=true;
		}
		else
		{
			$scope.reasonshow=false;
			$scope.reason=" ";
		}
	}

	$scope.close_box=function(){
		$scope.showfile=false;
		$scope.mainfile={};
		$scope.userselect=3;
		$scope.reasonshow=false;
		$scope.frwd_usr="";
		$scope.remarks="";
		$scope.reason="";
		$scope.reasonshow=false;
	}
	$rootScope.showloader=true;
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_tappal_files',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.filelist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.frwd_file=function(){
		$rootScope.showloader=true;
		if(!$scope.frwd_usr)
		{
			$rootScope.showloader=false;
			alert('Please select a user to forward to');
		}
		else if($scope.reasonshow && !$scope.reason)
		{
			$rootScope.showloader=false;
			alert('Please enter reason for delay');
		}
		else
		{
			$http({
				method:'POST',
				url:$rootScope.requesturl+'/tappal_frwd_file',
				headers:{'JWT-AuthToken':localStorage.fmstoken},
				data:{tid:$scope.mainfile.id,user_id:$scope.frwd_usr,remarks:$scope.remarks,reason:$scope.reason}
			}).success(function(result){
				$rootScope.showloader=false;
				$scope.filelist=result;
				$scope.showfile=false;
				$scope.mainfile={};
				$scope.userselect=3;
				$scope.frwd_usr="";
				$scope.remarks="";
				$scope.reasonshow=false;
				$scope.reason="";
				alert('File forwared');
			}).error(function(data,status){
				$rootScope.showerror=true;
				$rootScope.showloader=false;
				Logging.validation(status);
			});
		}
	}
}]);


app.controller('TappalCreateFileController', ['$scope','$http','$rootScope','Logging', function ($scope,$http,$rootScope,Logging) {
	$('#received_on').datepicker({ dateFormat: 'dd-mm-yy' });
	$scope.file={};
	$scope.file.usertype='3';
	$rootScope.showloader=true;
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_tappal_users',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.userlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

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

	$scope.generate_frn=function(){
		$rootScope.showloader=true;
		var dates=$('#received_on').val().split('-');
		$scope.file.dept_date=dates['2']+'-'+dates[1]+'-'+dates[0];
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/generate_frn',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:$scope.file
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.file.frn=result;
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}

	$scope.frwd_file=function(){
		$scope.file={};
		$scope.file.usertype='3';
	}

}]);