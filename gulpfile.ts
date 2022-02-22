import * as esbuild from 'esbuild';

import autoprefixer from 'gulp-autoprefixer';
import {exec} from 'child_process';
import gulp from 'gulp';
import sass from 'gulp-dart-sass';

const ENTRIES = {
  js: {
    tsc_out: ['./dist/tsc/main.js'],
    out: './dist/js/main.min.js',
    watch: ['./src/**/*.ts', './src/**/*.tsx'],
  },
  sass: {
    includePaths: ['./node_modules/', './src/sass/', './src/'],
    src: ['./src/partials/**/*.sass', './src/sass/*.sass'],
    out: './dist/css/',
    watch: ['./src/**/*.sass'],
  },
};

/**
 * esBuild does not do type checks and can build with type errors so we first run
 * `tsc` and generate a JS file. esBuild is then run on the outputted JS file.
 *
 * The entry point of tsc compilation is configured in tsconfig `include`.
 */
const runEsBuild = async prod => {
  return new Promise<void>((resolve, reject) => {
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
          jsxFactory: 'preact.h',
          jsxFragment: 'preact.Fragment',
          define: {
            ...(prod && {'process.env.NODE_ENV': "'production'"}),
          },
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
        includePaths: ENTRIES.sass.includePaths,
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

gulp.task('watch:js', async cb => {
  await runEsBuild(false);
  gulp.watch(ENTRIES.js.watch, async () => {
    await runEsBuild(false);
    cb();
  });
});

gulp.task('watch', gulp.parallel('watch:js', 'watch:sass'));
gulp.task('build', gulp.parallel('build:sass', 'build:js'));
gulp.task('default', gulp.series('watch'));
