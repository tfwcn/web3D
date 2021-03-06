module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {//js压缩混淆插件
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',//添加banner
                mangle: false, //不混淆变量名
                compress: false,//不压缩
                preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
            },
            build: {
                /*files: {
                 'build/index.min.js': 'src/*.js',
                 'build/TDCameraHelper.min.js': 'src/TDCameraHelper.js',
                 'build/3DTest.min.js': ['src/3DTest.js']
                 }*/
                files: [{
                    expand: true,
                    cwd: 'src/', //js源文件目录
                    src: '*.js', //所有js文件
                    dest: 'build/' //输出到此目录下
                }]
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);

};