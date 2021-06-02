const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create('amagaki-browsersync');
const esbuild = require('esbuild');
const gulp = require('gulp');
const sass = require('gulp-sass');
const {exec} = require('child_process');
sass.compiler = require('sass');

const ENTRIES = {
  js: {
    // File location for tsc output.  Based on tsconfig output settings.
    tsc_out: ['./dist/js/main.js'],
    out: './dist/js/main.min.js',
    watch: ['./src/ts/**/*.ts'],
  },
  sass: {
    src: ['./src/sass/**/*.sass'],
    out: './dist/css/',
    watch: ['./src/sass/**/*.sass'],
  },
};

/**
 * esBuild does not do type checks and can build with type errors so we first run
 * `tsc` and generate a JS file.  esBuild is then run on the outputted JS file.
 *
 * The entry point of tsc compilation is configured in tsconfig `include`.
 */
const runEsBuild = async prod => {
  return new Promise((resolve, reject) => {
    exec('tsc', async (error, stderr) => {
      if (stderr) {
        console.error('Typescript errors');
        console.error(stderr);
        reject();
      } else {
        await esbuild.build({
          entryPoints: ENTRIES.js.tsc_out,
          outfile: ENTRIES.js.out,
          bundle: true,
          platform: 'browser',
          minify: prod,
        });
        resolve();
      }
    });
  });
};

gulp.task('build:js', async () => {
  await runEsBuild(true);
});

gulp.task('build:sass', () => {
  return gulp
    .src(ENTRIES.sass.src)
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: ['./node_modules/'],
      })
    )
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest(ENTRIES.sass.out));
});

gulp.task('watch:sass', () => {
  return gulp.watch(
    ENTRIES.sass.watch,
    {ignoreInitial: false},
    gulp.series('build:sass')
  );
});

gulp.task('browsersync', async () => {
  // Start browser sync.
  bs.init({
    watch: true,
    files: 'dist',
    proxy: 'localhost:8080',
  });

  // Update browsersync on file changes.
  gulp.watch(ENTRIES.js.watch, async () => {
    await runEsBuild();
    bs.reload();
  });
  gulp.watch('**/*.yaml', bs.reload);
  gulp.watch('**/*.njk', bs.reload);
  gulp.watch('**/*.sass', bs.reload);
});

gulp.task('watch', gulp.parallel('browsersync', 'watch:sass'));
gulp.task('build', gulp.parallel('build:sass', 'build:js'));
gulp.task('default', gulp.series('watch'));
