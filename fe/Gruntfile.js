module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        watch: {
            files: [
                'public/css/index.css',
                'public/js/index.js'
            ],
            tasks: ['build']
        },
        uglify: {
            my_target: {
              files: {
                'public/js/index.min.js': ['public/js/index.js']
              }
            }
        },
        cssmin: {
            compress: {
                files: {
                  'public/css/index.min.css': [
                      'public/css/normalize.css',
                      'public/css/index.css'
                  ]
                }
              }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('build', [
        'uglify',
        'cssmin'
    ]);
    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });
}
