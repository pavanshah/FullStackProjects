var app = angular.module("Airbnb");

function signupModalControllerFn($uibModalInstance,loginService) {
	var vm = this;
	vm.user = {};
	vm.user.UserType = "User"
	vm.signupView = "signupMethod";
	vm.birthdayflag = false;
	vm.firstnameflag = false;
	vm.lastnameflag = false;
	vm.emailflag = false;
	vm.passwordflag = false;
	vm.birthdayrequiredflag = false;
	
	vm.birthDatePopUp = {
    	opened: false
  	};

  	vm.openBirthDatePopUp = function() {
	    vm.birthDatePopUp.opened = true;
	};
  		//date formats
  	vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  	//default format
	vm.format = vm.formats[1];

	vm.changeSignupView = function (currentView) {
		vm.signupView = currentView;
	}

	vm.ok = function () {

					//birthdate validation
					var date = new Date();
					var bd = new Date(vm.user.birthdate);

					if(bd>date || vm.user.firstname == null || vm.user.lastname == null || vm.user.email == null || vm.user.password == null || vm.user.birthdate == null)
					{
						if(bd>date)
						{
							vm.birthdayflag = true;
						}

						if(vm.user.firstname == null)
						{
							vm.firstnameflag = true;
						}

						if(vm.user.lastname == null)
						{
							vm.lastnameflag = true;
						}

						if(vm.user.email == null)
						{
							vm.emailflag = true;
						}

						if(vm.user.password == null)
						{
							vm.passwordflag = true;
						}

						if(vm.user.birthdate == null)
						{
							vm.birthdayrequiredflag = true;
						}
					}
					else
					{
						loginService.signup(vm.user).
						then(function(response) {
						if(response.status==200){
						$uibModalInstance.close(vm.user);	
						vm.serverError = "";	
						}
					
						},function(err) {
						if(err.status==400){
						vm.serverError = err.data.result;
						}
						})
					}
					
  	};

  	vm.initflag = function()
  	{
  				vm.firstnameflag = false;
				vm.lastnameflag = false;
				vm.emailflag = false;
				vm.passwordflag = false;
				vm.birthdayrequiredflag = false;
  	}


  	vm.login = function() {
  		$uibModalInstance.dismiss("login");
  	}

}

app.controller('SignupModalController',signupModalControllerFn)