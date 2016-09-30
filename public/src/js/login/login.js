angular.module('loginApp',['ngMessages'])
		.controller('loginContrl',function($scope,$http){
			$scope.isUser = true;
			


			$scope.login = function () {

				console.log($scope.user.username +'+++++' + $scope.user.password);
				if($scope.user.username !== undefined && $scope.user.password !== undefined) {
						$http ({
							method : 'POST',
							url : '/getUser',
							data : $scope.user
						})
							.success(function(data){
								console.log(data);
								if(data.erron === 0) {
									if(data.data.status === 0) {
										$scope.isUser = false;
										/*window.location = 'https://www.julyedu.com';*/
									}else if (data.data.status === 1 ){
										$scope.isUser = true;
									}
								}
								console.log($scope.isUser);
							})
							.error(function(data){
								console.log(data);
							});
					
					} /*else {
						return false;
					}*/
			};

		});

