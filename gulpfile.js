(function() {
    var path = require('path');
    var fs = require('fs');
    var gulp = require('gulp');
    var eslint = require('gulp-eslint');
    var less = require('gulp-less');
    var connect = require('gulp-connect');
    var ConnectProxy = require('gulp-connect-proxy');
    var clean = require('gulp-clean');
    var uglify = require('gulp-uglify');
    var cleanCSS = require('gulp-clean-css');
    // var htmlmin = require('gulp-htmlmin');
    // var rename = require('gulp-rename');
    var sourcemaps = require('gulp-sourcemaps');

    var paths = {
        root: './',
        common: {
            root: 'common',
            less: 'common/less/*.less',
            js: 'common/js/*.js',
            resource: 'common/resource/*'
        },
        pages: {
            list: [],
            excludes: ['node_modules', 'common', 'build'],
            js: 'js/*.js',
            less: 'less/*.less',
            img: 'img/*',
            html: '*.html'
        },
        dependencies: [
            {
                name: 'framework7',
                root: 'node_modules/framework7/dist/',
                css: [
                    'node_modules/framework7/dist/css/framework7.ios.colors.min.css',
                    'node_modules/framework7/dist/css/framework7.ios.min.css'
                    // 'node_modules/framework7/dist/css/framework7.material.colors.min.css',
                    // 'node_modules/framework7/dist/css/framework7.material.min.css'
                ],
                js: [
                    'node_modules/framework7/dist/js/framework7.min.js'
                    // 'node_modules/framework7/dist/js/framework7.min.js.map'
                ]

            }
        ],
        build: {
            root: 'build/',
            styles: 'build/css/',
            scripts: 'build/js/',
            resource: 'build/resource',
            img: 'build/img'
        },
        dist: {
            root: 'dist/',
            styles: 'dist/css/',
            scripts: 'dist/js/',
            resource: 'dist/resource',
            img: 'dist/img'
        }
    };

    var files = fs.readdirSync('.');
    files.forEach(function(file) {
        if (!fs.lstatSync(file).isDirectory()) {
            return;
        }
        if (paths.pages.excludes.indexOf(file) !== -1) {
            return;
        }

        paths.pages.list.push(file);
    });

    gulp.task('lint', function() {
        return gulp.src(
            [
                '**/*.js',
                '!node_modules/**/*',
                '!build/**/*',
                '!dist/**/*'
            ])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    gulp.task('dependencies', function(cb) {
        var totalCbs = paths.dependencies.length * 2;
        var cbs = 0;

        paths.dependencies.forEach(function(dep) {
            // dependent js
            gulp.src(dep.js)
                .pipe(gulp.dest(paths.build.scripts))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // dependent css
            gulp.src(dep.css)
                .pipe(gulp.dest(paths.build.styles))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });
        });
    });

    gulp.task('common', function(cb) {
        var subTasks = 4;
        var cbs = 0;

        // common js
        gulp.src([paths.common.js])
            .pipe(gulp.dest(paths.build.scripts))
            .on('end', function() {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // common css
        gulp.src([paths.common.less])
            .pipe(less())
            .on('error', function(error) {
                console.log(error.toString());
                this.emit('end');
            })
            .pipe(gulp.dest(paths.build.styles))
            .on('end', function() {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // common resource
        gulp.src([paths.common.resource])
            .pipe(gulp.dest(paths.build.resource))
            .on('end', function() {
                if (++cbs === subTasks) {
                    cb();
                }
            });

        // others
        gulp.src([path.join(paths.common.root, '*.*')])
            .pipe(gulp.dest(paths.build.root))
            .on('end', function() {
                if (++cbs === subTasks) {
                    cb();
                }
            });
    });

    gulp.task('pages', function(cb) {
        var totalCbs = paths.pages.list.length * 4;
        var cbs = 0;

        paths.pages.list.forEach(function(pageName) {
            // page js
            gulp.src([path.join(pageName, paths.pages.js)])
                .pipe(gulp.dest(paths.build.scripts))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // page css
            gulp.src([path.join(pageName, paths.pages.less)])
                .pipe(less())
                .on('error', function(error) {
                    console.log(error.toString());
                    this.emit('end');
                })
                .pipe(gulp.dest(paths.build.styles))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // html
            gulp.src([path.join(pageName, paths.pages.html)])
                .pipe(gulp.dest(paths.build.root))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });

            // img
            gulp.src([path.join(pageName, paths.pages.img)])
                .pipe(gulp.dest(paths.build.img))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });
        });
    });

    gulp.task('clean', function() {
        return gulp.src([paths.build.root, paths.dist.root], {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task('build', ['dependencies', 'common', 'pages'], function(cb) {
        cb();
    });

    gulp.task('dist', ['build'], function(cb) {
        var totalCbs = 6;
        var cbs = 0;

        // js
        if (process.env.NODE_ENV !== 'production') {
            gulp.src([paths.build.scripts + '/*.js', '!' + paths.build.scripts + '/*.min.js'])
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(sourcemaps.write('../maps'))
                .pipe(gulp.dest(paths.dist.scripts))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });
        } else {
            gulp.src([paths.build.scripts + '/*.js', '!' + paths.build.scripts + '/*.min.js'])
                .pipe(uglify())
                .pipe(gulp.dest(paths.dist.scripts))
                .on('end', function() {
                    if (++cbs === totalCbs) {
                        cb();
                    }
                });
        }
        gulp.src([paths.build.scripts + '/*.min.js'])
          .pipe(gulp.dest(paths.dist.scripts))
          .on('end', function() {
              if (++cbs === totalCbs) {
                  cb();
              }
          });

        // css
        gulp.src(paths.build.styles + '/*.css')
            .pipe(cleanCSS())
            .pipe(gulp.dest(paths.dist.styles))
            .on('end', function() {
                if (++cbs === totalCbs) {
                    cb();
                }
            });

        // img
        gulp.src(paths.build.img + '/*')
            .pipe(gulp.dest(paths.dist.img))
            .on('end', function() {
                if (++cbs === totalCbs) {
                    cb();
                }
            });

        // resource
        gulp.src(paths.build.resource + '/*')
            .pipe(gulp.dest(paths.dist.resource))
            .on('end', function() {
                if (++cbs === totalCbs) {
                    cb();
                }
            });

        // html
        gulp.src(paths.build.root + '*.html')
            .pipe(gulp.dest(paths.dist.root))
            .on('end', function() {
                if (++cbs === totalCbs) {
                    cb();
                }
            });
    });

    gulp.task('watch', function() {
        // watch dependencies
        paths.dependencies.forEach(function(dependency) {
            gulp.watch(dependency.js, ['dependencies']);
            gulp.watch(dependency.css, ['dependencies']);
        });

        // watch common
        gulp.watch(paths.common.js, ['common']);
        gulp.watch(paths.common.less, ['common']);

        // watch pages
        paths.pages.list.forEach(function(pageName) {
            gulp.watch(path.join(pageName, paths.pages.js), ['pages']);
            gulp.watch(path.join(pageName, paths.pages.less), ['pages'])
                .on('error', function(e) {
                    console.log(e);
                });
            gulp.watch(path.join(pageName, paths.pages.html), ['pages']);
        });

        // reload
        gulp.watch(paths.build.scripts, function() {
            gulp.src(paths.build.scripts)
                .pipe(connect.reload());
        });
        gulp.watch(paths.build.styles, function() {
            gulp.src(paths.build.styles)
                .pipe(connect.reload());
        });
        gulp.watch(path.join(paths.build.root, '*.html'), function() {
            gulp.src(path.join(paths.build.root, '*.html'))
                .pipe(connect.reload());
        });
    });

    gulp.task('connect', function() {
        return connect.server({
            root: ['./build'],
            livereload: true,
            port: '3000',
            middleware: function(connect, opt) {
                opt.route = '/thorgene-mweb-ios';
                var proxy = new ConnectProxy(opt);
                return [proxy];
            }
        });
    });

    gulp.task('server', ['build', 'watch', 'connect']);
})();
