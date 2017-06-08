var app = angular.module('JobBoard',['ui.bootstrap','ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$httpProvider.defaults.withCredentials = true;

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('jobSeekerLogin',{
		url:"/",
		templateUrl:"page-login.html",
		controller:"LoginController",
		controllerAs:"vm"
	})

	.state('viewJobSeekerProfile',{
		url:"/viewJobSeekerProfile",
		templateUrl:"viewJobSeekerProfile.html",
		controller:"viewJobSeekerProfileController",
		controllerAs:"vm"
	})

	.state('updateJobSeeker',{
		url:"/updateJobSeeker",
		templateUrl:"updateJobSeeker.html",
		controller:"UpdateJobSeekerController",
		controllerAs:"vm"
	})

	.state('jobseekerApplications',{
		url:"/jobseekerApplications",
		templateUrl:"jobseekerApplications.html",
		controller:"jobseekerApplicationsController",
		controllerAs:"vm"
	})

	.state('jobseekerInterestedJobs',{
		url:"/jobseekerInterestedJobs",
		templateUrl:"jobseekerInterestedJobs.html",
		controller:"JobseekerInterestedJobsController",
		controllerAs:"vm"
	})

	.state('companyHome',{
		url:"/companyHome",
		templateUrl:"company-dashboard.html",
		controller:"CompanyHomeController",
		controllerAs:"vm"
	})

	.state('updateCompany',{
		url:"/updateCompany",
		templateUrl:"updateCompany.html",
		controller:"UpdateCompanyController",
		controllerAs:"vm"
	})

	.state('postJob',{
		url:"/postJob",
		templateUrl:"job-post-job.html",
		controller:"CreateJobPostController",
		controllerAs:"vm"
	})

	.state('updateJobPost',{
		url:"/updateJobPost",
		templateUrl:"updateJobPost.html",
		controller:"updateJobPostController",
		controllerAs:"vm"
	})

	.state('viewApplicants',{
		url:"/viewApplicants",
		templateUrl:"view-applicants.html",
		controller:"ViewApplicationsController",
		controllerAs:"vm",
		params: {
            reqJSON: null
        },

		
	})


	.state('jobSeekerHome',{
		url:"/jobSeekerHome",
		templateUrl:"job-search-results.html",
		controller:"JobSearchResultsController",
		controllerAs:"vm",
		params: {
            reqJSON: null
        },
	})

	.state('companyRegisterLogin',{
		url:"/companyRegisterLogin",
		templateUrl:"page-login-company.html",
		controller:"LoginControllerCompany",
		controllerAs:"vm"
		
	})
	//$location.path('/prelogin');
	//html5mode(true);
});
