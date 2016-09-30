angular.module('reqisterApp',['ngMessages'])
		.controller('reqisterCtrol',function($scope,$http){
			$scope.ishaveUser = function(){
				$http({
					method : 'GET',
					url : '/isHaveUser',
					data :'username :'+ $scope.user.username
				})
					.success(function(data){
						console.log(data);
					})
					.error(function(data){
						console.log(data);
					});
			};


			$scope.reqister = function(){
				$http({
					method : 'POST',
					url : '/reqister',
					data : $scope.user
				})
					.success(function(data){
						console.log(data);
					})
					.error(function(data){
						console.log(data);
					});
			};
		});
