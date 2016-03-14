var stats = require('../build/stats.json');
var isProductioinMode = process.env.NODE_ENV === 'production';
var style = isProductioinMode ?
  (stats.publicPath + 'style.css?' + stats.hash) : ('/style.css');

module.exports = {
  main: {
    styles: [
      '//cdn.bootcss.com/normalize/3.0.3/normalize.min.css',
      '//cdn.bootcss.com/humane-js/3.2.2/themes/flatty.min.css'
    ],
    scripts: [
      stats.publicPath + [].concat(stats.assetsByChunkName.main)[0]
    ]
  }
};
