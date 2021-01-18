const path = require('path');
const {
  override,
  addWebpackModuleRule,
  removeModuleScopePlugin,
  useBabelRc,
} = require('customize-cra');

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  removeModuleScopePlugin(),
  // turn on to transpile node_modules/clad-ui
  addWebpackModuleRule({
    test: /\.(js|jsx)$/,
    include: [path.resolve(__dirname, 'src')],
    exclude: /(node_modules|bower_components|build)(?!.*clad-ui)/,
    use: [
      {
        loader: 'babel-loader',
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
);

// module.exports = {
//   webpack: (config /* , env */) => {
//     config.module.rules.push();
//
//     // fix issue that .linaria-cache is outside of src/ folder
//     const moduleScopePlugin = config.resolve.plugins[1];
//     if (moduleScopePlugin) {
//       moduleScopePlugin.appSrcs = [
//         ...moduleScopePlugin.appSrcs,
//         path.resolve(__dirname, '.linaria-cache'),
//       ];
//     }
//     // console.log('config.resolve', config.resolve.plugins);
//
//     return config;
//   },
//   // jest: (config) => {
//   //   config.transformIgnorePatterns = [
//   //     'node_modules(?!\\/clad-ui)',
//   //     '^.+\\.module\\.(css|sass|scss)$',
//   //   ];
//   //   return config;
//   // },
// };
