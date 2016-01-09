module.exports = function(grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        //清除目录
        clean: {
            all: ['dist/*.*'],
            image: 'dist/images',
            html: 'dist/*.html',
            css: 'dist/css',
            script:'dist/scripts/*.js'
        },

        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            image: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['images/*.{png,jpg,jpeg,gif}'],
                    dest: 'dist'
                }]
            }
        },

        // 文件合并
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            js: {
                src: [
                    "app/scripts/*.js","app/scripts/*.min.js"
                ],
                dest: "dist/scripts/main.js"
            },
            css: {
                src: [
                    "app/css/*.css"
                ],
                dest: "dist/styles/main.css"
            }
        },

        //压缩JS
        uglify: {
            prod: {
                options: {
                    mangle: {
                        except: ['require', 'exports', 'module', 'window']
                    },
                    compress: {
                        global_defs: {
                            PROD: true
                        },
                        dead_code: true,
                        pure_funcs: [
                            "console.log",
                            "console.info"
                        ]
                    }
                },

                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: 'scripts/*.js',
                    dest: 'dist'
                }]
            }
        },

        //压缩CSS
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['styles/*.css'],
                    dest: 'dist'
                }]
            }
        },

        //压缩图片
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    pngquant: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'],
                    dest: 'dist'
                }]
            }
        },

        // 处理html中css、js 引入合并问题
        usemin: {
            html: 'dist/*.html'
        },

        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },

        watch: {
            files: 'app/scss/**/*.scss',
            tasks: ['sass']
        },


        sass: {
            dev: {
                files: {
                    'app/css/main.css': 'app/scss/main.scss'
                }
            }
        },


        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/styles/*.css',
                        'dist/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        }
    });




    grunt.registerTask('bulid', [
        'copy', //复制文件
        'concat', //合并文件
        'imagemin', //图片压缩
        'cssmin', //CSS压缩
        'uglify', //JS压缩
        'usemin', //HTML处理
        'htmlmin' //HTML压缩
    ]);

    grunt.registerTask('serve', ['browserSync', 'watch']);

    grunt.registerTask('default', ['clean', 'bulid', 'serve']);
};
