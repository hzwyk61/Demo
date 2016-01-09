module.exports = function(grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt); // 如果要使用 time-grunt 插件

    var config = {
        app: 'app', //源文件目录
    };

    // Project configuration.
    grunt.initConfig({

        // Project settings
        config: config, //存放常量

        // Task configuration.
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729 //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'app' //主目录
                    ]
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '<%= config.app %>/styles',
                    ext: '.css'
                }]
            }
        },

    //  自动补全浏览器代码，需要dest输出路径
    /*    postcss: {
            options: {
                processors: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    }).postcss
                ]
            },

            multiple_files: {
                expand: true,
                flatten: true,
                src: '',
                dest: 'dest/css/' 
            },
        },
    */
        watch: {
            scripts: {
                files: [
                    '<%= config.app %>/styles/{,*/}*.scss'
                ],
                tasks: ['sass']
            },

            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },

                files: [ //下面文件的改变就会实时刷新网页
                    'app/*.html',
                    'app/styles/{,*/}*.css',
                    'app/scripts/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg}'
                ]
            }
        }

    });

    // Default task.
    grunt.registerTask('serve', [
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('default', [
        'sass',
        'serve'
    ]);
};
