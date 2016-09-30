var express = require('express');
var router = express.Router();
var db = require('../db/user');

router.post('/reqister',function(req,res,next){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	if(username !== '' && email !== '' && password !== ''){
		console.log('-------');
		db.addUser({username:username,email:email,password:password},function(user){
			res.send({
				erron : 0,
				data : user
			})
		});
	}
	
});

router.get('/isHaveUser',function(req,res,next){
	var username = req.body.username;
	db.getUsername(username,function(user){
		if(user === null) {
			res.send ({
				erron : 0,
				data : user
			});
		}else {
			res.send({
				erron : 1
			});
		}
	});

});

router.post('/getUser',function(req,res,next) {
	var username = req.body.username;
	db.getUsername(username,function(user){
		if(user == null){
			res.send({
				erron : 0,
				data : {
					user : user,
					status : 0
				}
			})
		}else {
			res.send({
				erron:0,
				data : {
					user : user,
					status : 1
				}
			})
		}
	})
});

router.get('/favicon.ico',function(req,res,next){
	res.send('favicon.ico');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



