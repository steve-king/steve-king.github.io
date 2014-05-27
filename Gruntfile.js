module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'assets/css/style.css': 'assets/scss/style.scss'
        }
      }
    },
    watch: {
      sass : {
        files: ['assets/scss/*.scss',
                'assets/scss/*/*.scss'],
        tasks: ['sass']
      },
      js : {
        files: ['assets/js/*.js',
              'assets/js/**/*.js',
              '!assets/js/vendor/*.js',
              '!assets/js/plugins/*.js'],
        tasks: ['jshint']
      },
      images : {
        files: ['assets/images/**/*'],
        tasks: ['crunch']
      }
    },
    jshint: {
      options: {
        smarttabs: true
      },
      src: ['assets/js/*.js',
            'assets/js/**/*.js',
            '!assets/js/vendor/*.js',
            '!assets/js/plugins/*.js',
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // default tasks run in development
  grunt.registerTask('default', ['sass', 'jshint']);
  grunt.registerTask('crunch', ['imagemin']);
  
};