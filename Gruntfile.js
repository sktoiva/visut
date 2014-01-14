/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: ['Gruntfile.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          console: true,
          module: true,
          describe: true,
          it: true
        }
      }
    },
    jekyll: {
      doctor: true
    },
    connect:{
      server:{
        options:{
          port: 8080,
          base: '_site/'
        }
      }
    },
    watch: {
      options:{
        livereload: true
      },
      site: {
        files: [ '!**/_site/**', '**/*.html', '**/*.js', '**/*.css'],
        tasks: ['jekyll']
      },
      js: {
        files: '<%= jshint.src %>',
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', 'jekyll');
};