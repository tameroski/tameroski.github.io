var siteURL = "localhost:4000/";

'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, uglify and livereload
        watch: {
            sass: {
                files: ['assets/sass/**/*.{scss,sass}'],
                tasks: ['clean', 'sass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['uglify']
            },
        },

        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: require('node-neat').includePaths,
                },
                files: {
                    'assets/sass/build/styles.css': 'assets/sass/styles.scss',
                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: ['assets/sass/build/*.css'],
                dest: 'assets/sass/build'
            },
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            minify: {
                files: {
                  'styles.css': ['assets/sass/build/*.css'],
                  '_site/styles.css': ['assets/sass/build/*.css']
                }
            },
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            options: {
                compress: false,
                mangle: false,
                flatten: false,
                expand: true
            },
            build: {
                files: {
                    'app.min.js' : [
                        'assets/js/**/*.js',
                    ]
                }
            },
        },

        // sync with browsers
        browserSync: {
            bsFiles: {
                src : '*.css'
            },
            options: {
                proxy: siteURL,
                watchTask: true,
                server: false,
                browser: "google chrome",
            }
        },

        // deploy via rsync : "grunt deploy:preprod"
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            preprod: {
                 options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            },
            production: {
                options: {
                    dest: "~/path/to/theme",
                    host: "user@host.com"
                }
            }
        },

        // Task for cleaning the build dir
        clean: ["assets/sass/build"],

    });

    grunt.renameTask('rsync', 'deploy');

    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'browserSync', 'watch']);

};
