module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-keepalive');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

  grunt.initConfig({
    clean: ['build'],
    webpack: {
			options: webpackConfig
		},
    copy: {
      main: {
        files: [
          { expand: true, src: ['assets/**/*'], dest: 'build/' },
          { expand: true, src: ['icons/**/*'], dest: 'build/' },
          { expand: true, src: ['lib/**/*'], dest: 'build/' },
          { expand: true, src: ['src/**/*.json'], dest: 'build/' },
          { src: 'index.html', dest: 'build/index.html' }
        ]
      }
    },
    ts: {
      options: {
        additionalFlags: '--jsx react'
      },
      default: {
        tsconfig: true
      }
    },
    sass: {
      default: {
        options: {
          check: true
        },
        files: {
          'build/build.css': 'sass/app.scss'
        }
      }
    },
    express: {
      dev: {},
      prod: {
        options: {
          node_env: 'production'
        }
      },
      options: {
        script: 'server.js',
        port: 9000
      }
    },
    watch: {
      options: {
        forever: false,
        // for grunt-contrib-watch v0.5.0+, 'nospawn: true' for lower versions.
        // Without this option specified express won't be reloaded
        spawn: false,
        livereload: true
      },
      assets: {
        files: ['index.html', 'assets/**/*'],
        tasks: ['copy', 'restart-server']
      },
      express: {
        files: ['server.js', 'server/**/*.js'],
        tasks: ['restart-server'],
      }
    },
  });

  grunt.registerTask('pre-compile',     ['clean', 'ts']);
  grunt.registerTask('compile',         ['pre-compile', 'copy', 'webpack']);
  grunt.registerTask('run-server',      ['express:dev']);
  grunt.registerTask('restart-server',  ['express:dev:stop', 'express:dev']);
  grunt.registerTask('serve',           ['pre-compile', 'copy', 'run-server', 'watch']);
  grunt.registerTask("default",         ['serve']);
};