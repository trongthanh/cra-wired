/* eslint import/no-commonjs: off */
module.exports = (api) => {
  api.cache(true);

  // to differenciate between compilation with `babel` or `rollup`
  const env = process.env.BABEL_ENV || 'babel';
  const buildenv = process.env.NODE_ENV || 'production';

  console.log('buildenv', buildenv);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            esmodules: true,
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        'linaria/babel',
        {
          ignore: /node_modules(?!.*clad-ui)/,
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src',
            // change alias target to change the theme
            '@clad-ui/theme': './src/theme.js',
          },
        },
      ],
    ].filter(Boolean), // keeps items that is casted truthy
  };
};
