var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var paths = {
  src: {
    css: ['./src/css/libs/*.css', './src/css/**/*.styl', 'src/css/**/*.css'],
    jsx: ['./src/jsx/*.jsx'], //Src JS files on which to watch
    appJs: ['./src/jsx/App.jsx'], //Main JS file, browserify finds the deps
  },
  dest: {
    css: './dist/css',
    js: './dist/js',
  }
};
 
gulp.task('clean:css', function(done) {
  del([paths.dest.css], done);
});

gulp.task('clean:js', function(done) {
  del([paths.dest.js], done);
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.src.css)
    .pipe(stylus())
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('jsx', ['clean:js'], function () {
  browserify({
    entries: './src/jsx/App.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('App.js'))
  .pipe(gulp.dest('dist/js'));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.src.css, ['css']);
  gulp.watch(paths.src.jsx, ['jsx']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'css', 'jsx']);
