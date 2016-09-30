var gulp = require('gulp');

var jshint = require('gulp-jshint'),  //js代码检查
	less = require('gulp-less'),  //less编译
	minigycss = require('gulp-clean-css'),  //css代码压缩
	rename = require('gulp-rename'),  //命名
	include = require('gulp-file-include'),  //文件引入
	concat = require('gulp-concat'),  //文件合并
	uglify = require('gulp-uglify'),  // 压缩js代码
	changed = require('gulp-changed'),  //只编译修改过的文件
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),  //css3前缀
	connect = require('gulp-connect');  //服务器

/*var	config = require('./config.json');*/

var js = {
		jsAll : './src/js/*/*.js',
		js : './src/js/*.js',
		dist : './dist/js'
	},

	css = {
		lessAll :  "./src/less/*/*.less",
		less : './src/less/*.less' ,
		css : './dist/*/*.css',
		dist : './dist/css',
		mindist : './dist/css/min/*'
	},

	view = {
		htmlAll : './src/view//*/*.html',
		html :'./src/view/*.html',
		dist : './view'
	};


gulp.task('default',['lint','less','include','websever'],function(){
	gulp.start('scripts');
	gulp.watch([css.less , css.lessAll],['less']);
	/*gulp.watch(css.css,['minigycss']);*/
	gulp.watch([view.html , view.htmlAll],['include']);
	gulp.watch([js.jsAll , js.js],['scripts']);
});

//本地服务器
gulp.task('websever',function(){
	connect.server({
		port : 3000,
		root : './',
		livereload: true
	});
})


//js代码检查
var cfg = {
	"curly":true,
	"eqeqeq": true,
	"newcap": false,
	"noarg": false,
	"sub": false,
	"undef": false,
	"boss": true
}
gulp.task('lint',function(){
	gulp.src([js.js , js.jsAll])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		
});


//less编译
autoprefix = new LessPluginAutoPrefix({
	browsers: [
	  "ie >= 8",
	  "ie_mob >= 10",
	  "ff >= 26",
	  "chrome >= 30",
	  "safari >= 6",
	  "opera >= 23",
	  "ios >= 5",
	  "android >= 2.3",
	  "bb >= 10"
	]
});

gulp.task('less',function(){
	gulp.src([css.less , css.lessAll])
		.pipe(changed(css.less),{
			extension : '.css'
		})
		.pipe(less({
			plugins : autoprefix
		}))
		.pipe(gulp.dest(css.dist))
		.pipe(connect.reload())
});

//include
gulp.task('include',function(){
	gulp.src([view.html , view.htmlAll])
		.pipe(include({
			prefix : '@@',
			basepath : '@file'
		}))
		.pipe(gulp.dest(view.dist))
		.pipe(connect.reload());
});



//合并，压缩js文件
gulp.task('scripts',function(){
	gulp.src([js.js,js.jsAll])
/*		//合并js
		.pipe(concat('all.js'))*/
		//给文件添加.min后缀
		// .pipe(rename({ suffix : '.min' }))
		//压缩js文件
		.pipe(uglify())
		.pipe(gulp.dest(js.dist))
		.pipe(connect.reload());
});

/*//css压缩
gulp.task('minigycss',function(){
	gulp.src(css.css)
		.pipe(rename({suffix : '.min'}))
		.pipe(minigycss())
		.pipe(gulp.dest(css.mindist));
})*/
