app.controller('AsoController', ['$scope','$http','$rootScope','Dates','Logging', function ($scope,$http,$rootScope,Dates,Logging) {
	$rootScope.showloader=true;
	$scope.Dates=Dates;
	$scope.userselect=4;
	$scope.remarks="";
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_aso_users',
		headers:{'JWT-AuthToken':localStorage.fmstoken}
	}).success(function(result){
		$rootScope.showloader=false;
		$scope.userlist=result;
	}).error(function(data,status){
		$rootScope.showerror=true;
		$rootScope.showloader=false;
		Logging.validation(status);
	});

	$scope.showfilefunc = function(file)
	{
		$scope.showfile = true;
		$scope.mainfile=file;
		if($scope.mainfile.filedata.sectiondata.length>0)
		{
			$scope.section_no=angular.copy($scope.mainfile.filedata.sectiondata[0].section_no);
		}
		$scope.subject=angular.copy($scope.mainfile.filedata.subject)
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
		$scope.userselect=4;
		$scope.frwd_usr="";
		$scope.section_no="";
		$scope.remarks="";
		$scope.reasonshow=false;
		$scope.reason="";
	}
	
	$http({
		method:'GET',
		url:$rootScope.requesturl+'/get_aso_files',
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
		else if(!$scope.section_no)
		{
			$rootScope.showloader=false;
			alert('Please enter section no');
		}
		else
		{
			$http({
				method:'POST',
				url:$rootScope.requesturl+'/aso_frwd_file',
				headers:{'JWT-AuthToken':localStorage.fmstoken},
				data:{tid:$scope.mainfile.id,user_id:$scope.frwd_usr,section_no:$scope.section_no,remarks:$scope.remarks,subject:$scope.subject}
			}).success(function(result){
				$rootScope.showloader=false;
				$scope.filelist=result;
				$scope.showfile=false;
				$scope.mainfile={};
				$scope.userselect=4;
				$scope.frwd_usr="";
				$scope.section_no="";
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

	$scope.close_file=function(){
		$rootScope.showloader=true;
		$http({
			method:'POST',
			url:$rootScope.requesturl+'/aso_close_file',
			headers:{'JWT-AuthToken':localStorage.fmstoken},
			data:{tid:$scope.mainfile.id,remarks:$scope.remarks,subject:$scope.subject}
		}).success(function(result){
			$rootScope.showloader=false;
			$scope.filelist=result;
			$scope.showfile=false;
			$scope.mainfile={};
			$scope.userselect=4;
			$scope.frwd_usr="";
			$scope.remarks="";
			$scope.section_no="";
			alert('File closed');
		}).error(function(data,status){
			$rootScope.showerror=true;
			$rootScope.showloader=false;
			Logging.validation(status);
		});
	}
}]);
