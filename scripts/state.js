app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/login");

	$stateProvider.
		state('login',{
			url: '/login',
			views:{
				"main":{
					templateUrl:"partials/login.html",
					data:{title:'Login'},
					controller:'LoginController'
				}
			}
		}).
		state('admin',{
			views:{
				"main":{
					templateUrl:"partials/user.html",
					controller:'UserController'
				}
			}
		}).
		state('tappal',{
			views:{
				"main":{
					templateUrl:"partials/tappal.html",
					controller:'UserController'
				}
			}
		}).
		state('aso',{
			views:{
				"main":{
					templateUrl:"partials/aso.html",
					controller:'UserController'
				}
			}
		}).
		state('sec',{
			views:{
				"main":{
					templateUrl:"partials/sec.html",
					controller:'UserController'
				}
			}
		}).
		state('specialsec',{
			views:{
				"main":{
					templateUrl:"partials/specialsec.html",
					controller:'UserController'
				}
			}
		}).
		state('so',{
			views:{
				"main":{
					templateUrl:"partials/so.html",
					controller:'UserController'
				}
			}
		}).
		state('officer',{
			views:{
				"main":{
					templateUrl:"partials/officer.html",
					controller:'UserController'
				}
			}
		}).
		state('peshi',{
			views:{
				"main":{
					templateUrl:"partials/peshi.html",
					controller:'UserController'
				}
			}
		}).
		state('speshi',{
			views:{
				"main":{
					templateUrl:"partials/speshi.html",
					controller:'UserController'
				}
			}
		}).
		state('admin.main',{
			url: '/admin/main',
			views:{
				"content":{
					templateUrl:"partials/admin/main.html",
					data:{title:'Admin'},
					controller:'AdminController'
				}
			}
		}).
		state('admin.password',{
			url: '/admin/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Admin'},
					controller:'PasswordController'
				}
			}
		}).
		state('peshi.main',{
			url: '/peshi/main',
			views:{
				"content":{
					templateUrl:"partials/peshi/main.html",
					data:{title:'Peshi'},
					controller:'PeshiController'
				}
			}
		}).
		state('speshi.main',{
			url: '/speshi/main',
			views:{
				"content":{
					templateUrl:"partials/speshi/main.html",
					data:{title:'Special Sec Peshi'},
					controller:'SpeshiController'
				}
			}
		}).
		state('sec.main',{
			url: '/sec/main',
			views:{
				"content":{
					templateUrl:"partials/sec/main.html",
					data:{title:'Secretary'},
					controller:'SecController'
				}
			}
		}).
		state('specialsec.main',{
			url: '/specialsec/main',
			views:{
				"content":{
					templateUrl:"partials/specialsec/main.html",
					data:{title:'Special Secretary'},
					controller:'SpecialSecController'
				}
			}
		}).
		state('admin.createuser',{
			url: '/admin/createuser',
			views:{
				"content":{
					templateUrl:"partials/admin/createuser.html",
					data:{title:'Admin'},
					controller:'AdminUserController'
				}
			}
		}).
		state('admin.edituser',{
			url: '/admin/edituser',
			views:{
				"content":{
					templateUrl:"partials/admin/edituser.html",
					data:{title:'Admin'},
					controller:'AdminEditUserController'
				}
			}
		}).
		state('admin.resetpass',{
			url: '/admin/resetpass',
			views:{
				"content":{
					templateUrl:"partials/admin/resetpass.html",
					data:{title:'Admin'},
					controller:'AdminPasswordController'
				}
			}
		}).
		state('admin.createsec',{
			url: '/admin/createsection',
			views:{
				"content":{
					templateUrl:"partials/admin/createsection.html",
					data:{title:'Admin'},
					controller:'AdminSectionController'
				}
			}
		}).
		state('admin.createdept',{
			url: '/admin/createdept',
			views:{
				"content":{
					templateUrl:"partials/admin/createdept.html",
					data:{title:'Admin'},
					controller:'AdminDeptController'
				}
			}
		}).
		state('admin.changefile',{
			url: '/admin/changefile',
			views:{
				"content":{
					templateUrl:"partials/admin/changefile.html",
					data:{title:'Admin'},
					controller:'AdminChangeFileController'
				}
			}
		}).
		state('tappal.main',{
			url: '/tappal/main',
			views:{
				"content":{
					templateUrl:"partials/tappal/main.html",
					data:{title:'Tappal'},
					controller:'TappalController'
				}
			}
		}).
		state('aso.main',{
			url: '/aso/main',
			views:{
				"content":{
					templateUrl:"partials/aso/main.html",
					data:{title:'ASO'},
					controller:'AsoController'
				}
			}
		}).
		state('so.main',{
			url: '/so/main',
			views:{
				"content":{
					templateUrl:"partials/so/main.html",
					data:{title:'SO'},
					controller:'SoController'
				}
			}
		}).
		state('officer.main',{
			url: '/officer/main',
			views:{
				"content":{
					templateUrl:"partials/officer/main.html",
					data:{title:'Officer'},
					controller:'OfficerController'
				}
			}
		}).
		state('tappal.createfile',{
			url: '/tappal/createfile',
			views:{
				"content":{
					templateUrl:"partials/tappal/createfile.html",
					data:{title:'Tappal'},
					controller:'TappalCreateFileController'
				}
			}
		}).
		state('peshi.createfile',{
			url: '/peshi/createfile',
			views:{
				"content":{
					templateUrl:"partials/peshi/createfile.html",
					data:{title:'Peshi'},
					controller:'PeshiCreateFileController'
				}
			}
		}).
		state('speshi.createfile',{
			url: '/speshi/createfile',
			views:{
				"content":{
					templateUrl:"partials/speshi/createfile.html",
					data:{title:'Special Sec Peshi'},
					controller:'SpeshiCreateFileController'
				}
			}
		}).
		state('tappal.checkstatus',{
			url: '/tappal/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Tappal'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('sec.checkstatus',{
			url: '/sec/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Secretary'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('specialsec.checkstatus',{
			url: '/specialsec/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Special Secretary'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('peshi.checkstatus',{
			url: '/peshi/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Peshi'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('speshi.checkstatus',{
			url: '/speshi/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Special Sec Peshi'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('officer.checkstatus',{
			url: '/officer/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'Officer'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('aso.checkstatus',{
			url: '/aso/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'ASO'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('so.checkstatus',{
			url: '/so/checkstatus',
			views:{
				"content":{
					templateUrl:"partials/reports/checkstatus.html",
					data:{title:'SO'},
					controller:'CheckStatusController'
				}
			}
		}).
		state('so.reports',{
			url: '/so/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'SO'},
					controller:'ReportController'
				}
			}
		}).
		state('so.password',{
			url: '/so/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'SO'},
					controller:'PasswordController'
				}
			}
		}).
		state('sec.reports',{
			url: '/sec/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Secretary'},
					controller:'ReportController'
				}
			}
		}).
		state('sec.password',{
			url: '/sec/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Secretary'},
					controller:'PasswordController'
				}
			}
		}).
		state('sec.userrpt',{
			url: '/sec/userrpt',
			views:{
				"content":{
					templateUrl:"partials/reports/userrpt.html",
					data:{title:'Secretary'},
					controller:'UserReportController'
				}
			}
		}).
		state('sec.filerpt',{
			url: '/sec/filerpt',
			views:{
				"content":{
					templateUrl:"partials/reports/filerpt.html",
					data:{title:'Secretary'},
					controller:'FileReportController'
				}
			}
		}).
		state('sec.file',{
			url: '/sec/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('tappal.file',{
			url: '/tappal/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('so.file',{
			url: '/so/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('aso.file',{
			url: '/aso/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('officer.file',{
			url: '/officer/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('peshi.file',{
			url: '/peshi/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('speshi.file',{
			url: '/speshi/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('specialsec.file',{
			url: '/specialsec/file',
			views:{
				"content":{
					templateUrl:"partials/reports/file.html",
					data:{title:'Secretary'},
					controller:'FileController'
				}
			}
		}).
		state('sec.effrpt',{
			url: '/sec/effrpt',
			views:{
				"content":{
					templateUrl:"partials/reports/effrpt.html",
					data:{title:'Secretary'},
					controller:'EfficiencyReportController'
				}
			}
		}).
		state('specialsec.reports',{
			url: '/specialsec/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Special Secretary'},
					controller:'ReportController'
				}
			}
		}).
		state('specialsec.password',{
			url: '/specialsec/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Special Secretary'},
					controller:'PasswordController'
				}
			}
		}).
		state('specialsec.userrpt',{
			url: '/specialsec/userrpt',
			views:{
				"content":{
					templateUrl:"partials/reports/userrpt.html",
					data:{title:'Special Secretary'},
					controller:'UserReportController'
				}
			}
		}).
		state('specialsec.filerpt',{
			url: '/specialsec/filerpt',
			views:{
				"content":{
					templateUrl:"partials/reports/filerpt.html",
					data:{title:'Special Secretary'},
					controller:'FileReportController'
				}
			}
		}).
		state('specialsec.effrpt',{
			url: '/specialsec/effrpt',
			views:{
				"content":{
					templateUrl:"partials/reports/effrpt.html",
					data:{title:'Special Secretary'},
					controller:'EfficiencyReportController'
				}
			}
		}).
		state('peshi.reports',{
			url: '/peshi/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Peshi'},
					controller:'ReportController'
				}
			}
		}).
		state('speshi.reports',{
			url: '/speshi/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Special Sec Peshi'},
					controller:'ReportController'
				}
			}
		}).
		state('officer.reports',{
			url: '/officer/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Officer'},
					controller:'ReportController'
				}
			}
		}).
		state('aso.reports',{
			url: '/aso/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'ASO'},
					controller:'ReportController'
				}
			}
		}).
		state('peshi.password',{
			url: '/peshi/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Peshi'},
					controller:'PasswordController'
				}
			}
		}).
		state('speshi.password',{
			url: '/speshi/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Special Sec Peshi'},
					controller:'PasswordController'
				}
			}
		}).
		state('officer.password',{
			url: '/officer/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Officer'},
					controller:'PasswordController'
				}
			}
		}).
		state('aso.password',{
			url: '/aso/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'ASO'},
					controller:'PasswordController'
				}
			}
		}).
		state('tappal.reports',{
			url: '/tappal/reports',
			views:{
				"content":{
					templateUrl:"partials/reports/reports.html",
					data:{title:'Tappal'},
					controller:'ReportController'
				}
			}
		}).
		state('tappal.password',{
			url: '/tappal/password',
			views:{
				"content":{
					templateUrl:"partials/password.html",
					data:{title:'Tappal'},
					controller:'PasswordController'
				}
			}
		});
});



