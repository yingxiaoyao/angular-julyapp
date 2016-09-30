var connection = require('./connection');
var mongoose = connection.mongoose;



var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : String,
    password : String,
    email : String
});

var UserModel = mongoose.model('user',userSchema);

module.exports = {
    getUsername : function(username,fun){
        UserModel.findOne({username : username},function(err,user){
            if(err) {
                throw err;
            }else {
                fun(user);
            }
        })
    },
    addUser : function(user,fun){
        var userModel = new UserModel(user);
        userModel.save(function(err,user){
            if(err){
                throw err;
            }else {
                fun(user);
            }
        })
    }
}