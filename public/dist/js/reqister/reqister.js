angular.module("reqisterApp",["ngMessages"]).controller("reqisterCtrol",function(e,o){e.ishaveUser=function(){o({method:"GET",url:"/isHaveUser",data:"username :"+e.user.username}).success(function(e){console.log(e)}).error(function(e){console.log(e)})},e.reqister=function(){void 0!==e.user.username&&void 0!==e.user.password&&void 0!==e.user.email&&o({method:"POST",url:"/reqister",data:e.user}).success(function(e){console.log(e)}).error(function(e){console.log(e)})}});