app.controller('FileController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$rootScope.showloader=true;
	$scope.Dates=Dates;
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

	$scope.get_file_rpt=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/get_file_data',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{subject:$scope.subject}
		})
		.success(function(result){
			$rootScope.showloader=false;
			$scope.translist=result;
			if($scope.translist.length==0)
			{
				alert('There are no files with this subject');
			}
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);

app.controller('UserReportController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$rootScope.showloader=true;
	$scope.Dates=Dates;
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
		url:$rootScope.requesturl+'/get_user_rpt',
		headers:{'JWT-AuthToken':localStorage.fmstoken},
	})
	.success(function(result){
		$scope.userlist=result;
		$rootScope.showloader=false;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.view_trans=function(u){
		$scope.showloader=true;
		$scope.mainuser=angular.copy(u);
		$http({
			method:'GET',
			url:$rootScope.requesturl+'/get_user_files',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			params:{userid:$scope.mainuser.id}
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.filelist=result;
			$scope.showfile=true;
			if($scope.filelist.length==0)
			{
				alert('No activity during this period');
			}
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}

	$scope.close_box=function(){
		$scope.mainuser={};
		$scope.showfile=false;
	}
}]);

app.controller('FileReportController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$rootScope.showloader=true;
	$scope.Dates=Dates;
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

	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_file_rpt',
		headers:{'JWT-AuthToken':localStorage.fmstoken},
	})
	.success(function(result){
		$scope.translist=result;
		$rootScope.showloader=false;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.deptfilter=function(a){
		if(!$scope.maindept)
		{
			return true
		}
		else if(a.filedata.dept_id==$scope.maindept)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	$scope.searchtype=0;
	$scope.filefilter=function(a){
		if($scope.searchtype=='0')
		{
			return true
		}
		else if(a.filedata.file_type==$scope.searchtype)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

}]);

app.controller('EfficiencyReportController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$rootScope.showloader=true;
	$scope.Dates=Dates;
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
		url:'eff_rpt.php',
		headers:{'JWT-AuthToken':localStorage.fmstoken},
	})
	.success(function(result){
		$scope.userlist=result;
		$rootScope.showloader=false;
		console.log(result);
	});

	$scope.getTime=function(arr)
	{
		if(arr==0)
		{
			return 0;
		}
		var out=""
		if(arr[0]!='0')
		{
			out=out+' '+arr[0]+'d';
		}
		if(arr[1]!='0')
		{
			out=out+' '+arr[1]+'h';
		}
		if(arr[2]!='0')
		{
			out=out+' '+arr[2]+'m';
		}
		if(arr[3]!='0')
		{
			out=out+' '+arr[3]+'s';
		}
		return out;
	}
}]);

app.controller('CheckStatusController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$scope.Dates=Dates;

	$scope.get_frn_rpt=function(){
		$rootScope.showloader=true;
		$http({
			method:'GET',
			url:$rootScope.requesturl+'/get_frn_rpt',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			params:{frn:$scope.frn}
		})
		.success(function(result){
			$rootScope.showloader=false;
			if(result)
			{
				$scope.file=result;
			}
			else
			{
				$scope.file={};
				alert('No such FRN found');
			}
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}

	$scope.get_section_rpt=function(){
		$rootScope.showloader=true;
		$http({
			method:'GET',
			url:$rootScope.requesturl+'/get_secno_rpt',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			params:{frn:$scope.secno}
		})
		.success(function(result){
			$rootScope.showloader=false;
			if(result)
			{
				$scope.file=result;
			}
			else
			{
				$scope.file={};
				alert('No such Section No found');
			}
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}


}]);

app.controller('ReportController', ['$scope','$rootScope','$http','Dates','Logging', function ($scope,$rootScope,$http,Dates,Logging) {
	$scope.Dates=Dates;
	$('#from_date').datepicker({ dateFormat: 'dd-mm-yy' });
	$('#to_date').datepicker({ dateFormat: 'dd-mm-yy' });

	$scope.generate_report=function(){
		$rootScope.showloader=true;
		var fromdates=$('#from_date').val().split('-');
		var todates=$('#to_date').val().split('-');
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/get_rpt',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{fromdate:fromdates['2']+'-'+fromdates[1]+'-'+fromdates[0],todate:todates['2']+'-'+todates[1]+'-'+todates[0]}
		})
		.success(function(result){
			$rootScope.showloader=false;
			$scope.translist=result;
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);