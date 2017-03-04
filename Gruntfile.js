/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
      '(build date <%= grunt.template.today("yyyy-mm-dd") %>)\n' +
      'license: <%= pkg.license %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> */\n',

    // Task configuration.

    // ES6 -> ES5
    babel: {
       options: {
           sourceMap: true,
           presets: ['es2015']
       },
       target: {
         files: [{
           expand: true,
           cwd: 'src/js',
           src: [ '**.js' ],
           dest: 'dist/js'
         }]
       }
   },

    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>',
        linebreak: false
      },
      target: {
        files: [{
          expand: 'true',
          cwd: 'dist',
          src: '**/*.{css,js}',
          dest: 'dist'
        }]
      }
    },

    // Minify JS
    uglify: {
      target: {
        files:  [{
          expand: true,
          cwd: 'dist/js',
          src: [ '**/*.js' ],
          dest: 'dist/js'
        }]
      }
    },

    // Minify HTML
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.{html,php}',
          dest: 'dist'
        }]
      },
    },

    // remove comments
    comments: {
      php: {
        options: {
          singleline: true,
          multiline: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: '**/*.php',
          dest: 'dist'
        }]
      }
    },

    // Sass -> CSS
    sass: {
      target: {
        files: {
          'dist/css/style.css' : 'src/scss/bootstrap.scss'
        }
      }
    },

    // autoprefixer and minifier
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')(),
                require('cssnano')()
            ]
        },
        target: {
            src: 'dist/css/*.css'
        }
    },

    // copy fonts and images
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: 'src/fonts/',
          src: [ '**/*.{eot,ttf,svg,woff,woff2}' ],
          dest: 'dist/fonts'
        }]
      },
      imgs: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: [ '**.{jpg,png,gif,tiff}' ],
          dest: 'dist/img'
        }]
      }
    },

    // comprimir imagens
    imagemin: {
      options: {
        optimizationLevel: 3,
      },
      target: {
        files: [{
          expand: true,
          cwd: 'dist/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img'
        }]
      }
    },

    // auto CSS e html
    watch: {
      css: {
        files: 'src/scss/*.scss',
        tasks: [ 'sass', 'postcss' ]
      },
      html: {
        files: 'src/*.html',
        tasks: [ 'htmlmin' ]
      },
      js: {
        files: 'src/js/*',
        tasks: [ 'babel', 'uglify' ]
      }
    },

    // exec
    exec: {
      doc: 'php _util/phpDocumentor.phar -d src -t docs'
    }

  });

  // Build
  grunt.registerTask( 'build', 'Build code', function( target ) {

    // load tasks
    grunt.loadNpmTasks( 'grunt-banner' );
    grunt.loadNpmTasks( 'grunt-stripcomments' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-postcss' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );

    // setup options
    var tasks = {
      css:      [ 'sass', 'postcss', 'copy:fonts', 'usebanner' ],
      img:      [ 'copy:imgs', 'imagemin' ],
      js:       [ 'babel', 'uglify', 'usebanner' ],
      html:     [ 'htmlmin', 'comments:php' ],
      default:  [ 'babel', 'uglify', 'htmlmin', 'comments:php', 'sass',
                  'postcss', 'copy', 'imagemin', 'usebanner' ]
    };

    // run task
    grunt.task.run( tasks[ target ] || tasks[ 'default' ] );

  });

  // Distribute
  grunt.registerTask( 'dist', 'Distribute build', function( target ) {

    // load scp
    grunt.loadNpmTasks( 'grunt-scp' );

    // set default task - staging host
    target = target || 'stage';

    // run task
    grunt.task.run( [ target ] );
  });

  // watch
  grunt.registerTask( 'watch', 'Buiild automagically', function( target ) {

    // load tasks
    grunt.loadNpmTasks( 'grunt-banner' );
    grunt.loadNpmTasks( 'grunt-stripcomments' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-postcss' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    // run task @ target
    grunt.task.run( [ 'watch' + (target ?  ':' + target : '') ] );
  });

  // Doc
  grunt.registerTask( 'doc', 'Document project', function() {

    // load exec
    grunt.loadNpmTasks( 'grunt-exec' );

    // exec doc
    grunt.task.run( [ 'exec:doc' ] );
  });


};
