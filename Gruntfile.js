module.exports = function(grunt) {

	'use strict';

    // 작업시간 표시
    require('time-grunt')(grunt);

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		includes: {
			dist: {
				expand: true,
				cwd: 'src/html/',
				src: ['**/*.html'],
				dest: 'dist',
				option: {
					flatten: true
				}
			}
		},
		clean: {
            dist: {
                files: [{
                    src: 'dist'
                }]
            },
        },
        watch: {
            options: { livereload: true },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt'],
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['includes'],
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // keepalive: true,
                    base: 'dist',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/index.html'
                }
            }
        },
	});

	grunt.registerTask('serve', function (target) {
        
        grunt.task.run([
            'default',
            'connect',
            'watch'
        ]);

    });

	grunt.registerTask('default', [
            'clean',
            'includes'
    ]);
	
};