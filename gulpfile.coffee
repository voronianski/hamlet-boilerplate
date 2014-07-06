gulp = require 'gulp'
watch = require 'gulp-watch'
spawn = require 'gulp-spawn'
stylus = require 'gulp-stylus'
rename = require 'gulp-rename'
uglify = require 'gulp-uglifyjs'
nodemon = require 'gulp-nodemon'
hamlet = require 'gulp-hamlet-compile'
browserify = require 'gulp-browserify'
dookie = require 'dookie-css'

env = process.env.NODE_ENV or 'development'

paths =
	js: './client/public/js'
	coffeeFiles: './client/**/*.coffee'
	hamlFiles: './client/templates/**/*.haml'
	stylFiles: './client/styl/**/*.styl'


gulp.task 'styles', () ->
	return gulp.src(paths.stylFiles)
		.pipe(stylus compress: true, use: [dookie.css()])
		.pipe(gulp.dest './client/public/css')

gulp.task 'hamlet', () ->
	return gulp.src(paths.hamlFiles)
		.pipe(hamlet())
		.pipe(gulp.dest './client/templates')

gulp.task 'browserify', () ->
	return gulp.src('./client/app.coffee', read: false)
		.pipe(browserify
			extensions: ['.coffee']
			transform: ['coffeeify']
			debug: env is 'development'
		)
		.pipe(rename 'bundle.js')
		.pipe(gulp.dest paths.js)

gulp.task 'uglify', () ->
	return gulp.src('./client/public/build/bundle.js')
		.pipe(uglify())
		.pipe(rename 'bundle.min.js')
		.pipe(gulp.dest paths.js)

gulp.task 'nodemon', () ->
	return nodemon
		script: 'app.coffee'
		ext: 'coffee js'
		ignore: './client'

gulp.task 'watch', () ->
	gulp.watch [paths.hamlFiles, paths.coffeeFiles], ['hamlet', 'browserify']
	gulp.watch [paths.stylFiles], ['styles']

gulp.task 'server:dev', ['styles', 'hamlet', 'browserify', 'nodemon', 'watch']
gulp.task 'server:prod', ['styles', 'hamlet', 'browserify', 'uglify']

gulp.task 'default', () ->
	if env is 'development'
		return gulp.start 'server:dev'
	gulp.start 'server:prod'
