var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var util = require('gulp-util');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var koa = require('koa');
var app = koa();
var cfg = require('./conf/config');
var zip = require('gulp-zip');
var fs = require('fs');
var i18n = require('gulp-html-i18n');
var pmm = require('proxy-mock-middleware');

function errHandle(err) {
    console.log(err);
    util.log(err.fileName + '文件编译出错，出错行数为' + err.lineNumber + '，具体错误信息为：' + err.message);
    this.end();
};


// 编译 src 下所有的 html,js 文件到 dist 目录
gulp.task('copy:static', function () {
    gulp.src([
            'src/**/**/*.html',
            'src/**/**/*.js',
            'src/**/**/*.json',
            'src/**/**/*.png',
            'src/**/**/*.jpg',
            'src/**/**/*.gif',
            'src/**/**/*.ico',
            'src/**/**/*.css',
            'src/**/**/*.swf',
            'src/**/**/*.eot',
            'src/**/**/*.svg',
            'src/**/**/*.ttf',
            'src/**/**/*.woff'
        ])
        .pipe(rename(function (path) {
            path.dirname += '';
        }))
        .pipe(gulp.dest("./dist"));
});

// 完整 copy font 目录下的资源到 dist
gulp.task('copy:fonts', function () {
    gulp.src([
            'src/fonts/**/*.html',
            'src/fonts/**/*.css',
            'src/fonts/**/*.eot',
            'src/fonts/**/*.svg',
            'src/fonts/**/*.ttf',
            'src/fonts/**/*.woff'
        ])
        .pipe(rename(function (path) {
            path.dirname += '';
        }))
        .pipe(gulp.dest('dist/fonts'));
    gulp.src([
            'src/fonts/*.*'
        ])
        .pipe(rename(function (path) {
            path.dirname += '';
        }))
        .pipe(gulp.dest('dist/fonts'));
});
// 匹配所有 less文件进行 less 编译
gulp.task('less', function () {
    gulp.src('src/**/**/*.less')
        .pipe(less())
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less:dist', function () {
    gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('dist'));
    gulp.src(['src/**/*.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});


//
//gulp.task('es2015', function () {
//    console.log('编译 JS 代码，支持 ES6 语法编译')
//    gulp.src(['src/**/*.es'])
//        .pipe(babel({
//            presets: ['es2015'],
//            plugins: ['transform-es2015-modules-amd']
//        }))
//        .on('error', errHandle)
//        .pipe(rename(function (path) {
//            path.extname = ".js"
//        }))
//        .pipe(gulp.dest('dist'));
//});

//gulp.task('es2015:dist', function () {
//    gulp.src(['src/**/*.es'])
//        .pipe(sourcemaps.init())
//        .pipe(babel({
//            presets: ['es2015'],
//            plugins: ['transform-es2015-modules-amd']
//        }))
//        .pipe(rename(function (path) {
//            path.extname = ".js"
//        }))
//        .pipe(uglify())
//        .pipe(sourcemaps.write('.'))
//        .on('error', errHandle)
//        .pipe(gulp.dest('dist'));
//});

//打包为war
/*gulp.task("package", ['translate'], function () {
 console.info('translate ok!');
 });*/
gulp.task("package", function () {
    gulp.src(['dist/**', "!dist/**/*.map"]).pipe(zip('dist.war')).pipe(gulp.dest('./'));
    console.info('package ok!');
});

//监听文件改动，执行相应任务
gulp.task('watch', function () {
    console.log('监听文件改动，执行相应任务');
    gulp.watch('src/**/**/*.less', ['less']);
//    gulp.watch('src/**/*.es', ['es2015']);
    gulp.watch([ 'src/**/*.html', 'src/**/*.js', 'src/**/*.css'], [ 'copy:static']);
});

//清空 dist 目录下的资源
gulp.task('clean', function () {
    console.log('清空 dist 目录下的资源')
    gulp.src('dist/*', {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

//
gulp.task('dev-server', function () {
    pmm.start()
});

gulp.task('copy', ['copy:fonts']);
gulp.task('before', ['copy', 'copy:static', 'less']);
gulp.task('default', ['before', 'dev-server', 'watch']);
