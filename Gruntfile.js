module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner : '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> - <%= pkg.homepage %>\n' +
                ' * License: <%= pkg.license %>\n' +
                ' */\n\n',
            filename : 'headroom-freeze-unfreeze-methods.js',
            output : 'dist/<%= meta.filename %>',
            outputMin : 'dist/<%= meta.filename.replace("js", "min.js") %>'
        },
        concat: {
            options: {
                banner : '<%= meta.banner %>'
            },
            dist: {
                src: ['src/*.js'],
                dest: '<%= meta.output %>'
            }
        },
        uglify: {
            options : {
                banner : '<%= meta.banner %>'
            },
            dist: {
                files : {
                    '<%= meta.outputMin %>'  : '<%= meta.output %>'
                }
            }
        },
        watch: {
            options : {
                atBegin : true
            },
            files: [
                'src/*.js'
            ],
            tasks: ['concat', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dist', ['concat', 'uglify']);
    grunt.registerTask('default', 'watch');
};