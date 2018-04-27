module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['../integration/{,*/}*.html'],
                tasks: ['newer:copy:html'] //newer permet de ne copier que les fichiers qui ont changer
            },
            images: {
                files: ['../integration/images/**'],
                tasks: ['newer:copy:images'] //newer permet de ne copier que les fichiers qui ont changer
            },
            fonts: {
                files: ['../integration/fonts/**'],
                tasks: ['newer:copy:fonts'] //newer permet de ne copier que les fichiers qui ont changer
            },
            scss: {
                files: ['../integration/scss/**'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['../integration/js/**/*.js'],
                tasks: ['concat']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '../dist/{,*/}*.html',
                    '../dist/css/{,*/}*.css',
                    '../dist/js/{,*/}*.js',
                ]
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: '../integration/',
                src: ['{,*/}*.html'],
                dest: '../dist/'
            },
            root: { //toutes les ressources se trouvant au niveau root
                expand: true,
                cwd: '../integration/',
                src: ['*.*'],
                dest: '../dist/'
            },
            images: {
                expand: true,
                cwd: '../integration/images/',
                src: ['**/*.jpg', '**/*.png', '**/*.gif'],
                dest: '../dist/images/'
            },
            fonts: {
                expand: true,
                cwd: '../integration/fonts/',
                src: ['*.*'],
                dest: '../dist/styles/fonts'
            }
        },
        concat: {
            integration: {
                src: ['../integration/js/**/*.js'],
                dest: '../dist/js/main.js'
            },
            dev: {
                src: ['../integration/js/**/*.js'],
                dest: '../dist/js/main.min.js'
            },
            prod: {
                src: ['../integration/js/**/*.js'],
                dest: '../dist/js/main.js'
            }
        },
        compass: {
            integration: {
                options: {
                    sassDir: ['../integration/scss'],
                    cssDir: ['../dist/styles'],
                    outputStyle: 'nested',
                    debugInfo: false,
                    noLineComments: false,
                    force: false,
                }
            },
            dev: {
                options: {
                    sassDir: ['../integration/scss'],
                    cssDir: ['../dist/css/'],
                    outputStyle: 'nested',
                    debugInfo: false,
                    noLineComments: false,
                    force: false,
                }
            },
            prod: {
                options: {
                    sassDir: ['../integration/scss'],
                    cssDir: ['../dist/css/'],
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true,
                }
            }
        },
        clean: {
            dist: '../dist',
            options: {force: true}
        },
        uglify: {
            prod: {
                compress: true,
                preserveComments: false,
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '../dist/js/',
                        src: 'main.min.js',
                        dest: '../dist/js/',
                    }
                ]
            }
        },
        connect: {
            options: {
                port: 9001,
                // Change this to '0.0.0.0' to access the server from outside.
                //hostname: 'localhost',
                hostname: '192.168.1.181',
                base: '../dist',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('dev', ['compass:dev', 'concat:dev']);
    grunt.registerTask('production', ['compass:prod', 'concat:prod', 'uglify:prod']);
    grunt.registerTask('integration', ['compass:integration', 'concat:integration', 'newer:copy:root', 'newer:copy:vendor', 'newer:copy:images', 'newer:copy:fonts', 'connect:livereload', 'watch']);
};

