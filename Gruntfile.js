module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options : {
          style : 'compressed',
          sourcemap : true
        },
        files: {
          'assets/css/style.css': 'assets/scss/style.scss'
        }
      }
    },
    jshint: {
      options: {
        smarttabs: true
      },
      src: ['assets/js/**/*.js',
            '!assets/js/vendor/*.js',
            '!assets/js/plugins.js',
            '!assets/js/plugins/**/*.js']
    },
    imagemin : {
      crunch : {
        options : {
          //cache : false,
          optimizationLevel : 7,
          pngquant : true,
          progressive : true
        },
        files : [{
          expand : true,
          cwd : 'assets/images',
          src : ['**/*.{png,jpg,gif}'],
          dest : 'assets/images'
        }]
      }
    },
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      }
    },
    watch: {
      scripts : {
        files: ['assets/js/**/*.js',
              '!assets/js/vendor/*.js',
              '!assets/js/plugins/*.js'],
        tasks: ['jshint']
      },
      css : {
        files: ['assets/scss/*.scss',
                'assets/scss/*/*.scss'],
        tasks: ['sass']
      },
      //images : {
      //  files: ['assets/images/**/*.{png,jpg,gif}'],
      //  tasks: ['crunch']
      //},
      jekyll : {
        files: ['**/*.markdown',
                '**/**/*.markdown',
                '**/*.html',
                'assets/**/*.{png,jpg,gif,css,js}',
                '_config.yml',
                '!_site/**/*'],
        tasks: ['shell:jekyllBuild']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // default tasks run in development
  grunt.registerTask('default', ['sass', 'jshint', 'crunch', 'shell']);
  grunt.registerTask('crunch', ['imagemin']);
  
};