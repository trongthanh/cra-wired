const path = require('path');
const {
  override,
  addWebpackModuleRule,
  removeModuleScopePlugin,
  useBabelRc,
} = require('customize-cra');

module.exports = {
  webpack: override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
    (config) => {
      console.log(config.module.rules[1].oneOf[2]);
      return config;
    },
    removeModuleScopePlugin(),
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
