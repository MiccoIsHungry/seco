const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

gulp.task('copy-html', function () {
  return gulp
    .src('./src/*/*.html')
    // .pipe(
    //   htmlmin({
    //     removeEmptyAttibutes: true, // 移出所有空属性
    //     collapseWhitespace: true,
    //   })
    // )
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task('images', function () {
  return gulp
    .src('./src/images/*.{jpg,png}')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})

gulp.task('scripts', function () {
  return gulp
    .src(['./src/*/*.js'])
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task("data",function(){
    return gulp.src(["./src/*/*.json","!package.json"])
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//处理css样式
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const minifycss = require('gulp-minify-css')
const rename = require('gulp-rename')

gulp.task('sassLoader', function () {
  return gulp
    .src('./src/*/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(rename(function (path) {
        return {
          dirname: path.dirname.split('src')[0],
          basename: path.basename,
          extname: ".css"
        };
      }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task('build', gulp.series('copy-html', 'images', 'scripts', 'sassLoader','data'))

//编写监听
gulp.task('watch', function () {
  gulp.watch('./src/*/*.html', gulp.series('copy-html'))
  gulp.watch('./src/images/*.{jpg,png}', gulp.series('images'))
  gulp.watch(['./src/*/*.js'], gulp.series('scripts'))
  gulp.watch(["./src/*/*.json", "!package.json"],gulp.series("data"));
  gulp.watch('./src/*/*.scss', gulp.series('sassLoader'))
})

const connect = require('gulp-connect')
gulp.task('server', function () {
  connect.server({
    root: 'dist',
    port: 8080, //0-65535
    livereload: true,
  })
})

//同时启动服务和监听
gulp.task('default', gulp.series(gulp.parallel('watch', 'server')))
