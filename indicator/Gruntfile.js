'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['components/requirejs/require.js', '<%= concat.dist.dest %>'],
        dest: 'dist/require.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/require.min.js'
      },
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      app: {
        options: {
          jshintrc: 'app/.jshintrc'
        },
        src: ['app/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      files: ['!**/node_modules/**', '!**/bower_components/**', '!.gitignore', '!.git'],
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test'],
      },
      livereload: {
        files: ['<%= jshint.app.src %>', '<%= jshint.test.src %>', 'index.htm', '*.css'],
        options: {
          livereload: true
        }
      },
      html: {
        files: 'index.htm',
        tasks: ['validation']
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'config',
          mainConfigFile: 'app/config.js',
          out: '<%= concat.dist.dest %>',
          optimize: 'none'
        }
      }
    },
    connect: {
      development: {
        port: 8000
      },
      production: {
        options: {
          keepalive: true,
          port: 8000,
          middleware: function(connect, options) {
            return [
              // rewrite requirejs to the compiled version
              function(req, res, next) {
                if (req.url === '/components/requirejs/require.js') {
                  req.url = '/dist/require.min.js';
                }
                next();
              },
              connect.static(options.base),

            ];
          }
        }
      }
    },
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."] //ignores these errors
      },
      files: {
        src: ['index.htm']
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-html-validation');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'requirejs', 'concat', 'uglify']);
  grunt.registerTask('preview-and-watch', ['connect:development', 'watch']);
  grunt.registerTask('preview-live', ['default', 'connect:production']);

};
