const path = require('path');
const {
  override,
  addWebpackModuleRule,
  removeModuleScopePlugin,
  useBabelRc,
  disableEsLint,
} = require('customize-cra');

function findBabel(rules) {
  return rules.filter((rule) => {
    return rule.loader && rule.loader.includes('babel');
  });
}

module.exports = {
  webpack: override(
    disableEsLint(),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    removeModuleScopePlugin(),
    (config) => {
      // console.log(config.module.rules[1].oneOf[2]);
      const babelLoaders = findBabel(config.module.rules[1].oneOf);
      babelLoaders.forEach((loader) => {
        console.log('loader', JSON.stringify(loader, null, 2));
      });
      // disable eslint (for react-scripts@4)
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin',
      );
      return config;
    },
    // turn on to transpile node_modules/clad-ui
    addWebpackModuleRule({
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/clad-ui')],
      exclude: /(node_modules|bower_components|build)(?!.*clad-ui)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
        {
          loader: 'linaria/loader',
          options: {
            // NOTE: very important, if not, Linaria won't process clad-ui files properly
            ignore: /node_modules(?!.*clad-ui)/,
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    }),
  ),
  jest: (config) => {
    config.transformIgnorePatterns = [
      'node_modules(?!\\/clad-ui)',
      '^.+\\.module\\.(css|sass|scss)$',
    ];
    return config;
  },
};
