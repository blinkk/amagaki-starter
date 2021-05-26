const {exec} = require('child_process');
const esbuild = require('esbuild');
const bs = require('browser-sync').create('amagaki-browsersync');

class amagakiFeBuilder {
  constructor() {
    this.prod = process.argv[2] && process.argv[2] === '-p';

    if (!this.prod) {
      this.devMode();
    } else {
      this.buildProd();
    }
  }

  /**
   * Run development mode.
   */
  devMode() {
    // Start browser sync.
    bs.init({
      watch: true,
      files: 'dist',
      proxy: 'localhost:8080',
    });

    // Watch ts files.
    bs.watch('src/ts/**/*.ts', async () => {
      await this.buildEs();
      this.reload;
    });

    // Watch view files.
    bs.watch('*.yaml', this.reloadBrowserSync);
    bs.watch('*.njk', this.reloadBrowserSync);

    // Watch Sass files.
    this.watchSass();
  }

  reloadBrowserSync() {
    bs.reload();
  }

  async buildProd() {
    await this.buildSass();
    await this.buildEs();
  }

  buildSass() {
    return new Promise(resolve => {
      const command =
        'sass --no-source-map ./src/sass/:./dist/css --style compressed';
      exec(command, (error, stderr) => {
        if (stderr) {
          console.error('Sass build errors');
          console.error(stderr);
        } else {
          resolve();
        }
      });
    });
  }

  watchSass() {
    return new Promise(resolve => {
      const command =
        'sass --watch --no-source-map ./src/sass/:./dist/css --style compressed';
      exec(command, () => {
        resolve();
      });
    });
  }

  /**
   * Build es files.
   */
  buildEs() {
    return new Promise(resolve => {
      exec('tsc -noEmit', (error, stderr) => {
        if (stderr) {
          console.error('Typescript errors');
          console.error(stderr);
        } else {
          esbuild
            .build({
              entryPoints: ['src/ts/main.ts'],
              outfile: 'dist/js/main.min.js',
              bundle: true,
              platform: 'browser',
              minify: this.prod,
            })
            .then(() => {
              resolve();
            })
            .catch(() => {
              throw new Error('Es build Failed');
            });
        }
      });
    });
  }
}

new amagakiFeBuilder();
