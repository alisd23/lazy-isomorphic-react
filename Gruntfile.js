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
	var webpackConfig = require("./webpack/prod.config.js");

  grunt.initConfig({
    clean: ['build', 'javascript'],
    webpack: {
			main: webpackConfig
		},
    copy: {
      main: {
        files: [
          { expand: true, src: ['assets/**/*'], dest: 'build/' },
          { expand: true, src: ['icons/**/*'], dest: 'build/' },
          { expand: true, src: ['lib/**/*'], dest: 'build/' },
          { expand: true, cwd: 'typescript', src: ['**/*.json'], dest: 'javascript/' },
          { expand: true, flatten: true, src: ['node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf'], dest: 'assets/fonts/' },
          { expand: true, flatten: true, src: ['node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff'], dest: 'assets/fonts/' },
          { expand: true, flatten: true, src: ['node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2'], dest: 'assets/fonts/' }
        ]
      }
    },
    ts: {
      options: {
        additionalFlags: '--jsx react',
        rootDir: './typescript'
      },
      default: {
        tsconfig: './typescript/tsconfig.json'
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
      dev: {
        options: {
          node_env: 'development'
        }
      },
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
        files: ['index.html', 'assets/**/*', 'typescript/**/*.json'],
        tasks: ['copy', 'restart-server']
      },
      express: {
        files: ['server.js', 'javascript/server/**/*.js'],
        tasks: ['restart-server']
      }
    },
  });

  grunt.registerTask('pre-compile',     ['clean', 'ts']);
  grunt.registerTask('restart-server',  ['express:dev:stop', 'express:dev']);

  grunt.registerTask('build',           ['pre-compile', 'copy', 'webpack']);
  grunt.registerTask('serve:dev',       ['pre-compile', 'copy', 'express:dev', 'watch']);
  grunt.registerTask('serve:prod',      ['build', 'express:prod', 'keepalive']);
  grunt.registerTask("default",         ['serve:dev']);
};
