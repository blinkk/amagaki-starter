// TODO: Fix Amagak's publishing to flatten the `dist/src` folder.
const router = require('@amagaki/amagaki/src/router');

class PlaceholderRouteProvider extends router.RouteProvider {
  constructor(router, options) {
    super(router);
    this.type = 'placeholder';
    this.options = options;
  }

  get routes() {
    const routes = [];
    this.options.sizes.forEach(size => {
      const options = {
        size: size,
      };
      routes.push(new PlaceholderRoute(this, options));
    });
    return routes;
  }
}

class PlaceholderRoute extends router.Route {
  constructor(provider, options) {
    super(provider);
    this.provider = provider;
    this.options = options;
  }
  get contentType() {
    return 'image/svg+xml';
  }
  get path() {
    return this.urlPath;
  }
  get urlPath() {
    return `/static/placeholder/${this.options.size}.svg`;
  }
  async build() {
    const parts = this.options.size.split('x');
    const bgColor = this.options.bgColor || '#efefef';
    const icon = this.options.icon;

    const originalWidth = parseInt(parts[0]);
    const originalHeight = parseInt(parts[1]);
    let width = originalWidth * 200;
    let height = originalHeight * 200;
    const isAbsoluteSize =
      originalWidth > 10 && originalWidth === originalHeight;
    const fontFamily = 'Google Sans, Roboto, sans-serif';
    let fontSize;
    let fontWeight = 'normal';
    let fontStyle = '';
    let textColor;
    if (icon) {
      fontSize = width > height ? parseInt(height / 4) : parseInt(width / 4);
      textColor = '#000000';
    } else if (isAbsoluteSize) {
      fontSize = 12;
      height = originalHeight;
      textColor = '#000000';
      width = originalWidth;
    } else {
      fontSize = width > height ? parseInt(height / 11) : parseInt(width / 11);
      fontStyle = 'letter-spacing: 1px; font-weight: 500';
      fontWeight = 'medium';
      textColor = '#999999';
    }
    const text = `${parts[0]}x${parts[1]}`;
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 100%">
            <rect style="fill:${bgColor};" width="${width}" height="${height}"/>
            <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" style="${fontStyle}">${text}</text>
        </svg>
    `;
  }
}

const register = (pod, options) => {
  pod.router.addProvider(new PlaceholderRouteProvider(pod.router, options));
};

module.exports = {
  register: register,
};
